import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'
import { Logo } from './brand/Logo'
import { StripePartnerBadge } from './brand/StripePartnerBadge'
import { homeSections, site } from '../lib/site'

type FooterLink = { label: string; to: string }

const navLinks: FooterLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: `/#${homeSections.why}` },
  { label: 'Services', to: `/#${homeSections.solutions}` },
  { label: 'Careers', to: `/#${homeSections.careers}` },
  { label: 'Contact', to: `/#${homeSections.contact}` },
]

const partnerLinks: FooterLink[] = [
  { label: 'Partnership Agreement', to: '/legal/partnership' },
  { label: 'How It Works', to: `/#${homeSections.about}` },
  { label: 'Earnings Calculator', to: '/apply' },
  { label: 'FAQ', to: `/#${homeSections.faq}` },
  { label: 'Get Started', to: '/apply' },
]

const legalLinks: FooterLink[] = [
  { label: 'Privacy Policy', to: '/legal/privacy' },
  { label: 'Terms of Service', to: '/legal/terms' },
  { label: 'Cookie Policy', to: '/legal/cookies' },
  { label: 'AML Policy', to: '/legal/aml' },
  { label: 'Security', to: '/legal/security' },
]

function LinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              className="text-sm text-white/65 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0a0c18] text-white">
      <div className="pointer-events-none absolute inset-0 bg-dot-dark opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <StripePartnerBadge className="mb-5" />
            <Link to="/" aria-label="PilotPay home">
              <Logo variant="full" tone="inverse" wordTone="inverse" size={32} showTagline />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/55">
              The world&apos;s boldest Stripe income brokerage. We connect Stripe account holders
              with high-volume e-commerce operators — generating passive income with zero effort on
              your part.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-white/70">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail size={15} className="shrink-0 text-accent" />
                {site.email}
              </a>
              <p className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                {site.address}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {['ICO', 'FCA', 'A+'].map((badge) => (
                <span
                  key={badge}
                  className="flex h-9 min-w-[3rem] items-center justify-center rounded-lg border border-white/10 bg-white/5 px-2 text-[10px] font-bold uppercase tracking-wider text-white/50"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <LinkColumn title="Navigation" links={navLinks} />
          <LinkColumn title="Partners" links={partnerLinks} />
          <LinkColumn title="Legal" links={legalLinks} />

          {/* Compliance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              Compliance
            </h4>
            <div className="mt-4 space-y-3 text-sm text-white/55">
              <div>
                <p className="text-white/40">Registered Company:</p>
                <p className="mt-0.5 font-medium text-white/75">PilotPay LTD</p>
              </div>
              <div>
                <p className="text-white/40">Jurisdiction:</p>
                <p className="mt-0.5">England &amp; Wales</p>
                <p>United Kingdom</p>
              </div>
            </div>
            <div className="mt-5">
              <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/70">
                Stripe
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-white/10 pt-8 text-xs text-white/45">
          <span>Up to 8% Weekly Revenue Share</span>
          <span aria-hidden>·</span>
          <span>UK Registered Company</span>
          <span aria-hidden>·</span>
          <span>500+ Active Partners</span>
          <span aria-hidden>·</span>
          <span>GDPR Compliant</span>
          <span aria-hidden>·</span>
          <span>Governed by UK Law</span>
        </div>

        <p className="mt-6 text-center text-xs text-white/35">
          © 2026 PilotPay LTD. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
