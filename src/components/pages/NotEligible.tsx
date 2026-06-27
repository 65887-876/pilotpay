import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { ease } from '../../lib/motion'
import { site } from '../../lib/site'

export function NotEligible() {
  useEffect(() => {
    document.title = 'Not Eligible | PilotPay'
    return () => {
      document.title = site.title
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-dot-dark opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14">
        <Link to="/" className="mx-auto" aria-label="PilotPay home">
          <Logo tone="inverse" wordTone="inverse" size={32} />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mt-12 flex flex-1 flex-col justify-center text-center"
        >
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-white/60">
            <XCircle size={40} strokeWidth={2} />
          </span>
          <h1 className="mt-6 font-display text-3xl font-semibold">Not Eligible</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/55">
            No onboarding guide is available for your profile at this time. PilotPay is currently
            limited to Stripe accounts with existing processing history.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block w-full rounded-full border border-white/15 bg-white/5 py-4 text-center text-base font-bold text-white transition-colors hover:bg-white/10"
          >
            Back to Home
          </Link>
        </motion.div>

        <footer className="mt-auto pt-12 text-center">
          <p className="text-xs leading-relaxed text-white/40">
            Your data is safe, encrypted, and will only be used for the eligibility assessment.
          </p>
          <p className="mt-3 text-[11px] text-white/25">© 2026 PilotPay. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
