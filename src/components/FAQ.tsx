import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Search } from 'lucide-react'

const faqs = [
  {
    q: "Why don't you use your own Stripe accounts?",
    a: "The e-commerce stores we work with are new and doing high-volume sales. Unlike established brands, these stores don't have a payment history, so if they scale quickly on one Stripe account, funds can be held. We diversify their sales across multiple Stripe accounts, allowing them to process safely at scale.",
  },
  {
    q: 'Should I give you my logins?',
    a: "No. Stripe allows you to add team members with different roles in a secure way. PilotPay's team will never ask for your personal login information. We'll ask you to add us as a team member — your credentials always remain private.",
  },
  {
    q: 'Is your business even legal?',
    a: "Yes. We only partner with e-commerce businesses that operate legally. Transparency is a key value — we can show you our stores, partners' stores, tracking numbers, and everything you need to verify legitimacy.",
  },
  {
    q: 'How quickly do I get paid?',
    a: 'Payouts are instant or same-day. Unlike other platforms that make you wait weeks or months, we process your earnings immediately.',
  },
  {
    q: 'Is my Stripe account safe?',
    a: 'Yes, 100% secure. We only connect you to verified, legitimate e-commerce brands. Your account remains under your control, and all transactions are transparent and trackable.',
  },
  {
    q: 'Are there any fees or hidden costs?',
    a: 'No fees whatsoever. No monthly subscriptions, no transaction fees, no hidden costs. You keep 100% of your earnings.',
  },
  {
    q: 'Do I need a business Stripe account?',
    a: "Any active Stripe account works — personal or business. As long as your account is in good standing and can process payments, you're eligible.",
  },
  {
    q: 'How do I get started?',
    a: "Check your eligibility on our site. We'll verify your Stripe account, connect you to our network of e-commerce brands, and you can start earning within 2 hours.",
  },
  {
    q: 'What about taxes?',
    a: "You're only responsible for taxes on your share of the profit, which is typically a smaller percentage — like 4%. We provide weekly or monthly invoices that clearly document your profit share under a legal contract.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const [query, setQuery] = useState('')

  const filtered = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(query.toLowerCase()) ||
      faq.a.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section className="bg-surface py-24" id="faq">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-center font-display text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-center text-muted">
          Everything you need to know about turning your account into a passive income stream
        </p>

        <div className="relative mx-auto mt-8 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setOpen(null)
              setQuery(e.target.value)
            }}
            placeholder="Search questions…"
            className="w-full rounded-full border border-border bg-bg py-3 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-primary"
          />
        </div>

        <div className="mt-8 space-y-3">
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted">No questions match &ldquo;{query}&rdquo;.</p>
          )}
          {filtered.map((faq) => {
            const realIndex = faqs.indexOf(faq)
            const isOpen = open === realIndex
            return (
              <div key={faq.q} className="overflow-hidden rounded-2xl border border-border bg-bg">
                <button
                  onClick={() => setOpen(isOpen ? null : realIndex)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer border-0 bg-transparent"
                >
                  <h3 className="font-display text-base font-semibold sm:text-lg">{faq.q}</h3>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-ink-soft">
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-6 text-muted">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
