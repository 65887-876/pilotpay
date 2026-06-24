const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim() || '731284423344135'
const FORM_INTERACTION_KEY = 'pilotpay_form_first_interaction'

type Fbq = {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[]
  loaded: boolean
  version: string
  push: Fbq
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

let initialized = false

function getFbq() {
  return typeof window !== 'undefined' ? window.fbq : undefined
}

function injectMetaPixelScript() {
  if (getFbq()) return

  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod.apply(fbq, args)
    } else {
      fbq.queue.push(args)
    }
  } as Fbq

  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []

  window.fbq = fbq
  if (!window._fbq) window._fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  const first = document.getElementsByTagName('script')[0]
  first?.parentNode?.insertBefore(script, first)
}

export function initMetaPixel() {
  if (initialized || !PIXEL_ID || typeof window === 'undefined') return

  if (getFbq()) {
    initialized = true
    return
  }

  injectMetaPixelScript()
  getFbq()?.('init', PIXEL_ID)
  initialized = true
}

export function trackPageView() {
  initMetaPixel()
  getFbq()?.('track', 'PageView')
}

function trackCustom(eventName: string) {
  initMetaPixel()
  getFbq()?.('trackCustom', eventName)
}

export function trackFormFirstInteraction() {
  if (typeof window === 'undefined') return
  if (sessionStorage.getItem(FORM_INTERACTION_KEY)) return

  sessionStorage.setItem(FORM_INTERACTION_KEY, '1')
  trackCustom('formfirstinteraction')
}

export function trackFormSubmit() {
  initMetaPixel()
  const fbq = getFbq()
  if (!fbq) return

  fbq('trackCustom', 'formsubmit')
  fbq('track', 'Lead')
  fbq('track', 'SubmitApplication')
}

export function getMetaPixelId() {
  return PIXEL_ID
}
