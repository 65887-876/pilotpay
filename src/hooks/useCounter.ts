import { useEffect, useState } from 'react'

export function useCounter(
  target: number,
  active: boolean,
  duration = 2000,
  decimals = 0
) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Number((target * eased).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [active, target, duration, decimals])

  return value
}
