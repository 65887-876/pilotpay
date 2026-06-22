import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { fadeUp, viewportOnce } from '../lib/motion'

const col1 = [
  'Stripe holding their funds after sudden growth',
  'High-performing stores forced to slow down',
  "Winning product… but can't scale",
]

const col2 = [
  '$20k/day store suddenly frozen',
  'No warning. No appeal. Just frozen.',
  'Revenue halted mid-campaign',
]

const col3 = [
  'Account restricted with zero notice',
  'Campaign paused overnight',
  'Growth capped without explanation',
]

function ScrollColumn({ items, speed }: { items: string[]; speed: string }) {
  const doubled = [...items, ...items]
  return (
    <div className="relative h-[320px] overflow-hidden rounded-2xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-bg to-transparent" />
      <div className={speed}>
        {doubled.map((text, i) => (
          <div
            key={i}
            className="mb-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-ink-soft shadow-card"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProblemSection() {
  const { ref, inView } = useInView()

  return (
    <section className="relative bg-bg py-24" ref={ref} id="solutions">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-12 text-center"
        >
          <span className="inline-flex rounded-full border border-accent/15 bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            E-commerce store
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-semibold tracking-[-0.025em] sm:text-4xl md:text-[2.85rem]">
            E-commerce businesses need you, to scale.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ScrollColumn items={col1} speed="scroll-column" />
          <ScrollColumn items={col2} speed="scroll-column-slow" />
          <ScrollColumn items={col3} speed="scroll-column-fast" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-muted">And</p>
          <p className="mt-2 text-xl text-muted">Their problem equals an</p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-2 font-display text-5xl font-semibold tracking-[-0.03em] text-brand-gradient sm:text-6xl"
          >
            Opportunity
          </motion.p>
          <p className="mt-2 text-xl text-muted">for you</p>
        </motion.div>
      </div>
    </section>
  )
}
