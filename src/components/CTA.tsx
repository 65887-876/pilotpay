import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { viewportOnce, ease } from '../lib/motion'

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white" id="contact">
      <div className="pointer-events-none absolute inset-0 bg-dot-dark opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease }}
          className="font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl md:text-6xl"
        >
          Start making <span className="text-accent">money</span> today.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-5 text-lg text-white/60"
        >
          Fill this quick form to see if you qualify.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.25, duration: 0.6, ease }}
          className="mx-auto mt-10"
        >
          <Link
            to="/apply"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            Check My Eligibility →
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <p className="mt-6 text-sm text-white/40">
          Free call · No commitment · Start earning within 48 hours
        </p>
      </div>
    </section>
  )
}
