import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../lib/metaPixel'

export function MetaPixel() {
  const location = useLocation()
  const skipInitialPageView = useRef(true)

  useEffect(() => {
    if (skipInitialPageView.current) {
      skipInitialPageView.current = false
      return
    }
    trackPageView()
  }, [location.pathname, location.search])

  return null
}
