import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getStorageStatus } from '../server/store.js'
import { handleOptions } from '../server/api-helpers.js'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  const storage = getStorageStatus()

  res.json({
    ok: true,
    service: 'pilotpay-api',
    storage,
    ready: storage.remote || !storage.vercel,
  })
}
