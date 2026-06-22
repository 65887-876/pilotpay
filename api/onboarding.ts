import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleOptions, parseBody } from '../server/api-helpers.js'
import { processOnboardingSubmit } from '../server/onboarding-handler.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  const body = parseBody<Record<string, string>>(req)

  try {
    const result = await processOnboardingSubmit(body)
    res.status(result.status).json(result.body)
  } catch (err) {
    console.error('Onboarding error:', err)
    const message = err instanceof Error ? err.message : 'Failed to save application'
    res.status(500).json({ message })
  }
}
