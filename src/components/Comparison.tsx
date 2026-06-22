import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { viewportOnce } from '../lib/motion'

const rows = [
  { feature: 'Daily Earning Potential', pilotpay: '$1,000+ per day', others: '$50–200 per day' },
  { feature: 'Payout Speed', pilotpay: 'Weekly / Same-week', others: '1 week – 1 month' },
  { feature: 'Setup Time', pilotpay: '5 minutes', others: '2–4 weeks' },
  { feature: 'Monthly Fees', pilotpay: '$0', others: '$99–299' },
  { feature: 'Transaction Fees', pilotpay: '0%', others: '2.9% + 30¢' },
  { feature: 'Minimum Investment', pilotpay: '$0', others: '$1,000+' },
  { feature: 'Work Required', pilotpay: '100% Hands-off', others: 'Daily management' },
  { feature: 'Customer Support', pilotpay: 'Dedicated Manager', others: 'Email only' },
  { feature: 'Legal Contract', pilotpay: 'Always included', others: 'Rarely' },
]

const highlights = [
  { value: '$1,000+', label: 'Daily Potential' },
  { value: 'Weekly', label: 'Payouts' },
  { value: '100%', label: 'Hands-off' },
]

export function Comparison() {
  return (
    <section className="bg-bg py-24">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-center font-display text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
          Why Choose PilotPay?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Turn your idle account into a powerful income stream. Compare us to traditional investment
          platforms and other passive income solutions.
        </p>

        {/* Desktop table */}
        <div className="mt-12 hidden overflow-hidden rounded-2xl border border-border bg-surface shadow-card md:block">
          <div className="grid grid-cols-3 border-b border-border bg-bg-raised px-6 py-4 text-sm font-semibold">
            <span>Feature</span>
            <span className="text-center text-primary">PilotPay</span>
            <span className="text-center text-muted">Others</span>
          </div>
          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-3 border-b border-border/60 px-6 py-4 text-sm last:border-0"
            >
              <span className="font-medium text-ink-soft">{row.feature}</span>
              <span className="flex items-center justify-center gap-1.5 text-center font-semibold text-primary">
                <Check size={14} className="shrink-0" />
                {row.pilotpay}
              </span>
              <span className="flex items-center justify-center gap-1.5 text-center text-muted">
                <X size={14} className="shrink-0 text-accent/70" />
                {row.others}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="mt-12 space-y-3 md:hidden">
          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.03 }}
              className="rounded-2xl border border-border bg-surface p-4 shadow-card"
            >
              <p className="text-sm font-semibold text-ink">{row.feature}</p>
              <div className="mt-3 grid gap-2">
                <div className="flex items-start gap-2 rounded-xl bg-primary-soft/60 px-3 py-2.5 text-sm">
                  <Check size={14} className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                      PilotPay
                    </span>
                    <p className="font-medium text-ink-soft">{row.pilotpay}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 rounded-xl bg-bg px-3 py-2.5 text-sm">
                  <X size={14} className="mt-0.5 shrink-0 text-accent/70" />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                      Others
                    </span>
                    <p className="text-ink-soft">{row.others}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="rounded-2xl border border-border bg-surface p-6 shadow-card">
              <p className="tabular font-display text-2xl font-semibold text-accent">{item.value}</p>
              <p className="mt-1 text-sm font-medium text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
