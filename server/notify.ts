export type ApplicationNotification = {
  id?: string
  fullName: string
  phoneNumber?: string
  phoneCountry?: string
  telegramUsername?: string
  emailAddress: string
  totalProcessed?: string
  instantPayouts?: string
  legalEntity?: string
}

const VOLUME_LABELS: Record<string, string> = {
  brand_new: '$0 (Brand New)',
  under_10k: 'Under $10,000',
  '10k_50k': '$10,000 - $50,000',
  '10k_100k': '$50,000 - $100,000',
  '100k_plus': '$100,000+',
}

const PAYOUT_LABELS: Record<string, string> = {
  yes: 'Yes',
  no: 'No',
  not_sure: "I'm not sure",
}

const LEGAL_LABELS: Record<string, string> = {
  uk_ltd: 'UK Limited Company (LTD)',
  us_llc: 'US LLC',
  international: 'Other International Entity',
  individual: 'Individual / Sole Proprietorship',
}

function label(map: Record<string, string>, value?: string) {
  if (!value) return '—'
  return map[value] ?? value
}

function escapeHtml(text: string) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

export function formatApplicationMessage(data: ApplicationNotification) {
  const telegram = data.telegramUsername?.trim()
    ? data.telegramUsername.trim().startsWith('@')
      ? data.telegramUsername.trim()
      : `@${data.telegramUsername.trim()}`
    : '—'

  const lines = [
    '🆕 New PilotPay application',
    '',
    `Name: ${data.fullName}`,
    `Email: ${data.emailAddress}`,
    `Phone: ${data.phoneNumber ?? '—'}`,
    `Applicant Telegram: ${telegram}`,
    `Stripe volume: ${label(VOLUME_LABELS, data.totalProcessed)}`,
    `Instant payouts: ${label(PAYOUT_LABELS, data.instantPayouts)}`,
    `Legal structure: ${label(LEGAL_LABELS, data.legalEntity)}`,
  ]

  if (data.id) lines.push('', `Application ID: ${data.id}`)

  return lines.join('\n')
}

export function formatApplicationHtml(data: ApplicationNotification) {
  const rows = [
    ['Name', data.fullName],
    ['Email', data.emailAddress],
    ['Phone', data.phoneNumber ?? '—'],
    [
      'Applicant Telegram',
      data.telegramUsername?.trim()
        ? data.telegramUsername.trim().startsWith('@')
          ? data.telegramUsername.trim()
          : `@${data.telegramUsername.trim()}`
        : '—',
    ],
    ['Stripe volume', label(VOLUME_LABELS, data.totalProcessed)],
    ['Instant payouts', label(PAYOUT_LABELS, data.instantPayouts)],
    ['Legal structure', label(LEGAL_LABELS, data.legalEntity)],
  ]

  if (data.id) rows.push(['Application ID', data.id])

  const body = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">${escapeHtml(k)}</td>` +
        `<td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(v)}</td></tr>`,
    )
    .join('')

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;color:#111">
    <h2 style="margin:0 0 16px">New PilotPay application</h2>
    <table style="border-collapse:collapse;width:100%;max-width:560px">${body}</table>
  </body></html>`
}

function getTelegramChatIds() {
  const ids = new Set<string>()

  const addFromList = (value?: string) => {
    if (!value?.trim()) return
    for (const part of value.split(/[,\s]+/)) {
      const id = part.trim()
      if (id) ids.add(id)
    }
  }

  addFromList(process.env.TELEGRAM_CHAT_IDS)
  addFromList(process.env.TELEGRAM_CHAT_ID)
  addFromList(process.env.TELEGRAM_CHAT_ID_2)

  return [...ids]
}

async function sendTelegramToChat(token: string, chatId: string, text: string) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Telegram chat ${chatId} (${res.status}): ${detail}`)
  }
}

async function sendTelegram(data: ApplicationNotification) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim()
  const chatIds = getTelegramChatIds()

  if (!token || chatIds.length === 0) {
    console.warn(
      'Telegram notification skipped: set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_IDS (or TELEGRAM_CHAT_ID)',
    )
    return false
  }

  const text = formatApplicationMessage(data)
  const results = await Promise.allSettled(
    chatIds.map((chatId) => sendTelegramToChat(token, chatId, text)),
  )

  const delivered = results.filter((r) => r.status === 'fulfilled').length
  const failures = results
    .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
    .map((r) => (r.reason instanceof Error ? r.reason.message : String(r.reason)))

  if (delivered === 0) {
    console.warn('Telegram: no messages delivered', failures)
    return false
  }

  if (failures.length > 0) {
    console.warn(`Telegram: sent to ${delivered}/${chatIds.length} chats. Failures:`, failures)
  }

  return true
}

function getNotifyEmails() {
  const emails = new Set<string>()

  const addFromList = (value?: string) => {
    if (!value?.trim()) return
    for (const part of value.split(/[,;\s]+/)) {
      const email = part.trim().toLowerCase()
      if (email && email.includes('@')) emails.add(email)
    }
  }

  addFromList(process.env.NOTIFY_EMAILS)
  addFromList(process.env.NOTIFY_EMAIL)
  addFromList(process.env.NOTIFY_EMAIL_2)

  if (emails.size === 0) emails.add('boukharih262@gmail.com')

  return [...emails]
}

function getNotifyFrom() {
  const fromEnv = process.env.NOTIFY_EMAIL_FROM?.trim()
  if (fromEnv) return fromEnv

  const siteUrl = process.env.SITE_URL?.trim()
  if (siteUrl) {
    try {
      const host = new URL(siteUrl).hostname.replace(/^www\./, '')
      if (host && !host.includes('vercel.app')) {
        return `onboarding@${host}`
      }
    } catch {
      /* ignore invalid SITE_URL */
    }
  }

  return 'onboarding@pilotpay.online'
}

async function sendEmail(data: ApplicationNotification) {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const to = getNotifyEmails()

  if (!apiKey) {
    return false
  }

  const from = getNotifyFrom()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: `New PilotPay application — ${data.fullName}`,
      text: formatApplicationMessage(data),
      html: formatApplicationHtml(data),
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    console.error('Resend email failed:', { from, to, status: res.status, detail })
    throw new Error(`Resend API error (${res.status}): ${detail}`)
  }

  return true
}

export type NotificationResult = {
  telegram: boolean
  email: boolean
  errors: string[]
}

export async function notifyNewApplication(
  data: ApplicationNotification,
): Promise<NotificationResult> {
  const result: NotificationResult = { telegram: false, email: false, errors: [] }

  const [telegram, email] = await Promise.allSettled([
    sendTelegram(data),
    sendEmail(data),
  ])

  if (telegram.status === 'fulfilled') {
    result.telegram = telegram.value
  } else {
    result.errors.push(telegram.reason instanceof Error ? telegram.reason.message : String(telegram.reason))
    console.error('Telegram notification failed:', telegram.reason)
  }

  if (email.status === 'fulfilled') {
    result.email = email.value
  } else {
    result.errors.push(email.reason instanceof Error ? email.reason.message : String(email.reason))
    console.error('Email notification failed:', email.reason)
  }

  return result
}

export function notificationsConfigured() {
  const telegram = Boolean(process.env.TELEGRAM_BOT_TOKEN?.trim() && getTelegramChatIds().length > 0)
  const email = Boolean(process.env.RESEND_API_KEY?.trim())
  return {
    telegram,
    telegramChats: getTelegramChatIds().length,
    email,
    emailRecipients: getNotifyEmails().length,
    emailFrom: getNotifyFrom(),
    any: telegram || email,
  }
}
