import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_KEY = 'pilotpay:db'

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
  whatsapp_number?: string | null
}

export type SessionRow = {
  token: string
  created_at: string
  expires_at: string
}

export type DbSchema = {
  applications: ApplicationRow[]
  admin_sessions: SessionRow[]
}

function loadFromFile(): DbSchema {
  if (!existsSync(dbFile)) return { applications: [], admin_sessions: [] }
  try {
    return JSON.parse(readFileSync(dbFile, 'utf-8')) as DbSchema
  } catch {
    return { applications: [], admin_sessions: [] }
  }
}

function saveToFile(db: DbSchema) {
  const tmp = `${dbFile}.tmp`
  writeFileSync(tmp, JSON.stringify(db, null, 2), 'utf-8')
  renameSync(tmp, dbFile)
}

function useRemoteStore() {
  return Boolean(
    (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
      (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
  )
}

export async function readStore(): Promise<DbSchema> {
  if (useRemoteStore()) {
    const { Redis } = await import('@upstash/redis')
    const redis = Redis.fromEnv()
    const data = await redis.get<DbSchema>(DB_KEY)
    return data ?? { applications: [], admin_sessions: [] }
  }
  return loadFromFile()
}

export async function writeStore(db: DbSchema): Promise<void> {
  if (useRemoteStore()) {
    const { Redis } = await import('@upstash/redis')
    const redis = Redis.fromEnv()
    await redis.set(DB_KEY, db)
    return
  }
  saveToFile(db)
}
