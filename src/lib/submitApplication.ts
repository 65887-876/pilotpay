import { site } from './site'

export type ApplicationPayload = Record<string, unknown>

export async function submitApplication(payload: ApplicationPayload) {
  const endpoint = site.applyEndpoint

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

  let data: unknown = null
  const text = await res.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!res.ok) {
    const message =
      typeof data === 'object' && data !== null && 'message' in data
        ? String((data as { message: string }).message)
        : `Submission failed (${res.status})`
    throw new Error(message)
  }

  return { ok: true as const, data }
}
