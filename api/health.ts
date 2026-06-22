import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getStorageStatus } from '../server/store.js'
import { notificationsConfigured } from '../server/notify.js'
import { handleOptions } from '../server/api-helpers.js'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  const storage = getStorageStatus()
  const notifications = notificationsConfigured()

  res.json({
    ok: true,
    service: 'pilotpay-api',
    storage,
    notifications,
    ready: storage.remote || !storage.vercel || notifications.any,
  })
}
