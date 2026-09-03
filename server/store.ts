import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Redis } from '@upstash/redis'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_KEY = 'pilotpay:db'

const dataDir = process.env.DATABASE_PATH
  ? dirname(process.env.DATABASE_PATH)
  : join(__dirname, '..', 'data')
const dbFile = process.env.DATABASE_PATH ?? join(dataDir, 'pilotpay.json')

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

export class StorageError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options)
    this.name = 'StorageError'
  }
}

function isStorageFailure(err: unknown) {
  if (err instanceof StorageError) return true
  if (!(err instanceof Error)) return false

  const message = err.message.toLowerCase()
  const cause = err.cause
  const causeCode =
    cause && typeof cause === 'object' && 'code' in cause
      ? String((cause as { code?: string }).code ?? '')
      : ''

  return (
    message.includes('fetch failed') ||
    message.includes('enotfound') ||
    message.includes('econnrefused') ||
    message.includes('etimedout') ||
    message.includes('network') ||
    causeCode === 'ENOTFOUND' ||
    causeCode === 'ECONNREFUSED' ||
    causeCode === 'ETIMEDOUT'
  )
}

function wrapStorageError(action: string, err: unknown): never {
  if (err instanceof StorageError) throw err

  const detail = err instanceof Error ? err.message : String(err)
  throw new StorageError(`Redis ${action} failed: ${detail}`, { cause: err })
}

function isVercel() {
  return process.env.VERCEL === '1'
}

function redisCredentials() {
  const pairs: Array<{ url?: string; token?: string }> = [
    {
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    },
    {
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    },
  ]

  const urlSuffixes = [
    { url: '_REST_API_URL', token: '_REST_API_TOKEN' },
    { url: '_REST_URL', token: '_REST_TOKEN' },
  ] as const

  // Supports Upstash installs that used a custom env prefix on Vercel
  for (const [key, url] of Object.entries(process.env)) {
    if (!url) continue
    for (const suffix of urlSuffixes) {
      if (!key.endsWith(suffix.url)) continue
      const base = key.slice(0, -suffix.url.length)
      const token = process.env[`${base}${suffix.token}`]
      if (token) pairs.push({ url, token })
      break
    }
  }

  for (const pair of pairs) {
    if (pair.url && pair.token) return { url: pair.url, token: pair.token }
  }

  return null
}

function useRemoteStore() {
  return redisCredentials() !== null
}

function getRedis() {
  const creds = redisCredentials()
  if (!creds) {
    throw new StorageError(
      'Database not configured. On Vercel: Storage → Redis (Upstash) → Connect to pilotpay. ' +
        'Do not use a custom env prefix — needs UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.',
    )
  }
  return new Redis(creds)
}

function assertWritableStorage() {
  if (isVercel() && !useRemoteStore()) {
    throw new StorageError(
      'Cannot save on Vercel without Redis. Connect Upstash Redis in project Storage settings, then redeploy.',
    )
  }
}

function ensureLocalDataDir() {
  if (isVercel()) return
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })
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
  ensureLocalDataDir()
  const tmp = `${dbFile}.tmp`
  writeFileSync(tmp, JSON.stringify(db, null, 2), 'utf-8')
  renameSync(tmp, dbFile)
}

export async function readStore(): Promise<DbSchema> {
  assertWritableStorage()

  if (useRemoteStore()) {
    try {
      const redis = getRedis()
      const data = await redis.get<DbSchema>(DB_KEY)
      return data ?? { applications: [], admin_sessions: [] }
    } catch (err) {
      wrapStorageError('read', err)
    }
  }

  return loadFromFile()
}

export async function writeStore(db: DbSchema): Promise<void> {
  assertWritableStorage()

  if (useRemoteStore()) {
    try {
      const redis = getRedis()
      await redis.set(DB_KEY, db)
      return
    } catch (err) {
      wrapStorageError('write', err)
    }
  }

  saveToFile(db)
}

export async function pingRemoteStore() {
  if (!useRemoteStore()) return { ok: true as const, remote: false as const }

  try {
    const redis = getRedis()
    await redis.ping()
    return { ok: true as const, remote: true as const }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { ok: false as const, remote: true as const, error: message }
  }
}

export function getStorageStatus() {
  const creds = redisCredentials()
  let redisHost: string | null = null
  if (creds?.url) {
    try {
      redisHost = new URL(creds.url).hostname
    } catch {
      redisHost = null
    }
  }

  return {
    vercel: isVercel(),
    remote: useRemoteStore(),
    redisUrlSet: Boolean(creds?.url),
    redisTokenSet: Boolean(creds?.token),
    redisHost,
  }
}

export { isStorageFailure }
