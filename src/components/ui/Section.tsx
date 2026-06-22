import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, stagger, viewportOnce } from '../../lib/motion'

/** Small uppercase eyebrow label used above section headings. */
export function Eyebrow({
  children,
  tone = 'primary',
  className = '',
}: {
  children: ReactNode
  tone?: 'primary' | 'accent' | 'inverse'
  className?: string
}) {
  const tones = {
    primary: 'text-primary bg-primary-soft border-primary/10',
    accent: 'text-accent bg-accent-soft border-accent/10',
    inverse: 'text-white/80 bg-white/10 border-white/15',
  }
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

/** Animated section heading block: eyebrow + title + optional lead. */
export function SectionHeading({
  eyebrow,
  eyebrowTone,
  title,
  lead,
  align = 'center',
  inverse = false,
  className = '',
}: {
  eyebrow?: ReactNode
  eyebrowTone?: 'primary' | 'accent' | 'inverse'
  title: ReactNode
  lead?: ReactNode
  align?: 'center' | 'left'
  inverse?: boolean
  className?: string
}) {
  const alignment =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`flex max-w-3xl flex-col gap-5 ${alignment} ${className}`}
    >
      {eyebrow && (
        <motion.div variants={fadeUp}>
          <Eyebrow tone={eyebrowTone ?? (inverse ? 'inverse' : 'primary')}>{eyebrow}</Eyebrow>
        </motion.div>
      )}
      <motion.h2
        variants={fadeUp}
        className={`text-balance font-display text-3xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-4xl md:text-[2.85rem] ${
          inverse ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </motion.h2>
      {lead && (
        <motion.p
          variants={fadeUp}
          className={`max-w-2xl text-pretty text-base leading-7 sm:text-lg ${
            inverse ? 'text-white/65' : 'text-muted'
          }`}
        >
          {lead}
        </motion.p>
      )}
    </motion.div>
  )
}
