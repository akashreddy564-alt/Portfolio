import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import HlsVideo from './HlsVideo'

const ROLES = [
  'Monte Carlo Simulations',
  'Quant Platform Architecture',
  'Robotics Control Systems',
  'Intelligent Software',
]

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)

  // Cycle roles every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ ease: 'power3.out' })

      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 },
      ).fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1,
          stagger: 0.1,
          delay: 0.3,
        },
        '<',
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen overflow-hidden flex flex-col"
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <HlsVideo />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-black/20" />

      {/* Bottom fade to bg */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[2] bg-gradient-to-t from-bg to-transparent" />

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-20">
        {/* Eyebrow */}
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          COMPUTER SYSTEMS ENGINEERING // PORTFOLIO '26
        </p>

        {/* Name */}
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Akash Reddy
        </h1>

        {/* Role line */}
        <p className="blur-in text-sm md:text-base text-muted mb-3 max-w-xl leading-relaxed">
          Building full-stack platforms focused on{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              className="font-display italic text-text-primary inline-block"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {ROLES[roleIndex]}
            </motion.span>
          </AnimatePresence>
          .
        </p>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-xl mb-12 leading-relaxed">
          Engineering robust software architectures and advanced data pipelines,
          bridge-building the space between raw algorithmic compute and seamless
          user interfaces.
        </p>

        {/* CTA buttons */}
        <div className="blur-in inline-flex gap-4 flex-wrap justify-center">
          {/* Launch Systems */}
          <div className="relative group">
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient-animated" />
            <motion.button
              className="relative rounded-full text-sm px-7 py-3.5 font-medium bg-text-primary text-bg hover:bg-bg hover:text-text-primary transition-colors duration-300 z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Launch Systems
            </motion.button>
          </div>

          {/* Read Architecture */}
          <div className="relative group">
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient-animated" />
            <motion.button
              className="relative rounded-full text-sm px-7 py-3.5 font-medium border-2 border-stroke bg-bg text-text-primary hover:border-transparent transition-colors duration-300 z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Read Architecture
            </motion.button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex flex-col items-center gap-2 pb-10 self-center">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">
          SCROLL
        </span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="absolute inset-x-0 top-0 w-full h-full bg-text-primary/60 animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}
