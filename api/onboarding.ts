import type { VercelRequest, VercelResponse } from '@vercel/node'
import { insertApplication } from '../server/db.js'
import { handleOptions, parseBody } from '../server/api-helpers.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  const body = parseBody<Record<string, string>>(req)

  if (!body.fullName?.trim()) {
    res.status(400).json({ message: 'Full name is required' })
    return
  }
  if (!body.emailAddress?.trim()) {
    res.status(400).json({ message: 'Email is required' })
    return
  }
  if (!body.phoneNumber?.trim()) {
    res.status(400).json({ message: 'Phone number is required' })
    return
  }

  try {
    const application = await insertApplication({
      fullName: body.fullName,
      phoneNumber: body.phoneNumber,
      phoneCountry: body.phoneCountry,
      telegramUsername: body.telegramUsername,
      emailAddress: body.emailAddress,
      totalProcessed: body.totalProcessed,
      instantPayouts: body.instantPayouts,
      legalEntity: body.legalEntity,
      onboardingPreference: 'manual',
    })

    res.status(201).json({ ok: true, id: application.id })
  } catch (err) {
    console.error('Onboarding error:', err)
    res.status(500).json({ message: 'Failed to save application' })
  }
}
