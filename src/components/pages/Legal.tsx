import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '../brand/Logo'

const pages: Record<string, { title: string; updated: string; body: string[] }> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'June 2026',
    body: [
      'PilotPay LTD ("we", "us") respects your privacy. This policy explains how we collect, use, and protect personal data when you use our website and eligibility application.',
      'We collect information you provide in the eligibility form (name, phone, email, optional Telegram, Stripe account details) solely to assess partnership eligibility and communicate with you.',
      'We do not sell your personal data. We may share data with service providers who assist our operations under strict confidentiality agreements.',
      'You may request access, correction, or deletion of your data by contacting contact@pilotpay.com.',
      'We use industry-standard security measures. Data is processed in accordance with UK GDPR and applicable regulations.',
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'June 2026',
    body: [
      'By using PilotPay services you agree to these terms. PilotPay connects Stripe account holders with vetted e-commerce partners under a revenue-share model.',
      'Eligibility is subject to review. We reserve the right to decline or terminate partnerships that do not meet compliance or risk standards.',
      'Revenue share percentages are agreed in writing per partner. Payout schedules and amounts depend on processing volume and program tier.',
      'You retain ownership of your Stripe account. PilotPay accesses accounts only via official team-member permissions you authorize.',
      'These terms are governed by the laws of England and Wales.',
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    updated: 'June 2026',
    body: [
      'We use essential cookies required for site functionality and security.',
      'Analytics cookies may be used to understand how visitors interact with our site. You can control cookies through your browser settings.',
      'We do not use cookies to sell personal data to third parties.',
    ],
  },
  aml: {
    title: 'AML Policy',
    updated: 'June 2026',
    body: [
      'PilotPay maintains Anti-Money Laundering (AML) procedures aligned with UK financial regulations.',
      'All partners undergo identity and eligibility verification before onboarding.',
      'We monitor transactions for suspicious activity and report obligations as required by law.',
      'Partners must operate legally and provide accurate business information during onboarding.',
    ],
  },
  security: {
    title: 'Security',
    updated: 'June 2026',
    body: [
      'We never request your Stripe login credentials. Access is granted only through official team-member invitations you control.',
      'Application data is transmitted over HTTPS and stored on secure infrastructure.',
      'We conduct regular reviews of our security practices and partner compliance requirements.',
      'Report security concerns to contact@pilotpay.com.',
    ],
  },
  partnership: {
    title: 'Partnership Agreement Overview',
    updated: 'June 2026',
    body: [
      'PilotPay partners receive a weekly revenue share for routing eligible e-commerce volume through their Stripe accounts.',
      'Standard tiers begin at 4% per transaction, with higher tiers available for Stripe accounts processing $50K+ monthly volume.',
      'Partners must maintain Stripe accounts in good standing and comply with Stripe terms of service.',
      'A formal partnership agreement is provided before activation. This overview does not replace the signed contract.',
    ],
  },
}

export function Legal() {
  const { slug = '' } = useParams<{ slug: string }>()
  const page = pages[slug]

  if (!page) {
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
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Legal</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-2 text-sm text-muted">Last updated: {page.updated}</p>

        <div className="prose-pilotpay mt-10 space-y-5">
          {page.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-base leading-7 text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
          <p className="text-sm text-muted">
            Questions about this document?{' '}
            <a href="mailto:contact@pilotpay.com" className="font-semibold text-primary hover:underline">
              contact@pilotpay.com
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
