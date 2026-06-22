import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { randomUUID } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = process.env.DATABASE_PATH
  ? dirname(process.env.DATABASE_PATH)
  : join(__dirname, '..', 'data')
const dbFile = process.env.DATABASE_PATH ?? join(dataDir, 'pilotpay.json')

if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })

export type ApplicationStatus = 'new' | 'reviewing' | 'approved' | 'rejected' | 'ineligible'

export type ApplicationRow = {
  id: string
  full_name: string
  phone_number: string | null
  phone_country: string | null
  telegram_username: string | null
  email_address: string
  gateways: string
  total_processed: string | null
  instant_payouts: string | null
  legal_entity: string | null
  onboarding_preference: string | null
  status: ApplicationStatus
  notes: string | null
  created_at: string
  updated_at: string
  /** @deprecated legacy field */
  whatsapp_number?: string | null
}

type SessionRow = {
  token: string
  created_at: string
  expires_at: string
}

type DbSchema = {
  applications: ApplicationRow[]
  admin_sessions: SessionRow[]
}

function loadDb(): DbSchema {
  if (!existsSync(dbFile)) {
    return { applications: [], admin_sessions: [] }
  }
  try {
    return JSON.parse(readFileSync(dbFile, 'utf-8')) as DbSchema
  } catch {
    return { applications: [], admin_sessions: [] }
  }
}

function saveDb(db: DbSchema) {
  const tmp = `${dbFile}.tmp`
  writeFileSync(tmp, JSON.stringify(db, null, 2), 'utf-8')
  renameSync(tmp, dbFile)
}

export type ApplicationInput = {
  fullName: string
  phoneNumber?: string
  phoneCountry?: string
  telegramUsername?: string
  emailAddress: string
  totalProcessed?: string
  instantPayouts?: string
  legalEntity?: string
  onboardingPreference?: string
}

export function insertApplication(input: ApplicationInput) {
  const db = loadDb()
  const id = randomUUID()
  const now = new Date().toISOString()

  const row: ApplicationRow = {
    id,
    full_name: input.fullName.trim(),
    phone_number: input.phoneNumber?.trim() || null,
    phone_country: input.phoneCountry ?? null,
    telegram_username: input.telegramUsername?.trim() || null,
    email_address: input.emailAddress.trim().toLowerCase(),
    gateways: JSON.stringify(['stripe']),
    total_processed: input.totalProcessed ?? null,
    instant_payouts: input.instantPayouts ?? null,
    legal_entity: input.legalEntity ?? null,
    onboarding_preference: input.onboardingPreference ?? 'manual',
    status: 'new',
    notes: null,
    created_at: now,
    updated_at: now,
  }

  db.applications.unshift(row)
  saveDb(db)
  return row
}

export function getApplicationById(id: string) {
  const db = loadDb()
  return db.applications.find((a) => a.id === id)
}

export function listApplications(filters?: { status?: string; search?: string }) {
  let rows = loadDb().applications

  if (filters?.status && filters.status !== 'all') {
    rows = rows.filter((r) => r.status === filters.status)
  }

  if (filters?.search?.trim()) {
    const q = filters.search.trim().toLowerCase()
    rows = rows.filter(
      (r) =>
        r.full_name.toLowerCase().includes(q) ||
        r.email_address.toLowerCase().includes(q) ||
        (r.phone_number ?? r.whatsapp_number ?? '').toLowerCase().includes(q) ||
        (r.telegram_username ?? '').toLowerCase().includes(q),
    )
  }

  return rows.sort((a, b) => b.created_at.localeCompare(a.created_at))
}

export function updateApplication(
  id: string,
  patch: { status?: ApplicationStatus; notes?: string },
) {
  const db = loadDb()
  const idx = db.applications.findIndex((a) => a.id === id)
  if (idx === -1) return null

  const existing = db.applications[idx]
  const now = new Date().toISOString()
  const updated: ApplicationRow = {
    ...existing,
    status: patch.status ?? existing.status,
    notes: patch.notes !== undefined ? patch.notes : existing.notes,
    updated_at: now,
  }

  db.applications[idx] = updated
  saveDb(db)
  return updated
}

export function getStats() {
  const rows = loadDb().applications
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  const byStatus: Record<string, number> = {}

  for (const r of rows) {
    byStatus[r.status] = (byStatus[r.status] ?? 0) + 1
  }

  return {
    total: rows.length,
    last7Days: rows.filter((r) => new Date(r.created_at).getTime() >= weekAgo).length,
    byStatus,
  }
}

export function createSession(expiresInHours = 24) {
  const db = loadDb()
  const token = randomUUID() + randomUUID().replace(/-/g, '')
  const now = new Date()
  const expires = new Date(now.getTime() + expiresInHours * 60 * 60 * 1000)

  db.admin_sessions.push({
    token,
    created_at: now.toISOString(),
    expires_at: expires.toISOString(),
  })

  // Purge expired
  db.admin_sessions = db.admin_sessions.filter((s) => new Date(s.expires_at) >= now)

  saveDb(db)
  return { token, expiresAt: expires.toISOString() }
}

export function validateSession(token: string | undefined) {
  if (!token) return false
  const db = loadDb()
  const row = db.admin_sessions.find((s) => s.token === token)
  if (!row) return false
  if (new Date(row.expires_at) < new Date()) {
    deleteSession(token)
    return false
  }
  return true
}

export function deleteSession(token: string) {
  const db = loadDb()
  db.admin_sessions = db.admin_sessions.filter((s) => s.token !== token)
  saveDb(db)
}
