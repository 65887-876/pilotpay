const testimonials = [
  { quote: "Didn't think it was real. First payout proved me wrong.", author: 'Alex M.' },
  { quote: 'My account was idle for months. Now it earns every single week.', author: 'Sarah K.' },
  { quote: 'Genuinely life-changing income stream.', author: 'James R.' },
  { quote: 'PilotPay paid me within days of connecting. Zero stress.', author: 'Priya D.' },
  { quote: 'Finally passive income that actually works.', author: 'Marcus T.' },
  { quote: 'Set it up Monday. Got paid Friday. I told everyone I know.', author: 'Emma L.' },
  { quote: "Simplest money I've ever made.", author: 'David W.' },
  { quote: 'Full transparency from day one. Complete peace of mind.', author: 'Lisa H.' },
]

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...testimonials, ...testimonials]
  return (
    <div className="overflow-hidden py-2.5">
      <div className={reverse ? 'marquee-track-reverse' : 'marquee-track'}>
        {items.map((t, i) => (
          <div
            key={i}
            className="mx-2.5 flex w-[320px] shrink-0 flex-col rounded-2xl border border-border bg-bg-raised p-5"
          >
            <p className="text-sm font-medium leading-6 text-ink-soft">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-3 text-xs font-semibold text-primary">{t.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Marquee() {
  return (
    <section className="border-y border-border bg-surface py-12">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Why serious account holders choose PilotPay
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
          We don&apos;t make promises we can&apos;t keep.{' '}
          <span className="text-accent">We make payouts.</span>
        </h2>
      </div>
      <div className="marquee-mask marquee-pause mt-9 space-y-1">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </section>
  )
}
