import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'
import { Logo } from './brand/Logo'
import { StripePartnerBadge } from './brand/StripePartnerBadge'
import { StripeLogo } from './brand/StripeLogo'
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
            <div className="mt-6 inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-4 py-2">
              <StripeLogo tone="white" className="!text-[0.95rem]" />
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
