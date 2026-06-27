import { insertApplication } from './db.js'
import { notifyNewApplication } from './notify.js'
import { StorageError } from './store.js'

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

export function isIneligibleApplication(body: OnboardingBody) {
  return body.totalProcessed === 'brand_new'
}

export async function processOnboardingSubmit(body: OnboardingBody) {
  const validationError = validateOnboardingBody(body)
  if (validationError) {
    return { status: 400 as const, body: { message: validationError } }
  }

  if (isIneligibleApplication(body)) {
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

  let applicationId: string | undefined
  let stored = false

  try {
    const application = await insertApplication(payload)
    applicationId = application.id
    stored = true
  } catch (err) {
    if (!(err instanceof StorageError)) throw err
    console.warn('Application storage unavailable:', err.message)
  }

  const notifications = await notifyNewApplication({
    id: applicationId,
    fullName: payload.fullName,
    phoneNumber: payload.phoneNumber,
    phoneCountry: payload.phoneCountry,
    telegramUsername: payload.telegramUsername,
    emailAddress: payload.emailAddress,
    totalProcessed: payload.totalProcessed,
    instantPayouts: payload.instantPayouts,
    legalEntity: payload.legalEntity,
  })

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
