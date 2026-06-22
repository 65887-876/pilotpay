import { randomUUID } from 'crypto'
import {
  readStore,
  writeStore,
  type ApplicationRow,
  type ApplicationStatus,
  type DbSchema,
} from './store.js'

export type { ApplicationRow, ApplicationStatus } from './store.js'

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

export async function insertApplication(input: ApplicationInput) {
  const db = await readStore()
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
  await writeStore(db)
  return row
}

export async function getApplicationById(id: string) {
  const db = await readStore()
  return db.applications.find((a) => a.id === id)
}

export async function listApplications(filters?: { status?: string; search?: string }) {
  let rows = (await readStore()).applications

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

export async function updateApplication(
  id: string,
  patch: { status?: ApplicationStatus; notes?: string },
) {
  const db = await readStore()
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
  await writeStore(db)
  return updated
}

export async function getStats() {
  const rows = (await readStore()).applications
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

export async function createSession(expiresInHours = 24) {
  const db = await readStore()
  const token = randomUUID() + randomUUID().replace(/-/g, '')
  const now = new Date()
  const expires = new Date(now.getTime() + expiresInHours * 60 * 60 * 1000)

  db.admin_sessions.push({
    token,
    created_at: now.toISOString(),
    expires_at: expires.toISOString(),
  })

  db.admin_sessions = db.admin_sessions.filter((s) => new Date(s.expires_at) >= now)

  await writeStore(db)
  return { token, expiresAt: expires.toISOString() }
}

export async function validateSession(token: string | undefined) {
  if (!token) return false
  const db = await readStore()
  const row = db.admin_sessions.find((s) => s.token === token)
  if (!row) return false
  if (new Date(row.expires_at) < new Date()) {
    await deleteSession(token)
    return false
  }
  return true
}

export async function deleteSession(token: string) {
  const db = await readStore()
  db.admin_sessions = db.admin_sessions.filter((s) => s.token !== token)
  await writeStore(db)
}
