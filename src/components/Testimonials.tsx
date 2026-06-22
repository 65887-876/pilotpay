import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize, Quote } from 'lucide-react'

import anastasiaVideo from '../assets/videos/Anastasia UGC.mp4'
import joshVideo from '../assets/videos/Josh UGC.mp4'
import patrickVideo from '../assets/videos/Patrick UGC.mp4'

import anastasiaPoster from '../assets/videos/posters/Anastasia UGC.jpg'
import joshPoster from '../assets/videos/posters/Josh UGC.jpg'
import patrickPoster from '../assets/videos/posters/Patrick UGC.jpg'

const videos = [
  { src: anastasiaVideo, poster: anastasiaPoster, name: 'Anastasia', role: 'Stripe Partner' },
  { src: joshVideo, poster: joshPoster, name: 'Josh', role: 'Account Holder' },
  { src: patrickVideo, poster: patrickPoster, name: 'Patrick', role: 'Digital Entrepreneur' },
]

const reviews = [
  {
    quote: 'Been working with them for a few months now. Commission structure is straightforward and payouts are consistent.',
    name: 'Evan B.',
    role: 'Stripe Partner',
  },
  {
    quote: 'Had a price discrepancy on my first transaction and was worried. They covered the difference without me even asking.',
    name: 'Marcus T.',
    role: 'E-commerce Store Owner',
  },
  {
    quote: 'Was skeptical at first but their onboarding made it super simple. Started earning from the first week.',
    name: 'Joseph L.',
    role: 'Digital Entrepreneur',
  },
  {
    quote: 'Setup was quick and easy. First commission came through within days. Clean interface, no hidden fees.',
    name: 'David R.',
    role: 'Account Holder',
  },
  {
    quote: "Honestly wasn't expecting much but the earnings came in faster than I thought. The passive income aspect is real.",
    name: 'Yvonne K.',
    role: 'Freelance Consultant',
  },
  {
    quote: 'My first payout took a bit longer but now they process really fast. Pretty impressive turnaround every time.',
    name: 'Ruksanna M.',
    role: 'Stripe Partner',
  },
]

function VideoCard({
  src,
  poster,
  name,
  role,
  shouldAutoplay,
  onActivate,
}: {
  src: string
  poster: string
  name: string
  role: string
  shouldAutoplay: boolean
  onActivate: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const userControlled = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)

  // Only the carousel's active (most visible) card autoplays — never all at once.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    if (shouldAutoplay) {
      userControlled.current = false
      v.play().then(() => setPlaying(true)).catch(() => {})
    } else if (!userControlled.current && !v.paused) {
      v.pause()
      v.currentTime = 0
      setPlaying(false)
    }
  }, [shouldAutoplay])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      userControlled.current = true
      onActivate()
      v.play()
      setPlaying(true)
    } else {
      userControlled.current = false
      v.pause()
      setPlaying(false)
    }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const goFullscreen = () => {
    videoRef.current?.requestFullscreen?.()
  }

  const onTimeUpdate = () => {
    const v = videoRef.current
    if (!v || !v.duration) return
    setProgress((v.currentTime / v.duration) * 100)
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current
    if (!v || !v.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration
  }

  return (
    <div
      data-video-card
      data-video-src={src}
      className="relative aspect-[9/16] w-[78%] shrink-0 snap-center overflow-hidden rounded-2xl border border-border bg-navy sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
    >
      <div className="relative flex h-full w-full flex-col bg-navy">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          playsInline
          preload={shouldAutoplay ? 'metadata' : 'none'}
          muted
          loop
          onClick={togglePlay}
          onTimeUpdate={onTimeUpdate}
          onEnded={() => setPlaying(false)}
          className="w-full flex-1 cursor-pointer object-cover"
        />

        {/* Center play affordance when paused */}
        {!playing && (
          <button
            onClick={togglePlay}
            aria-label="Play video"
            className="absolute inset-0 flex items-center justify-center text-white"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-transform hover:scale-105">
              <Play size={24} className="ml-0.5 fill-white" />
            </span>
          </button>
        )}

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div onClick={seek} className="relative h-1 w-full cursor-pointer rounded-full bg-white/20">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <div className="flex items-center gap-2">
              <button onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'} className="text-white transition-colors hover:text-accent">
                {playing ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} className="text-white transition-colors hover:text-accent">
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
            <span className="min-w-0 flex-1 truncate text-xs font-medium text-white/90">
              {name} <span className="text-white/50">· {role}</span>
            </span>
            <button onClick={goFullscreen} aria-label="Fullscreen" className="text-white transition-colors hover:text-accent">
              <Maximize size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function VideoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeSrc, setActiveSrc] = useState<string | null>(null)
  const [sectionVisible, setSectionVisible] = useState(false)

  const pickActiveCard = () => {
    const track = trackRef.current
    if (!track) return

    const cards = track.querySelectorAll<HTMLElement>('[data-video-card]')
    const trackRect = track.getBoundingClientRect()
    const trackCenter = trackRect.left + trackRect.width / 2

    let bestSrc: string | null = null
    let bestDistance = Infinity

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const cardCenter = rect.left + rect.width / 2
      const distance = Math.abs(cardCenter - trackCenter)

      // Card must be at least half visible inside the carousel viewport.
      const overlap =
        Math.min(rect.right, trackRect.right) - Math.max(rect.left, trackRect.left)
      if (overlap < rect.width * 0.5) return

      if (distance < bestDistance) {
        bestDistance = distance
        bestSrc = card.dataset.videoSrc ?? null
      }
    })

    setActiveSrc(bestSrc)
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const sectionObserver = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.25 },
    )
    sectionObserver.observe(track)

    pickActiveCard()
    track.addEventListener('scroll', pickActiveCard, { passive: true })
    window.addEventListener('resize', pickActiveCard)

    return () => {
      sectionObserver.disconnect()
      track.removeEventListener('scroll', pickActiveCard)
      window.removeEventListener('resize', pickActiveCard)
    }
  }, [])

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: 'smooth' })
    window.setTimeout(pickActiveCard, 400)
  }

  return (
    <div className="flex flex-col gap-5">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {videos.map((v) => (
          <VideoCard
            key={v.src}
            {...v}
            shouldAutoplay={sectionVisible && activeSrc === v.src}
            onActivate={() => setActiveSrc(v.src)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Previous"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 text-primary transition-all hover:bg-primary hover:text-white cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Next"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 text-primary transition-all hover:bg-primary hover:text-white cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const perPage = 3
  const maxIndex = Math.ceil(reviews.length / perPage) - 1
  const visible = reviews.slice(current * perPage, current * perPage + perPage)

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-display text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
          Real Results From Real People
        </h2>
        <p className="mt-3 text-center text-muted">
          Don&apos;t take our word for it. See what our clients have achieved.
        </p>

        {/* Video proof carousel */}
        <div className="mt-12">
          <VideoCarousel />
        </div>

        <div className="relative mt-16">
          <div className="grid gap-5 md:grid-cols-3">
            <AnimatePresence mode="wait">
              {visible.map((review, i) => (
                <motion.div
                  key={`${current}-${review.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col rounded-2xl border border-border bg-bg p-6"
                >
                  <Quote size={22} className="text-primary/25" />
                  <p className="mt-4 flex-1 text-sm leading-6 text-ink-soft">&ldquo;{review.quote}&rdquo;</p>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-sm font-semibold">{review.name}</p>
                    <p className="text-xs text-muted">{review.role}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink-soft transition-colors hover:bg-bg disabled:opacity-30 cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer border-0 ${
                    i === current ? 'w-6 bg-primary' : 'w-2 bg-border-strong'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => Math.min(maxIndex, c + 1))}
              disabled={current === maxIndex}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink-soft transition-colors hover:bg-bg disabled:opacity-30 cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
