import { StripeLogo } from './StripeLogo'

export function StripePartnerBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-lg border border-white/12 bg-white/[0.04] px-3.5 py-2.5 ${className}`}
      aria-label="Stripe Verified Partner"
    >
      <StripeLogo />
      <span className="h-3.5 w-px bg-white/20" aria-hidden />
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">
        Verified Partner
      </span>
    </div>
  )
}
