const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim() || '731284423344135'
const FORM_INTERACTION_KEY = 'pilotpay_form_first_interaction'
const FORM_SUBMIT_KEY = 'pilotpay_form_submitted'

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

export function trackFormFirstInteraction() {
  if (typeof window === 'undefined') return
  if (sessionStorage.getItem(FORM_INTERACTION_KEY)) return

  sessionStorage.setItem(FORM_INTERACTION_KEY, '1')
  fireFbq('trackCustom', 'formfirstinteraction')
  fireFbq('track', 'InitiateCheckout')
}

/** One Lead per form submission — deduped for React StrictMode and retries. */
export function trackFormSubmit() {
  if (typeof window === 'undefined') return
  if (sessionStorage.getItem(FORM_SUBMIT_KEY)) return

  sessionStorage.setItem(FORM_SUBMIT_KEY, '1')
  fireFbq('track', 'Lead')
  fireFbq('trackCustom', 'formsubmit')
}

export function getMetaPixelId() {
  return PIXEL_ID
}
