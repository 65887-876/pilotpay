/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string
  readonly VITE_APPLY_ENDPOINT: string
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_CONTACT_PHONE: string
  readonly VITE_CONTACT_PHONE_UK: string
  readonly VITE_CONTACT_PHONE_US: string
  readonly VITE_WHATSAPP_URL: string
  readonly VITE_META_PIXEL_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
