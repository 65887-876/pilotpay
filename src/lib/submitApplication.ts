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
    const raw =
      typeof data === 'object' && data !== null && 'message' in data
        ? String((data as { message: string }).message)
        : ''

    const internal =
      /vercel|telegram_|resend_|configure on|chat not found|api error/i.test(raw)

    const message =
      internal || !raw
        ? "We couldn't submit your application right now. Please try again in a few minutes."
        : raw

    throw new Error(message)
  }

  return { ok: true as const, data }
}
