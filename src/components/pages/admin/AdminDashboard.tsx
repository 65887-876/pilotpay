import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Users,
  Clock,
  Search,
  LogOut,
  ChevronRight,
  RefreshCw,
  Inbox,
} from 'lucide-react'
import { Logo } from '../../brand/Logo'
import { adminApi, clearAdminToken, type Application, type AdminStats } from '../../../lib/adminApi'

const statusColors: Record<string, string> = {
  new: 'bg-primary-soft text-primary',
  reviewing: 'bg-amber-100 text-amber-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-700',
  ineligible: 'bg-surface-sunken text-muted',
}

const filters = ['all', 'new', 'reviewing', 'approved', 'rejected', 'ineligible'] as const

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: number
  icon: typeof Users
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">{label}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Icon size={18} />
        </span>
      </div>
      <p className="tabular mt-3 font-display text-3xl font-semibold text-ink">{value}</p>
    </div>
  )
}

export function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const [s, apps] = await Promise.all([
        adminApi.stats(),
        adminApi.listApplications({
          status: filter === 'all' ? undefined : filter,
          search: search || undefined,
        }),
      ])
      setStats(s)
      setApplications(apps)
    } catch (err) {
      if (err instanceof Error && err.message === 'Unauthorized') {
        clearAdminToken()
        navigate('/admin/login', { replace: true })
        return
      }
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [filter])

  useEffect(() => {
    const t = window.setTimeout(() => load(), 300)
    return () => window.clearTimeout(t)
  }, [search])

  async function logout() {
    try {
      await adminApi.logout()
    } catch {
      clearAdminToken()
    }
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/">
            <Logo size={28} showTagline />
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm font-medium text-muted sm:inline">Admin</span>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink cursor-pointer bg-transparent"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink">Applications</h1>
            <p className="mt-1 text-sm text-muted">Manage eligibility submissions</p>
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-ink-soft hover:text-ink cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {stats && (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatCard label="Total applications" value={stats.total} icon={Users} />
            <StatCard label="Last 7 days" value={stats.last7Days} icon={Clock} />
            <StatCard label="New" value={stats.byStatus.new ?? 0} icon={Inbox} />
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, phone, Telegram…"
              className="w-full rounded-xl border border-border bg-surface py-2.5 pr-4 pl-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors cursor-pointer border ${
                  filter === f
                    ? 'border-primary bg-primary text-white'
                    : 'border-border bg-surface text-muted hover:text-ink'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-accent-strong">
            {error}
          </p>
        )}

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
          {loading && applications.length === 0 ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : applications.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted">No applications found</p>
          ) : (
            <ul className="divide-y divide-border">
              {applications.map((app) => (
                <li key={app.id}>
                  <Link
                    to={`/admin/applications/${app.id}`}
                    className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-bg sm:px-6"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-ink">{app.full_name}</p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${statusColors[app.status] ?? 'bg-bg text-muted'}`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-sm text-muted">{app.email_address}</p>
                      <p className="mt-1 text-xs text-faint">
                        {new Date(app.created_at).toLocaleString()}
                        {(app.phone_number ?? app.whatsapp_number)
                          ? ` · ${app.phone_number ?? app.whatsapp_number}`
                          : ''}
                        {app.telegram_username ? ` · ${app.telegram_username}` : ''}
                      </p>
                    </div>
                    <ChevronRight size={18} className="shrink-0 text-faint" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
