import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createSession } from '../server/db.js'
import { handleOptions, parseBody } from '../server/api-helpers.js'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'pilotpay-admin'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  const { password } = parseBody<{ password?: string }>(req)
  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ message: 'Invalid password' })
    return
  }

  const session = await createSession(48)
  res.json({ token: session.token, expiresAt: session.expiresAt })
}
