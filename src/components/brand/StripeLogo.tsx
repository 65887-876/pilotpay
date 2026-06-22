type StripeLogoProps = {
  className?: string
  /** brand = Stripe purple (#635BFF), white = for dark backgrounds */
  tone?: 'brand' | 'white'
}

/** Stripe wordmark — lowercase typographic lockup (reliable vs. compound SVG paths). */
export function StripeLogo({ className = '', tone = 'brand' }: StripeLogoProps) {
  return (
    <span
      className={`inline-block select-none font-bold leading-none tracking-[-0.04em] ${
        tone === 'white' ? 'text-white' : 'text-[#635BFF]'
      } ${className}`}
      style={{
        fontFamily:
          '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
        fontSize: '1.125rem',
      }}
      aria-label="Stripe"
    >
      stripe
    </span>
  )
}
