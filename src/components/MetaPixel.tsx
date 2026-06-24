import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getMetaPixelId, initMetaPixel, trackPageView } from '../lib/metaPixel'

export function MetaPixel() {
  const location = useLocation()
  const pixelId = getMetaPixelId()

  useEffect(() => {
    initMetaPixel()
  }, [])

  useEffect(() => {
    trackPageView()
  }, [location.pathname, location.search])

  if (!pixelId) return null

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        alt=""
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
      />
    </noscript>
  )
}
