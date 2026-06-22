import { motion } from 'framer-motion'
import { Store, ArrowRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { useCounter } from '../hooks/useCounter'
import { fadeUp, viewportOnce, ease } from '../lib/motion'

export function HowItWorks() {
  const { ref, inView } = useInView()
  const cutPercent = useCounter(4, inView, 2000, 0)
  const volume = useCounter(12, inView, 2500, 0)

  return (
    <section className="bg-surface py-24" ref={ref} id="about">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="text-center">
          <p className="font-display text-5xl font-semibold tracking-[-0.03em] text-brand-gradient sm:text-6xl">
            How?
          </p>
          <h3 className="mx-auto mt-6 max-w-3xl font-display text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl">
            By diversifying those sales into different Stripe accounts created or owned by you.
            And you get <span className="text-accent">4% of every sale.</span>
          </h3>
        </motion.div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          {/* Flow diagram */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="relative"
          >
            <div className="relative rounded-3xl border border-border bg-bg p-8 shadow-card">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-5 text-center shadow-card">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <Store size={22} />
                  </span>
                  <p className="text-sm font-semibold text-ink-soft">High-volume store</p>
                </div>

                <svg width="56" height="24" viewBox="0 0 56 24" className="shrink-0 text-primary">
                  <line x1="2" y1="12" x2="48" y2="12" stroke="currentColor" strokeWidth="2" className="flow-line" />
                  <path d="M44 6 L52 12 L44 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <div className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-5 text-center shadow-card">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white">
                    <span className="font-display text-sm font-semibold">PP</span>
                  </span>
                  <p className="text-sm font-semibold text-ink-soft">Your Stripe account</p>
                </div>
              </div>

              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.6, type: 'spring', stiffness: 160, damping: 16 }}
                className="mx-auto mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-accent/20 bg-accent-soft px-4 py-3 text-center"
              >
                <ArrowRight size={16} className="text-accent" />
                <p className="text-sm font-semibold text-accent">You earn 4% of every sale routed through it</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Counters + copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-bg p-6">
                <p className="tabular font-display text-5xl font-semibold text-primary">{cutPercent}%</p>
                <p className="mt-1 text-sm font-medium text-muted">Your cut per sale</p>
              </div>
              <div className="rounded-2xl border border-border bg-bg p-6">
                <p className="tabular font-display text-5xl font-semibold text-accent">{volume}M+</p>
                <p className="mt-1 text-sm font-medium text-muted">Volume processed</p>
              </div>
            </div>
            <p className="mt-8 text-lg leading-7 text-muted">
              PilotPay routes high-volume e-commerce sales through your Stripe account. You earn 4%
              of every transaction — automatic, passive income with zero work.
            </p>
            <p className="mt-4 text-sm font-semibold text-primary">
              Higher tiers available — earn up to 8% on Stripe accounts handling $50K+ in monthly
              volume.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
