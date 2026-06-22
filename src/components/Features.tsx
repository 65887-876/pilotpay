import { motion } from 'framer-motion'
import { Zap, Shield, TrendingUp } from 'lucide-react'
import { viewportOnce, ease } from '../lib/motion'

const features = [
  {
    icon: Zap,
    title: 'Easy to Use',
    description:
      'Turning your Stripe account into passive income should be simple for everyone. We make it effortless.',
  },
  {
    icon: Shield,
    title: 'Safe and Reliable',
    description:
      'We prioritize the safety and security of your account and transactions above everything else.',
  },
  {
    icon: TrendingUp,
    title: 'Automated Income',
    description:
      'Set it up once and watch your account generate passive weekly income on complete autopilot, 24/7.',
  },
]

export function Features() {
  return (
    <section className="bg-surface py-24" id="resources">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-display text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
          Trusted and Best Financial Services
        </h2>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.12, duration: 0.6, ease }}
              className="group rounded-2xl border border-border bg-bg p-8 transition-all duration-300 hover:border-primary/25 hover:shadow-card-lift"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <f.icon size={22} />
              </div>
              <h3 className="font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
