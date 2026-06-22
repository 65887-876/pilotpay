import { useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="relative z-[55] overflow-hidden bg-navy text-white"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 text-sm">
            <div className="flex flex-1 items-center justify-center gap-3">
              <span className="hidden items-center gap-1.5 rounded-full bg-accent/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                We're hiring
              </span>
              <p className="text-center text-white/75">
                PilotPay is growing — we're looking for driven people to join our team.{' '}
                <a href="#careers" className="inline-flex items-center gap-1 font-semibold text-white underline-offset-4 hover:underline">
                  Learn more
                  <ArrowRight size={13} />
                </a>
              </p>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="shrink-0 rounded-full p-1 hover:bg-white/15 transition-colors cursor-pointer border-0 bg-transparent text-white"
              aria-label="Dismiss announcement"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
