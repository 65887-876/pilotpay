import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { legalDocuments, type LegalBlock } from '../../content/legalDocuments'

function LegalBlockView({ block }: { block: LegalBlock }) {
  if (block.type === 'p') {
    return <p className="text-base leading-7 text-ink-soft">{block.text}</p>
  }
  if (block.type === 'h3') {
    return <h3 className="mt-6 font-display text-lg font-semibold text-ink">{block.text}</h3>
  }
  if (block.type === 'ul') {
    return (
      <ul className="ml-5 list-disc space-y-2 text-base leading-7 text-ink-soft">
        {block.items.map((item) => (
          <li key={item.slice(0, 48)}>{item}</li>
        ))}
      </ul>
    )
  }
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[320px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-sunken">
            {block.headers.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-ink">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-ink-soft">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Legal() {
  const { slug = '' } = useParams<{ slug: string }>()
  const doc = legalDocuments[slug]

  if (!doc) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center">
        <h1 className="font-display text-2xl font-semibold">Document not found</h1>
        <Link to="/" className="mt-6 text-sm font-semibold text-primary hover:underline">
          Return home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" aria-label="PilotPay home">
            <Logo size={28} showTagline />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
          >
            <ArrowLeft size={15} />
            Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
          {doc.title}
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: {doc.updated}</p>

        <p className="mt-8 text-base leading-7 text-ink-soft">{doc.intro}</p>

        <div className="mt-12 space-y-10">
          {doc.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.blocks.map((block, i) => (
                  <LegalBlockView key={`${section.title}-${i}`} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
