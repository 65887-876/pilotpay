import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/Button'
import { LogoLink } from './brand/Logo'
import { homeSections } from '../lib/site'

const links = [
  { label: 'Why PilotPay', hash: homeSections.why },
  { label: 'Solutions', hash: homeSections.solutions },
  { label: 'Partners', hash: homeSections.partners },
  { label: 'Resources', hash: homeSections.resources },
  { label: 'Contact', hash: homeSections.contact },
] as const

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border/70 bg-bg/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <LogoLink to="/" size={30} showTagline />

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={{ pathname: '/', hash: link.hash }}
                className="group relative inline-flex rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
                <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button to="/apply" magnetic className="px-5 py-2.5 text-sm" withArrow={false}>
            Check My Eligibility →
          </Button>
        </div>

        <button
          className="rounded-xl border border-border bg-surface p-2 text-ink shadow-sm md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-3 mb-3 rounded-2xl border border-border bg-surface p-3 shadow-card md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.label}
                to={{ pathname: '/', hash: link.hash }}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-soft transition-colors hover:bg-surface-sunken hover:text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2 border-t border-border pt-3">
              <Button to="/apply" className="w-full" withArrow={false} onClick={() => setOpen(false)}>
                Check My Eligibility →
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
