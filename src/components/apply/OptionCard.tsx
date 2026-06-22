interface OptionCardProps {
  label: string
  description?: React.ReactNode
  selected: boolean
  onSelect: () => void
  type?: 'radio' | 'checkbox'
  variant?: 'light' | 'dark'
}

export function OptionCard({
  label,
  description,
  selected,
  onSelect,
  type = 'radio',
  variant = 'dark',
}: OptionCardProps) {
  const dark = variant === 'dark'

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-2xl border px-4 py-4 text-left transition-all cursor-pointer ${
        selected
          ? dark
            ? 'border-primary bg-primary/15 shadow-[0_0_0_1px_rgba(67,34,165,0.35)]'
            : 'border-primary bg-primary-soft shadow-[0_0_0_1px_rgba(67,34,165,0.15)]'
          : dark
            ? 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'
            : 'border-border bg-surface hover:border-border-strong hover:bg-bg'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            selected
              ? 'border-primary bg-primary'
              : dark
                ? 'border-white/25 bg-transparent'
                : 'border-border-strong bg-surface'
          }`}
        >
          {selected && (
            <span
              className={`bg-white ${type === 'checkbox' ? 'h-2 w-2 rounded-sm' : 'h-2 w-2 rounded-full'}`}
            />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-ink'}`}>{label}</p>
          {description && (
            <div className={`mt-1.5 text-sm leading-relaxed ${dark ? 'text-white/55' : 'text-muted'}`}>
              {description}
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
