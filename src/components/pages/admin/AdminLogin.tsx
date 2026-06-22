import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, Lock } from 'lucide-react'
import { Logo } from '../../brand/Logo'
import { adminApi, setAdminToken } from '../../../lib/adminApi'

export function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { token } = await adminApi.login(password)
      setAdminToken(token)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="pointer-events-none absolute inset-0 bg-dot-dark opacity-40" />
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
        <Link to="/" className="mx-auto flex justify-center">
          <Logo tone="inverse" wordTone="inverse" size={32} />
        </Link>
        <h1 className="mt-6 text-center font-display text-2xl font-semibold text-white">
          Admin
        </h1>
        <p className="mt-2 text-center text-sm text-white/50">
          Sign in to manage eligibility applications
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white/70">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pr-4 pl-10 text-sm text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
                placeholder="Enter admin password"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-2.5 text-center text-sm text-accent">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-primary-strong disabled:opacity-60 cursor-pointer border-0"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
