import express from 'express'
import cors from 'cors'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import {
  listApplications,
  getApplicationById,
  updateApplication,
  getStats,
  createSession,
  validateSession,
  deleteSession,
  type ApplicationStatus,
} from './db.js'
import { processOnboardingSubmit } from './onboarding-handler.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT) || 3001
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'pilotpay-admin'
const SITE_URL = (process.env.SITE_URL ?? '').replace(/\/$/, '')
const isProd = process.env.NODE_ENV === 'production'

const app = express()

app.use(cors({ origin: isProd ? true : ['http://localhost:5173', 'http://127.0.0.1:5173'] }))
app.use(express.json({ limit: '1mb' }))

async function authMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined
  if (!(await validateSession(token))) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  next()
}

app.post('/api/onboarding', async (req, res) => {
  try {
    const result = await processOnboardingSubmit(req.body ?? {})
    res.status(result.status).json(result.body)
  } catch (err) {
    console.error('Onboarding error:', err)
    res.status(500).json({ message: 'Failed to save application' })
  }
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'pilotpay-api' })
})

app.get('/robots.txt', (_req, res) => {
  const base = SITE_URL || 'http://localhost:5173'
  res.type('text/plain').send(`User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`)
})

app.get('/sitemap.xml', (_req, res) => {
  const base = SITE_URL || 'http://localhost:5173'
  const urls = [
    '/',
    '/apply',
    '/legal/privacy',
    '/legal/terms',
    '/legal/cookies',
    '/legal/aml',
    '/legal/security',
    '/legal/partnership',
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${base}${u}</loc></url>`).join('\n')}
</urlset>`
  res.type('application/xml').send(xml)
})

app.post('/api/admin/login', async (req, res) => {
  const { password } = req.body ?? {}
  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ message: 'Invalid password' })
    return
  }
  const session = await createSession(48)
  res.json({ token: session.token, expiresAt: session.expiresAt })
})

app.post('/api/admin/logout', authMiddleware, async (req, res) => {
  const token = req.headers.authorization?.slice(7)
  if (token) await deleteSession(token)
  res.json({ ok: true })
})

app.get('/api/admin/me', authMiddleware, (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/admin/stats', authMiddleware, async (_req, res) => {
  res.json(await getStats())
})

app.get('/api/admin/applications', authMiddleware, async (req, res) => {
  const status = typeof req.query.status === 'string' ? req.query.status : undefined
  const search = typeof req.query.search === 'string' ? req.query.search : undefined
  const rows = await listApplications({ status, search })
  res.json(
    rows.map((r) => ({
      ...r,
      gateways: JSON.parse(r.gateways) as string[],
    })),
  )
})

app.get('/api/admin/applications/:id', authMiddleware, async (req, res) => {
  const row = await getApplicationById(req.params.id)
  if (!row) {
    res.status(404).json({ message: 'Not found' })
    return
  }
  res.json({ ...row, gateways: JSON.parse(row.gateways) as string[] })
})

app.patch('/api/admin/applications/:id', authMiddleware, async (req, res) => {
  const { status, notes } = req.body ?? {}
  const validStatuses: ApplicationStatus[] = ['new', 'reviewing', 'approved', 'rejected', 'ineligible']

  if (status && !validStatuses.includes(status)) {
    res.status(400).json({ message: 'Invalid status' })
    return
  }

  const updated = await updateApplication(req.params.id, { status, notes })
  if (!updated) {
    res.status(404).json({ message: 'Not found' })
    return
  }

  res.json({ ...updated, gateways: JSON.parse(updated.gateways) as string[] })
})

const distPath = join(__dirname, '..', 'dist')

if (existsSync(distPath)) {
  app.use(express.static(distPath))
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) return next()
    res.sendFile(join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`PilotPay API running on http://localhost:${PORT}`)
  if (!isProd) console.log(`Admin password: ${ADMIN_PASSWORD} (set ADMIN_PASSWORD in production)`)
})
