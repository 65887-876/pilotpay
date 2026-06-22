import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to in-page anchors when landing on `/#section` from any route. */
export function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (pathname !== '/' || !hash) return
    const id = hash.replace('#', '')
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return null
}
