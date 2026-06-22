import type { VercelRequest, VercelResponse } from '@vercel/node'
import { listApplications } from '../../server/db.js'
import { handleOptions, requireAuth } from '../../server/api-helpers.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  if (!(await requireAuth(req, res))) return

  const status = typeof req.query.status === 'string' ? req.query.status : undefined
  const search = typeof req.query.search === 'string' ? req.query.search : undefined
  const rows = await listApplications({ status, search })

  res.json(
    rows.map((r) => ({
      ...r,
      gateways: JSON.parse(r.gateways) as string[],
    })),
  )
}
