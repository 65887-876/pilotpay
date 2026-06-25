const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim() || '731284423344135'
const FORM_INTERACTION_KEY = 'pilotpay_form_first_interaction'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

function fireFbq(...args: unknown[]) {
  if (typeof window === 'undefined') return false
  if (typeof window.fbq !== 'function') {
    console.warn('[PilotPay Meta] fbq missing:', args[0])
    return false
  }
  window.fbq(...args)
  return true
}

/** Base init is in index.html — never call fbq('init') again from React. */
export function trackPageView() {
  fireFbq('track', 'PageView')
}

function fireWithRetry(fn: () => void) {
  fn()
  window.setTimeout(fn, 300)
  window.setTimeout(fn, 1500)
}

export function trackFormFirstInteraction() {
  if (typeof window === 'undefined') return
  if (sessionStorage.getItem(FORM_INTERACTION_KEY)) return

  sessionStorage.setItem(FORM_INTERACTION_KEY, '1')
  fireWithRetry(() => {
    fireFbq('trackCustom', 'formfirstinteraction')
    fireFbq('track', 'InitiateCheckout')
  })
}

export function trackFormSubmit() {
  if (typeof window === 'undefined') return

  fireWithRetry(() => {
    fireFbq('track', 'Lead')
    fireFbq('track', 'SubmitApplication')
    fireFbq('trackCustom', 'formsubmit')
  })
}

export function getMetaPixelId() {
  return PIXEL_ID
}
