/** Central site config — override via VITE_* env vars at build time. */
function resolveSiteUrl() {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  if (typeof window !== 'undefined') return window.location.origin
  return ''
}

export const site = {
  name: 'PilotPay',
  title: 'PilotPay — Stripe Revenue Infrastructure',
  get url() {
    return resolveSiteUrl()
  },
  email: import.meta.env.VITE_CONTACT_EMAIL ?? 'contact@pilotpay.com',
  phone: import.meta.env.VITE_CONTACT_PHONE ?? '+1 (833) 437-3106',
  phoneUk: import.meta.env.VITE_CONTACT_PHONE_UK ?? '+44 7307 299316',
  phoneUs: import.meta.env.VITE_CONTACT_PHONE_US ?? '+1 833-437-3106',
  whatsapp: import.meta.env.VITE_WHATSAPP_URL ?? 'https://wa.me/447307299316',
  address: '19 Meridian N, Leicester LE19 1WD, United Kingdom',
  /** Defaults to /api/onboarding — proxied to Express in dev & production */
  applyEndpoint: import.meta.env.VITE_APPLY_ENDPOINT?.trim() || '/api/onboarding',
  ogImage: '/og.png',
} as const

export const homeSections = {
  why: 'why',
  solutions: 'solutions',
  about: 'about',
  partners: 'partners',
  resources: 'resources',
  faq: 'faq',
  contact: 'contact',
  careers: 'careers',
} as const
