import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleOptions } from '../server/api-helpers.js'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  res.json({ ok: true, service: 'pilotpay-api' })
}
