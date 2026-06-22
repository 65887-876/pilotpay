import { useRef, useState } from 'react'
import { usePrefersReducedMotion } from './motion'

/**
 * Magnetic hover: the element drifts toward the cursor while hovered and
 * springs back on leave. Returns a ref + the live offset.
 * Disabled under reduced-motion or on coarse (touch) pointers.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement | null>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const reduced = usePrefersReducedMotion()

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength
    setOffset({ x, y })
  }

  const onMouseLeave = () => setOffset({ x: 0, y: 0 })

  return { ref, offset, onMouseMove, onMouseLeave }
}

/**
 * Pointer parallax within a container. Returns a normalized -1..1 vector
 * from center, for driving depth layers. No-ops under reduced motion / touch.
 */
export function usePointerParallax() {
  const [vec, setVec] = useState({ x: 0, y: 0 })
  const reduced = usePrefersReducedMotion()

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setVec({ x, y })
  }

  const onMouseLeave = () => setVec({ x: 0, y: 0 })

  return { vec, onMouseMove, onMouseLeave }
}
