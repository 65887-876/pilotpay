import { motion } from 'framer-motion'
import { ShieldCheck, Clock, Lock, Headphones, TrendingUp, ArrowUpRight } from 'lucide-react'
import { Button } from './ui/Button'
import { useInView } from '../hooks/useInView'
import { useCounter } from '../hooks/useCounter'
import { usePointerParallax } from '../lib/interactions'
import { ease } from '../lib/motion'

const heroStats = [
  { label: 'Processing volume', prefix: '$', target: 2400000, suffix: '+', format: true },
  { label: 'Active partners', target: 500, suffix: '+' },
  { label: 'Avg. revenue lift', target: 48, suffix: '%' },
  { label: 'Countries supported', target: 7, suffix: '+' },
]

const trustChips = [
  { icon: ShieldCheck, label: 'No setup fees' },
  { icon: Clock, label: 'Fast onboarding' },
  { icon: Lock, label: 'Secure payouts' },
  { icon: Headphones, label: '24/7 support' },
]

function formatStatNumber(value: number, format: boolean) {
  if (!format) return value.toString()
  if (value >= 1_000_000) {
    const millions = value / 1_000_000
    return millions >= 10
      ? `${Math.round(millions)}M`
      : `${millions.toFixed(1).replace(/\.0$/, '')}M`
  }
  if (value >= 10_000) return `${Math.round(value / 1000)}K`
  return value.toLocaleString('en-US')
}

function StatTile({
  label,
  prefix = '',
  suffix = '',
  target,
  format = false,
  active,
  delay,
}: {
  label: string
  prefix?: string
  suffix?: string
  target: number
  format?: boolean
  active: boolean
  delay: number
}) {
  const value = useCounter(target, active, 2200, 0)
  const display = formatStatNumber(value, format)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease }}
      className="min-w-0 rounded-2xl border border-border bg-surface/70 p-4 backdrop-blur-sm"
    >
      <p className="tabular font-display text-xl font-semibold text-ink sm:text-2xl">
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted sm:text-[13px]">{label}</p>
    </motion.div>
  )
}

export function Hero() {
  const { ref, inView } = useInView(0.25)
  const parallax = usePointerParallax()

  const rx = parallax.vec.y * -6
  const ry = parallax.vec.x * 8

  return (
    <section
      ref={ref}
      id="why"
      className="relative overflow-hidden bg-bg px-4 pt-14 pb-24 sm:px-6 lg:px-8"
    >
      {/* Architectural backdrop — hairline grid, no blobs */}
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left column — message */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[13px] font-medium text-ink-soft shadow-card"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-soft text-primary">
                <TrendingUp size={12} strokeWidth={2.5} />
              </span>
              Trusted by Stripe partners worldwide
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] text-ink sm:text-6xl"
            >
              Your Stripe Account Is Sitting There.
              <span className="mt-2 block text-brand-gradient">Make It Work For You.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease }}
              className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg"
            >
              PilotPay turns dormant Stripe accounts into predictable weekly revenue — secure
              routing, transparent payouts, no platform changes required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26, ease }}
              className="mt-9"
            >
              <Button to="/apply" magnetic className="px-7 py-3.5 text-[15px]" withArrow={false}>
                Check My Eligibility →
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34, ease }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
            >
              {trustChips.map((chip) => (
                <div key={chip.label} className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft">
                  <chip.icon size={16} className="text-primary" strokeWidth={2.2} />
                  {chip.label}
                </div>
              ))}
            </motion.div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
              {heroStats.map((stat, i) => (
                <StatTile key={stat.label} {...stat} active={inView} delay={0.42 + i * 0.08} />
              ))}
            </div>
          </div>

          {/* Right column — 3D dashboard scene */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease }}
            className="relative z-10 scene-3d overflow-hidden sm:overflow-visible"
            onMouseMove={parallax.onMouseMove}
            onMouseLeave={parallax.onMouseLeave}
          >
            <motion.div
              className="preserve-3d relative mx-auto w-full max-w-[560px]"
              animate={{ rotateX: rx, rotateY: ry }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.6 }}
            >
              {/* Primary dashboard panel */}
              <div className="relative rounded-[28px] border border-border bg-surface p-6 shadow-card-lift">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                  </div>
                  <span className="text-xs font-medium text-faint">PilotPay · Live</span>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    Annual processing volume
                  </p>
                  <p className="tabular mt-2 font-display text-4xl font-semibold text-ink">$2.4M</p>
                  <div className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    <ArrowUpRight size={15} strokeWidth={2.5} />
                    +48% vs. last year
                  </div>
                </div>

                {/* Bar chart */}
                <div className="mt-7 flex h-28 items-end gap-2">
                  {[42, 56, 48, 70, 62, 84, 76, 96].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={inView ? { height: `${h}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.06, ease }}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-primary/30 to-primary"
                      style={{ minHeight: 6 }}
                    />
                  ))}
                </div>
                <div className="mt-3 flex justify-between text-[11px] font-medium text-faint">
                  <span>Q1</span>
                  <span>Q2</span>
                  <span>Q3</span>
                  <span>Q4</span>
                </div>
              </div>

              {/* Floating payout card — front layer */}
              <motion.div
                className="absolute left-0 bottom-0 w-40 rounded-2xl border border-border bg-surface p-3 shadow-float sm:-left-6 sm:-bottom-8 sm:w-52 sm:p-4"
                style={{ transform: 'translateZ(60px)' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              >
                <p className="text-xs font-medium text-muted">Weekly payout</p>
                <p className="tabular mt-1 font-display text-2xl font-semibold text-ink">$12,480</p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
                  <div className="h-full w-4/5 rounded-full bg-accent" />
                </div>
                <p className="mt-2 text-[11px] text-faint">Settled · 4% revenue share</p>
              </motion.div>

              {/* Floating partner badge — front layer */}
              <motion.div
                className="absolute right-0 top-4 rounded-2xl border border-border bg-navy px-3 py-2 text-white shadow-float sm:-right-5 sm:top-8 sm:px-4 sm:py-3"
                style={{ transform: 'translateZ(80px)' }}
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              >
                <p className="text-[11px] font-medium text-white/60">Active partners</p>
                <p className="tabular font-display text-xl font-semibold">500+</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
