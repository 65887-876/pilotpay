import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createSession } from '../../server/db.js'
import { StorageError } from '../../server/store.js'
import { handleOptions, parseBody } from '../../server/api-helpers.js'

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

  try {
    const session = await createSession(48)
    res.json({ token: session.token, expiresAt: session.expiresAt })
  } catch (err) {
    console.error('Admin login error:', err)

    if (err instanceof StorageError) {
      res.status(503).json({ message: err.message })
      return
    }

    const message = err instanceof Error ? err.message : 'Login failed'
    res.status(500).json({ message })
  }
}
