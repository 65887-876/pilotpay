import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useCounter } from '../hooks/useCounter'
import { fadeUp, viewportOnce } from '../lib/motion'

const stats = [
  {
    label: 'Total passive income earned by our partners',
    prefix: '$',
    target: 2400920,
    format: true,
    detail: 'Transparent payouts delivered weekly to each partner account.',
  },
  {
    label: 'Active partners',
    suffix: '+',
    target: 500,
    detail: 'Trusted creators and account holders earning every month.',
  },
  {
    label: 'Trusted merchants',
    suffix: '+',
    target: 48,
    detail: 'High-volume brands chosen for reliable payouts.',
  },
  {
    label: 'Years experience',
    suffix: '+',
    target: 7,
    detail: 'Proven expertise in account-based revenue sharing.',
  },
]

function StatCard({
  label,
  prefix = '',
  suffix = '',
  target,
  format = false,
  active,
  detail,
}: {
  label: string
  prefix?: string
  suffix?: string
  target: number
  format?: boolean
  active: boolean
  detail: string
}) {
  const value = useCounter(target, active, 2500, 0)
  const display = format ? value.toLocaleString('en-US') : value.toString()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      viewport={viewportOnce}
      className="group rounded-2xl border border-border bg-surface p-6 text-center shadow-card transition-colors duration-300 hover:border-primary/25"
    >
      <p className="tabular font-display text-3xl font-semibold text-primary sm:text-4xl">
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="mt-3 text-sm font-medium text-ink-soft">{label}</p>
      <p className="mt-3 text-[13px] leading-5 text-muted opacity-70 transition-opacity duration-300 group-hover:opacity-100">
        {detail}
      </p>
    </motion.div>
  )
}

export function Stats() {
  const { ref, inView } = useInView()

  return (
    <section className="bg-bg py-24" ref={ref} id="partners">
      <div className="mx-auto max-w-6xl px-4">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-3xl text-center font-display text-3xl font-semibold tracking-[-0.025em] sm:text-4xl"
        >
          We understand the power of generating passive income through your account.
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} active={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
