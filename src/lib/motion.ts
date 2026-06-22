import { useEffect, useState } from 'react'
import type { Variants } from 'framer-motion'

/** Premium easing curves used across the site. */
export const ease = [0.22, 1, 0.36, 1] as const
export const easeInOut = [0.76, 0, 0.24, 1] as const

/** Detects the user's reduced-motion preference, reactively. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}

/** Section fade-up — the default entrance for headings and blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
}

/** Container that staggers its children's entrance. */
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

/** Child item for staggered containers. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

/** Standard viewport config — animate once, when ~25% visible. */
export const viewportOnce = { once: true, amount: 0.25 } as const
