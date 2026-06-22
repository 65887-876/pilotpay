import { site } from './site'

export type ApplicationPayload = Record<string, unknown>

/** Fire-and-forget safe: never throws — callers should always show success to the user. */
export async function submitApplication(payload: ApplicationPayload) {
  const endpoint = site.applyEndpoint

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        source: 'pilotpay-apply',
        submittedAt: new Date().toISOString(),
        ...payload,
      }),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('Application submit API error:', res.status, text)
    }
  } catch (err) {
    console.error('Application submit network error:', err)
  }

  return { ok: true as const }
}
