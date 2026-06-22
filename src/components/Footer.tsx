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

const trustBadges = ['ICO', 'FCA', 'A+'] as const

function LinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="min-w-0">
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

function StripeWordmark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 25" className={`h-[18px] w-auto ${className}`} aria-label="Stripe">
      <path
        fill="currentColor"
        d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.87zm-5.32 7.03v.2h-.08c-.58-.87-1.64-1.54-3.02-1.54-2.87 0-5.27 2.54-5.27 7.42 0 4.82 2.4 7.56 5.27 7.56 1.38 0 2.44-.67 3.02-1.56h.08v.98c0 2.72-1.46 3.96-3.8 3.96a7.86 7.86 0 0 1-4.05-1.17l-.6 3.44c1.17.5 2.7.95 4.8.95 4.42 0 6.83-2.32 6.83-7.98V5.57h-3.76l-.1 1.03zm-3.86 9.7c-1.52 0-2.54-1.65-2.54-3.87 0-2.2 1.02-3.84 2.54-3.84 1.5 0 2.54 1.64 2.54 3.84 0 2.22-1.03 3.87-2.54 3.87zM5.5 5.57h3.9l.26 1.58c.6-.9 1.7-1.87 3.52-1.87 2.3 0 3.6 1.42 3.6 4.12v9.61H12.15v-8.9c0-1.28-.47-1.88-1.46-1.88-.88 0-1.4.6-1.76 1.17v9.61H5.5V5.57z"
      />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0a0c18] text-white">
      <div className="pointer-events-none absolute inset-0 bg-dot-dark opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12">
          {/* Brand — wider column */}
          <div className="sm:col-span-2 lg:col-span-4">
            <StripePartnerBadge className="mb-6" />
            <Link to="/" aria-label="PilotPay home" className="inline-block">
              <Logo variant="full" tone="inverse" wordTone="inverse" size={32} showTagline />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/55">
              The world&apos;s boldest Stripe income brokerage. We connect Stripe account holders
              with high-volume e-commerce operators — generating passive income with zero effort on
              your part.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail size={15} className="shrink-0 text-accent" />
                {site.email}
              </a>
              <p className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  19 Meridian N, Leicester LE19 1WD,
                  <br />
                  United Kingdom
                </span>
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex h-9 min-w-[2.75rem] items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-[10px] font-bold uppercase tracking-wider text-white/45"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <LinkColumn title="Navigation" links={navLinks} />
          </div>
          <div className="lg:col-span-2">
            <LinkColumn title="Partners" links={partnerLinks} />
          </div>
          <div className="lg:col-span-2">
            <LinkColumn title="Legal" links={legalLinks} />
          </div>

          {/* Compliance */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              Compliance
            </h4>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-white/55">
              <div>
                <p className="text-white/40">Registered Company:</p>
                <p className="mt-1 font-medium text-white/80">{site.companyName}</p>
              </div>
              <div>
                <p className="text-white/40">Jurisdiction:</p>
                <p className="mt-1">England &amp; Wales</p>
                <p>United Kingdom</p>
              </div>
            </div>
            <div className="mt-6 inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-white/70">
              <StripeWordmark />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          <span>Up to 8% Weekly Revenue Share</span>
          <span aria-hidden className="text-white/25">
            ·
          </span>
          <span>UK Registered Company</span>
          <span aria-hidden className="text-white/25">
            ·
          </span>
          <span>500+ Active Partners</span>
          <span aria-hidden className="text-white/25">
            ·
          </span>
          <span>GDPR Compliant</span>
          <span aria-hidden className="text-white/25">
            ·
          </span>
          <span>Governed by UK Law</span>
        </div>

        <p className="mt-6 text-center text-xs text-white/30">
          © 2026 {site.companyName}. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
