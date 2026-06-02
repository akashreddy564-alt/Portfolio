import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WORDS = ['SIMULATE', 'ARCHITECT', 'ENGINEER']
const DURATION_MS = 2700
const WORD_CYCLE_MS = 900

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let rafId: number

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / DURATION_MS, 1)
      const newCount = Math.floor(progress * 100)
      setCount(newCount)

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setCount(100)
        const timer = setTimeout(onComplete, 400)
        return () => clearTimeout(timer)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length)
    }, WORD_CYCLE_MS)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col select-none"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      {/* Top-left label */}
      <motion.div
        className="absolute top-8 left-8 text-xs text-muted uppercase tracking-[0.3em] font-body"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      >
        AKASH REDDY // SYSTEMS
      </motion.div>

      {/* Center rotating word */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom section */}
      <div className="p-8 flex flex-col gap-4">
        {/* Counter — bottom right */}
        <div className="flex justify-end">
          <motion.span
            className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {String(count).padStart(3, '0')}
          </motion.span>
        </div>

        {/* Progress bar */}
        <div className="h-[3px] bg-stroke/50 rounded-full overflow-hidden">
          <div
            className="h-full accent-gradient rounded-full"
            style={{
              transform: `scaleX(${count / 100})`,
              transformOrigin: 'left center',
              transition: 'transform 0.05s linear',
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
