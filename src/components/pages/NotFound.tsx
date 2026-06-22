import { Button } from '../ui/Button'

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center">
      <p className="font-display text-6xl font-semibold text-primary">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button to="/" withArrow={false}>
          Back to home
        </Button>
        <Button to="/apply" variant="outline" withArrow={false}>
          Check My Eligibility →
        </Button>
      </div>
    </div>
  )
}
