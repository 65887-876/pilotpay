import type { VercelRequest, VercelResponse } from '@vercel/node'
import { deleteSession } from '../server/db.js'
import { getBearer, handleOptions, requireAuth } from '../server/api-helpers.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  if (!(await requireAuth(req, res))) return

  const token = getBearer(req)
  if (token) await deleteSession(token)
  res.json({ ok: true })
}
