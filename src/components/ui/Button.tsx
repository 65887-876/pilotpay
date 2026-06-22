import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMagnetic } from '../../lib/interactions'

type Variant = 'primary' | 'dark' | 'outline' | 'ghost'

interface ButtonProps {
  children: React.ReactNode
  variant?: Variant
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  withArrow?: boolean
  magnetic?: boolean
  /** When set, the button renders as a router Link to this path. */
  to?: string
  'aria-label'?: string
}

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white shadow-[0_8px_24px_-8px_rgba(67,34,165,0.5)] hover:bg-primary-strong',
  dark: 'bg-navy text-white hover:bg-navy-soft shadow-[0_8px_24px_-8px_rgba(14,18,48,0.45)]',
  outline:
    'bg-surface/60 text-ink border border-border-strong hover:border-primary hover:text-primary backdrop-blur-sm',
  ghost: 'bg-transparent text-ink-soft hover:text-ink hover:bg-ink/5',
}

const MotionLink = motion(Link)

export function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  withArrow = true,
  magnetic = false,
  to,
  ...rest
}: ButtonProps) {
  const mag = useMagnetic(0.25)
  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 cursor-pointer border-0 outline-offset-2'

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight size={13} strokeWidth={2.5} />
        </span>
      )}
    </>
  )

  const classes = `${base} ${variants[variant]} ${className}`

  // Link variant — magnetic pull when requested, otherwise a lift on hover.
  if (to) {
    if (magnetic) {
      return (
        <MotionLink
          ref={mag.ref as React.Ref<HTMLAnchorElement>}
          to={to}
          onClick={onClick}
          onMouseMove={mag.onMouseMove}
          onMouseLeave={mag.onMouseLeave}
          animate={{ x: mag.offset.x, y: mag.offset.y }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.4 }}
          whileTap={{ scale: 0.97 }}
          className={classes}
          {...rest}
        >
          {inner}
        </MotionLink>
      )
    }
    return (
      <MotionLink
        to={to}
        onClick={onClick}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={classes}
        {...rest}
      >
        {inner}
      </MotionLink>
    )
  }

  if (magnetic) {
    return (
      <motion.button
        ref={mag.ref as React.Ref<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        onMouseMove={mag.onMouseMove}
        onMouseLeave={mag.onMouseLeave}
        animate={{ x: mag.offset.x, y: mag.offset.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.4 }}
        whileTap={{ scale: 0.97 }}
        className={classes}
        {...rest}
      >
        {inner}
      </motion.button>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={classes}
      {...rest}
    >
      {inner}
    </motion.button>
  )
}
