import type { VercelRequest, VercelResponse } from '@vercel/node'
import { validateSession } from './db.js'

export function getBearer(req: VercelRequest) {
  const header = req.headers.authorization
  return header?.startsWith('Bearer ') ? header.slice(7) : undefined
}

export async function requireAuth(req: VercelRequest, res: VercelResponse) {
  const token = getBearer(req)
  if (!(await validateSession(token))) {
    res.status(401).json({ message: 'Unauthorized' })
    return false
  }
  return true
}

export function parseBody<T>(req: VercelRequest): T {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as T
    } catch {
      return {} as T
    }
  }
  return (req.body ?? {}) as T
}

export function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

export function handleOptions(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    setCors(res)
    res.status(204).end()
    return true
  }
  setCors(res)
  return false
}
