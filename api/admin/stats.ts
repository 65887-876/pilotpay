import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getStats } from '../../server/db.js'
import { handleOptions, requireAuth } from '../../server/api-helpers.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  if (!(await requireAuth(req, res))) return
  res.json(await getStats())
}
