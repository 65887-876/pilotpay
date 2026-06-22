import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * PilotPay brand mark.
 *
 * Concept: a navigation peak (pilot / heading-up) whose interior carries an
 * ascending payment flightpath — direction + growth in one geometric figure.
 * The outer chevron is the hull; the inner orange wedge is the lift vector.
 *
 * Theming is driven by props so the same component serves light surfaces,
 * dark surfaces, the tinted nav tile, and the favicon lockup.
 */

type Tone = 'tile' | 'ink' | 'inverse'

function Mark({ size = 28, tone = 'tile' }: { size?: number; tone?: Tone }) {
  // tile    → filled royal-purple rounded square, white peak, orange lift
  // ink     → transparent, navy peak, orange lift (light backgrounds)
  // inverse → transparent, white peak, orange lift (dark backgrounds)
  const showTile = tone === 'tile'
  const peak = tone === 'ink' ? '#14172b' : '#ffffff'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {showTile && (
        <>
          <rect width="32" height="32" rx="8.5" fill="url(#pp_tile)" />
          <rect
            x="0.5"
            y="0.5"
            width="31"
            height="31"
            rx="8"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
          />
        </>
      )}
      <path
        d="M16 6 L25 23.6 a0.6 0.6 0 0 1 -0.78 0.82 L16 20.2 L7.78 24.42 a0.6 0.6 0 0 1 -0.78 -0.82 Z"
        fill={peak}
      />
      <path d="M16 12.6 L20.6 21.6 L16 19.3 L11.4 21.6 Z" fill="#E8612C" />
      <defs>
        <linearGradient id="pp_tile" x1="4" y1="3" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5a31c4" />
          <stop offset="1" stopColor="#3a1c92" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Logo({
  variant = 'full',
  tone = 'tile',
  wordTone = 'ink',
  size = 28,
  showTagline = false,
  className = '',
}: {
  variant?: 'full' | 'mark'
  tone?: Tone
  wordTone?: 'ink' | 'inverse'
  size?: number
  showTagline?: boolean
  className?: string
}) {
  const word = wordTone === 'inverse' ? 'text-white' : 'text-ink'
  const tag = wordTone === 'inverse' ? 'text-white/55' : 'text-muted'

  if (variant === 'mark') {
    return (
      <span className={`inline-flex ${className}`}>
        <Mark size={size} tone={tone} />
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark size={size} tone={tone} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.05rem] font-semibold tracking-[-0.02em] ${word}`}>
          PilotPay
        </span>
        {showTagline && (
          <span className={`mt-1 text-[10px] font-medium uppercase tracking-[0.28em] ${tag}`}>
            Revenue Infrastructure
          </span>
        )}
      </span>
    </span>
  )
}

/** Animated entrance wrapper for the nav lockup. */
export function LogoLink({
  to = '/',
  ...props
}: { to?: string } & Parameters<typeof Logo>[0]) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={to} className="inline-flex items-center rounded-xl" aria-label="PilotPay home">
        <Logo {...props} />
      </Link>
    </motion.div>
  )
}
