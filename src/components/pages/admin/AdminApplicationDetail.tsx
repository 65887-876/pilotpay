import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import {
  adminApi,
  clearAdminToken,
  type Application,
} from '../../../lib/adminApi'
import {
  volumeOptions,
  instantPayoutOptions,
  legalEntityOptions,
} from '../../apply/applyConfig'

const statuses = ['new', 'reviewing', 'approved', 'rejected', 'ineligible'] as const

function labelFor(
  options: { value: string; label: string }[],
  value: string | null | undefined,
) {
  return options.find((o) => o.value === value)?.label ?? value ?? '—'
}

export function AdminApplicationDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [app, setApp] = useState<Application | null>(null)
  const [status, setStatus] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    adminApi
      .getApplication(id)
      .then((data) => {
        setApp(data)
        setStatus(data.status)
        setNotes(data.notes ?? '')
      })
      .catch((err) => {
        if (err instanceof Error && err.message === 'Unauthorized') {
          clearAdminToken()
          navigate('/admin/login', { replace: true })
        }
      })
      .finally(() => setLoading(false))
  }, [id, navigate])

  async function save() {
    if (!id) return
    setSaving(true)
    setMessage(null)
    try {
      const updated = await adminApi.updateApplication(id, { status, notes })
      setApp(updated)
      setMessage('Saved successfully')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!app) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4">
        <p className="text-muted">Application not found</p>
        <Link to="/admin" className="mt-4 text-sm font-semibold text-primary hover:underline">
          Back to dashboard
        </Link>
      </div>
    )
  }

  const fields = [
    { label: 'Full name', value: app.full_name },
    { label: 'Phone', value: app.phone_number ?? app.whatsapp_number },
    { label: 'Country', value: app.phone_country },
    { label: 'Email', value: app.email_address },
    { label: 'Telegram', value: app.telegram_username },
    {
      label: 'Processing history',
      value: labelFor(volumeOptions, app.total_processed),
    },
    {
      label: 'Instant payouts',
      value: labelFor(instantPayoutOptions, app.instant_payouts),
    },
    {
      label: 'Legal structure',
      value: labelFor(legalEntityOptions, app.legal_entity),
    },
    { label: 'Onboarding', value: 'Manual' },
    { label: 'Submitted', value: new Date(app.created_at).toLocaleString() },
    { label: 'Updated', value: new Date(app.updated_at).toLocaleString() },
  ]

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-4 sm:px-6">
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          <h1 className="font-display text-lg font-semibold text-ink truncate">
            {app.full_name}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold text-ink">Applicant details</h2>
          <dl className="mt-6 space-y-4">
            {fields.map((f) => (
              <div key={f.label} className="grid gap-1 sm:grid-cols-[140px_1fr]">
                <dt className="text-sm font-medium text-muted">{f.label}</dt>
                <dd className="text-sm text-ink break-words">{f.value || '—'}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold text-ink">Manage</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-muted">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-primary"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-muted">
                Internal notes
              </label>
              <textarea
                id="notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full resize-none rounded-xl border border-border bg-bg px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder="Add notes about this applicant…"
              />
            </div>
            {message && (
              <p className="text-sm font-medium text-primary">{message}</p>
            )}
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-strong disabled:opacity-60 cursor-pointer border-0"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save changes
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
