const TOKEN_KEY = 'pilotpay_admin_token'

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY)
}

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken()
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers as Record<string, string>),
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(path, { ...options, headers })

  let data: unknown = null
  const text = await res.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!res.ok) {
    const message =
      typeof data === 'object' && data !== null && 'message' in data
        ? String((data as { message: string }).message)
        : `Request failed (${res.status})`
    throw new Error(message)
  }

  return data as T
}

export type Application = {
  id: string
  full_name: string
  phone_number: string | null
  phone_country: string | null
  telegram_username: string | null
  email_address: string
  gateways: string[]
  total_processed: string | null
  instant_payouts: string | null
  legal_entity: string | null
  onboarding_preference: string | null
  status: string
  notes: string | null
  created_at: string
  updated_at: string
  /** @deprecated legacy field */
  whatsapp_number?: string | null
}

export type AdminStats = {
  total: number
  last7Days: number
  byStatus: Record<string, number>
}

export const adminApi = {
  login: (password: string) =>
    api<{ token: string; expiresAt: string }>('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    }),

  logout: () =>
    api<{ ok: boolean }>('/api/admin/logout', { method: 'POST' }).finally(clearAdminToken),

  me: () => api<{ ok: boolean }>('/api/admin/me'),

  stats: () => api<AdminStats>('/api/admin/stats'),

  listApplications: (params?: { status?: string; search?: string }) => {
    const q = new URLSearchParams()
    if (params?.status) q.set('status', params.status)
    if (params?.search) q.set('search', params.search)
    const qs = q.toString()
    return api<Application[]>(`/api/admin/applications${qs ? `?${qs}` : ''}`)
  },

  getApplication: (id: string) => api<Application>(`/api/admin/applications/${id}`),

  updateApplication: (id: string, patch: { status?: string; notes?: string }) =>
    api<Application>(`/api/admin/applications/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(patch),
    }),
}
