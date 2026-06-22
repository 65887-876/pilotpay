import { Component, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center">
          <h1 className="font-display text-2xl font-semibold text-ink">Something went wrong</h1>
          <p className="mt-3 max-w-md text-sm text-muted">
            An unexpected error occurred. Please refresh the page or return home.
          </p>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full border border-border bg-surface px-6 py-2.5 text-sm font-semibold text-ink cursor-pointer"
            >
              Refresh
            </button>
            <Link
              to="/"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white"
            >
              Go home
            </Link>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
