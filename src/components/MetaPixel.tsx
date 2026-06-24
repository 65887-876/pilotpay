import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { initMetaPixel, trackPageView } from '../lib/metaPixel'

export function MetaPixel() {
  const location = useLocation()
  const skipInitialPageView = useRef(true)

  useEffect(() => {
    initMetaPixel()
  }, [])

  useEffect(() => {
    if (skipInitialPageView.current) {
      skipInitialPageView.current = false
      return
    }
    trackPageView()
  }, [location.pathname, location.search])

  return null
}
