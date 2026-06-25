import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { OptionCard } from '../apply/OptionCard'
import { PhoneInput } from '../apply/PhoneInput'
import {
  type ApplyFormData,
  TOTAL_STEPS,
  initialApplyData,
  volumeOptions,
  instantPayoutOptions,
  legalEntityOptions,
} from '../apply/applyConfig'
import { ease } from '../../lib/motion'
import { submitApplication } from '../../lib/submitApplication'
import { trackFormFirstInteraction, trackFormSubmit } from '../../lib/metaPixel'
import { site } from '../../lib/site'
import { isValidPhoneNumber } from 'libphonenumber-js'
import type { Country } from 'react-phone-number-input'

type Screen = 'form' | 'success'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function normalizeTelegram(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return ''
  return trimmed.startsWith('@') ? trimmed : `@${trimmed}`
}

const stepMotion = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
}

export function Apply() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<ApplyFormData>(initialApplyData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [screen, setScreen] = useState<Screen>('form')

  useEffect(() => {
    document.title = 'Check Your Eligibility | PilotPay'
    return () => {
      document.title = site.title
    }
  }, [])

  const touchForm = () => trackFormFirstInteraction()

  const update = <K extends keyof ApplyFormData>(key: K, value: ApplyFormData[K]) => {
    touchForm()
    setData((d) => ({ ...d, [key]: value }))
    setErrors((e) => {
      const next = { ...e }
      delete next[key as string]
      return next
    })
  }

  const validateStep = (): boolean => {
    const next: Record<string, string> = {}

    if (step === 1) {
      if (!data.fullName.trim()) next.fullName = 'Full name is required'
    }
    if (step === 2) {
      if (!data.phoneNumber.trim()) {
        next.phoneNumber = 'Phone number is required'
      } else if (!isValidPhoneNumber(data.phoneNumber)) {
        next.phoneNumber = 'Enter a valid phone number for the selected country'
      }
      if (!data.emailAddress.trim()) {
        next.emailAddress = 'Email is required'
      } else if (!isValidEmail(data.emailAddress)) {
        next.emailAddress = 'Please provide a valid email address with a proper domain'
      }
      if (data.telegramUsername.trim() && !/^@?[a-zA-Z0-9_]{4,32}$/.test(data.telegramUsername.trim())) {
        next.telegramUsername = 'Enter a valid Telegram username (e.g. @yourname)'
      }
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleNext = async () => {
    touchForm()
    if (!validateStep()) return

    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1)
      return
    }

    await submitForm()
  }

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1)
  }

  async function submitForm() {
    setSubmitting(true)

    const payload = {
      ...data,
      telegramUsername: normalizeTelegram(data.telegramUsername),
      onboardingPreference: 'manual' as const,
    }

    void submitApplication(payload)

    trackFormSubmit()
    setSubmitting(false)
    setScreen('success')
  }

  const progress = (step / TOTAL_STEPS) * 100

  return (
    <div className="flex min-h-screen flex-col bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-dot-dark opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14">
        <Link to="/" className="mx-auto" aria-label="PilotPay home">
          <Logo tone="inverse" wordTone="inverse" size={32} />
        </Link>

        {screen === 'form' ? (
          <>
            <div className="mt-10">
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45, ease }}
                />
              </div>
              <p className="mt-3 font-display text-sm font-semibold text-primary">
                Step {step} of {TOTAL_STEPS}
              </p>
            </div>

            <div className="mt-8 flex-1" onFocusCapture={touchForm}>
              <AnimatePresence mode="wait">
                <motion.div key={step} {...stepMotion} transition={{ duration: 0.35, ease }}>
                  {step === 1 && (
                    <StepShell
                      title="What is your full legal name?"
                      description="Please provide your billing name for the account."
                    >
                      <Field label="Full Name" error={errors.fullName}>
                        <input
                          autoFocus
                          value={data.fullName}
                          onFocus={touchForm}
                          onChange={(e) => update('fullName', e.target.value)}
                          placeholder="Enter your full name"
                          className={inputClass}
                        />
                      </Field>
                    </StepShell>
                  )}

                  {step === 2 && (
                    <StepShell
                      title="How should we reach out?"
                      description="Enter your phone and email. Add Telegram if you prefer chat updates."
                    >
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-white/70">
                          Phone number
                        </label>
                        <PhoneInput
                          value={data.phoneNumber}
                          country={data.phoneCountry as Country}
                          onPhoneChange={(phone) => update('phoneNumber', phone)}
                          onCountryChange={(country) => update('phoneCountry', country)}
                          error={errors.phoneNumber}
                        />
                      </div>
                      <Field label="Email Address" error={errors.emailAddress}>
                        <input
                          type="email"
                          value={data.emailAddress}
                          onFocus={touchForm}
                          onChange={(e) => update('emailAddress', e.target.value)}
                          placeholder="you@example.com"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Telegram (optional)" error={errors.telegramUsername}>
                        <input
                          value={data.telegramUsername}
                          onChange={(e) => update('telegramUsername', e.target.value)}
                          placeholder="@yourusername"
                          className={inputClass}
                        />
                      </Field>
                    </StepShell>
                  )}

                  {step === 3 && (
                    <StepShell
                      title="What is your Stripe processing history?"
                      description="Total volume processed on your Stripe account."
                    >
                      <div className="space-y-3">
                        {volumeOptions.map((v) => (
                          <OptionCard
                            key={v.value}
                            label={v.label}
                            selected={data.totalProcessed === v.value}
                            onSelect={() => update('totalProcessed', v.value)}
                          />
                        ))}
                      </div>
                    </StepShell>
                  )}

                  {step === 4 && (
                    <StepShell
                      title="Are instant payouts enabled?"
                      description="Check if your Stripe account supports immediate withdrawals."
                    >
                      <div className="space-y-3">
                        {instantPayoutOptions.map((o) => (
                          <OptionCard
                            key={o.value}
                            label={o.label}
                            selected={data.instantPayouts === o.value}
                            onSelect={() => update('instantPayouts', o.value)}
                          />
                        ))}
                      </div>
                    </StepShell>
                  )}

                  {step === 5 && (
                    <StepShell
                      title="What is your legal structure?"
                      description="Select the entity that represents your business."
                    >
                      <div className="space-y-3">
                        {legalEntityOptions.map((o) => (
                          <OptionCard
                            key={o.value}
                            label={o.label}
                            selected={data.legalEntity === o.value}
                            onSelect={() => update('legalEntity', o.value)}
                          />
                        ))}
                      </div>
                      <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/55">
                        After you submit, one of our agents will guide you through manual Stripe
                        onboarding within 2 hours.
                      </p>
                    </StepShell>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 space-y-4">
              <button
                type="button"
                onClick={handleNext}
                disabled={submitting}
                className="w-full rounded-full bg-primary py-3.5 text-sm font-bold text-white transition-all hover:bg-primary-strong active:scale-[0.98] disabled:opacity-60 cursor-pointer border-0"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Submitting...
                  </span>
                ) : step === TOTAL_STEPS ? (
                  'Complete Application'
                ) : step === 1 ? (
                  'Next Step'
                ) : (
                  'Next'
                )}
              </button>

              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full py-2 text-sm font-medium text-white/50 transition-colors hover:text-white/80 cursor-pointer border-0 bg-transparent"
                >
                  Go Back
                </button>
              )}
            </div>
          </>
        ) : (
          <SuccessScreen />
        )}

        <footer className="mt-auto pt-12 text-center">
          <p className="text-xs leading-relaxed text-white/40">
            Your data is safe, encrypted, and will only be used for the eligibility assessment.
          </p>
          <p className="mt-3 text-[11px] text-white/25">
            © 2026 PilotPay. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}

function StepShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-white/55">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white/70">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-accent">{error}</p>}
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-primary focus:ring-2 focus:ring-primary/25'

function SuccessScreen() {
  useEffect(() => {
    trackFormSubmit()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="mt-12 text-center"
    >
      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Check size={40} strokeWidth={2.5} />
      </span>
      <h1 className="mt-6 font-display text-3xl font-semibold">Application Received</h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/55">
        Our team will reach out within 2 hours to guide you through manual Stripe onboarding.
        Check your inbox for next steps.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block w-full rounded-full bg-primary py-4 text-center text-base font-bold text-white transition-colors hover:bg-primary-strong"
      >
        Back to Home
      </Link>
    </motion.div>
  )
}
