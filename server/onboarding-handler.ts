import { insertApplication } from './db.js'
import { notifyNewApplication } from './notify.js'
import { isStorageFailure } from './store.js'

export type OnboardingBody = {
  fullName?: string
  phoneNumber?: string
  phoneCountry?: string
  telegramUsername?: string
  emailAddress?: string
  totalProcessed?: string
  instantPayouts?: string
  legalEntity?: string
}

export function validateOnboardingBody(body: OnboardingBody) {
  if (!body.fullName?.trim()) return 'Full name is required'
  if (!body.emailAddress?.trim()) return 'Email is required'
  if (!body.phoneNumber?.trim()) return 'Phone number is required'
  return null
}

// Applicants processing under 25k/month are ineligible: never stored, but
// email/Telegram still fire so the team sees every form submit.
const INELIGIBLE_VOLUMES = new Set(['brand_new', 'under_10k', 'under_25k'])

export function isIneligibleApplication(body: OnboardingBody) {
  return INELIGIBLE_VOLUMES.has(body.totalProcessed ?? '')
}

export async function processOnboardingSubmit(body: OnboardingBody) {
  const validationError = validateOnboardingBody(body)
  if (validationError) {
    return { status: 400 as const, body: { message: validationError } }
  }

  if (isIneligibleApplication(body)) {
    const notifications = await notifyNewApplication({
      fullName: body.fullName!,
      phoneNumber: body.phoneNumber,
      phoneCountry: body.phoneCountry,
      telegramUsername: body.telegramUsername,
      emailAddress: body.emailAddress!,
      totalProcessed: body.totalProcessed,
      instantPayouts: body.instantPayouts,
      legalEntity: body.legalEntity,
      ineligible: true,
    })

    if (!notifications.telegram && !notifications.email) {
      console.warn('Ineligible application submitted but no notification delivered', {
        telegram: notifications.telegram,
        email: notifications.email,
        errors: notifications.errors,
      })
    }

    return {
      status: 200 as const,
      body: { ok: true, rejected: true as const },
    }
  }

  const payload = {
    fullName: body.fullName!,
    phoneNumber: body.phoneNumber,
    phoneCountry: body.phoneCountry,
    telegramUsername: body.telegramUsername,
    emailAddress: body.emailAddress!,
    totalProcessed: body.totalProcessed,
    instantPayouts: body.instantPayouts,
    legalEntity: body.legalEntity,
    onboardingPreference: 'manual' as const,
  }

  // Notify first — Redis/storage outages must not block Telegram/email.
  const notifications = await notifyNewApplication({
    fullName: payload.fullName,
    phoneNumber: payload.phoneNumber,
    phoneCountry: payload.phoneCountry,
    telegramUsername: payload.telegramUsername,
    emailAddress: payload.emailAddress,
    totalProcessed: payload.totalProcessed,
    instantPayouts: payload.instantPayouts,
    legalEntity: payload.legalEntity,
  })

  let applicationId: string | undefined
  let stored = false

  try {
    const application = await insertApplication(payload)
    applicationId = application.id
    stored = true
  } catch (err) {
    if (!isStorageFailure(err)) throw err
    const message = err instanceof Error ? err.message : String(err)
    console.warn('Application storage unavailable:', message)
  }

  const delivered = notifications.telegram || notifications.email

  if (!stored || !delivered) {
    console.warn('Onboarding submit completed with delivery issues', {
      stored,
      telegram: notifications.telegram,
      email: notifications.email,
      errors: notifications.errors,
    })
  }

  // Always return success to the applicant — issues are logged server-side only.
  return {
    status: 201 as const,
    body: {
      ok: true,
      id: applicationId ?? null,
    },
  }
}
