import { motion } from 'framer-motion'
import { BarChart3, Calculator, Users, Settings } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { useCounter } from '../hooks/useCounter'
import { viewportOnce, ease } from '../lib/motion'
import { Button } from './ui/Button'

const benefits = [
  { icon: BarChart3, title: 'Weekly Earnings Report', desc: 'Track your passive income growth with full transparency on every dollar earned.' },
  { icon: Calculator, title: 'Free Consultation With Expert Accountant', desc: 'Get professional financial advice to maximize your returns and simplify tax filing.' },
  { icon: Users, title: 'Exclusive Partner Community Access', desc: 'Connect with 500+ account holders. Share wins, get tips, and grow together.' },
  { icon: Settings, title: 'We Manage Everything End-to-End', desc: 'You connect once. We handle the entire operation. You just collect your weekly payout.' },
]

const avatars = ['James', 'Sophie', 'Marcus', 'Priya', 'Daniel']

export function WhatYouGet() {
  const { ref, inView } = useInView()
  const earnings = useCounter(2400920, inView, 3000, 0)

  return (
    <section className="bg-surface py-24" ref={ref}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-display text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
          What Will You Get?
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
              className="flex items-start gap-4 rounded-2xl border border-border bg-bg p-6 transition-colors duration-300 hover:border-primary/25"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <b.icon size={20} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-20 overflow-hidden rounded-3xl border border-border bg-navy p-10 text-center text-white">
          <div className="pointer-events-none absolute inset-0 bg-dot-dark opacity-60" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              What you get with PilotPay
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              Your account. Our operation. Your weekly payout.
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              Every transaction is visible to you in real time. You stay in full control of your
              account while we handle everything behind the scenes.
            </p>

            <div className="mt-10">
              <p className="text-sm text-white/55">Wonder how much money our partners have made?</p>
              <motion.p
                initial={{ scale: 0.85, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease }}
                className="tabular mt-2 font-display text-5xl font-semibold text-white sm:text-6xl"
              >
                ${earnings.toLocaleString('en-US')}
              </motion.p>
              <div className="mt-5 flex items-center justify-center">
                <div className="flex -space-x-2">
                  {avatars.map((name) => (
                    <span
                      key={name}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-navy bg-primary text-xs font-semibold text-white"
                    >
                      {name[0]}
                    </span>
                  ))}
                </div>
                <span className="ml-3 text-sm font-semibold text-white/70">+500</span>
              </div>
              <p className="mt-3 text-sm text-white/55">500+ account holders are already in this program</p>
            </div>

            <div className="mt-8">
              <Button to="/apply" magnetic withArrow={false}>
                Check My Eligibility →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
