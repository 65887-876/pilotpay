import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  getApplicationById,
  updateApplication,
  type ApplicationStatus,
} from '../../../server/db.js'
import { handleOptions, parseBody, requireAuth } from '../../../server/api-helpers.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return

  const id = req.query.id as string
  if (!id) {
    res.status(400).json({ message: 'Missing application id' })
    return
  }

  if (!(await requireAuth(req, res))) return

  if (req.method === 'GET') {
    const row = await getApplicationById(id)
    if (!row) {
      res.status(404).json({ message: 'Not found' })
      return
    }
    res.json({ ...row, gateways: JSON.parse(row.gateways) as string[] })
    return
  }

  if (req.method === 'PATCH') {
    const { status, notes } = parseBody<{ status?: ApplicationStatus; notes?: string }>(req)
    const validStatuses: ApplicationStatus[] = [
      'new',
      'reviewing',
      'approved',
      'rejected',
      'ineligible',
    ]

    if (status && !validStatuses.includes(status)) {
      res.status(400).json({ message: 'Invalid status' })
      return
    }

    const updated = await updateApplication(id, { status, notes })
    if (!updated) {
      res.status(404).json({ message: 'Not found' })
      return
    }

    res.json({ ...updated, gateways: JSON.parse(updated.gateways) as string[] })
    return
  }

  res.status(405).json({ message: 'Method not allowed' })
}
