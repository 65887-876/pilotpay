import { motion } from 'framer-motion'
import { Lock, Zap, Handshake, LineChart } from 'lucide-react'
import { viewportOnce, ease } from '../lib/motion'

const steps = [
  {
    num: '01',
    title: 'Check Your Eligibility',
    description:
      'Book a free call with our team. We verify your account is in good standing and walk you through everything — no pressure, no commitment.',
  },
  {
    num: '02',
    title: 'Connect in Minutes',
    description:
      'You add PilotPay as a team member on your dashboard. No passwords shared. No risk. Fully secure.',
  },
  {
    num: '03',
    title: 'Get Paid Every Week',
    description:
      'Our e-commerce partners process through your account. You earn a weekly revenue share — automatically, passively, predictably.',
  },
]

const perks = [
  { icon: Lock, title: '100% Secure', text: 'Your login credentials stay with you — always. We access through official team member permissions.' },
  { icon: Zap, title: 'Instant Payouts', text: 'No waiting weeks to see your money. We pay weekly, on time, every time.' },
  { icon: Handshake, title: 'Fully Managed', text: 'We handle the entire operation end-to-end. You connect once. We do the rest.' },
  { icon: LineChart, title: 'Real Results', text: 'Life-changing weekly income from an account that was otherwise idle.' },
]

export function Steps() {
  return (
    <section className="bg-bg py-24" id="careers">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mx-auto max-w-3xl text-center font-display text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
          Our innovative passive income feature is designed to turn your account into a{' '}
          <span className="text-accent">revenue-generating machine.</span>
        </h2>

        <div className="mt-16 space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
              className="flex items-start gap-6 rounded-2xl border border-border bg-surface p-8 shadow-card"
            >
              <span className="tabular font-display text-4xl font-semibold text-primary/20">{step.num}</span>
              <div>
                <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <p.icon size={18} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-5 text-muted">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
