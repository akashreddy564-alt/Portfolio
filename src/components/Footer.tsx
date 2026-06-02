import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import HlsVideo from './HlsVideo'

const MARQUEE_TEXT =
  'AKASH REDDY // DESIGN THE SIMULATION • BUILD THE ARCHITECTURE • '
const REPEATED = Array(10).fill(MARQUEE_TEXT).join('')
const MARQUEE_CONTENT = REPEATED + REPEATED

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/akashreddy564', icon: 'GH' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/akashreddy', icon: 'LI' },
  { label: 'LeetCode', href: 'https://leetcode.com/akashreddy', icon: 'LC' },
]

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function LeetCodeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  )
}

const ICON_MAP: Record<string, React.ReactNode> = {
  GH: <GitHubIcon />,
  LI: <LinkedInIcon />,
  LC: <LeetCodeIcon />,
}

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tween = gsap.to(marqueeRef.current, {
      x: '-50%',
      ease: 'none',
      duration: 40,
      repeat: -1,
    })
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <footer className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      {/* Background video — flipped */}
      <div className="relative h-[40vh] overflow-hidden mb-16 md:mb-24">
        <HlsVideo flipped className="opacity-60" />
        {/* Heavy code-terminal overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-bg to-transparent" />
      </div>

      {/* GSAP Marquee */}
      <div className="overflow-hidden mb-16 md:mb-24 border-y border-stroke/40 py-4">
        <div
          ref={marqueeRef}
          className="flex items-center whitespace-nowrap will-change-transform"
        >
          <span className="text-[11px] sm:text-xs font-mono text-muted uppercase tracking-[0.4em] opacity-60">
            {MARQUEE_CONTENT}
          </span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Email CTA */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">
            FORWARD TRANSFERS & PROJECTS
          </p>

          <div className="inline-block relative group">
            {/* Gradient border ring */}
            <span className="absolute inset-[-3px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 accent-gradient-animated" />
            <a
              href="mailto:akashreddy564@gmail.com"
              className="relative block rounded-2xl border border-stroke px-8 py-6 md:px-12 md:py-8 hover:border-transparent transition-colors duration-300"
            >
              <div className="text-2xl md:text-4xl lg:text-5xl font-display italic text-text-primary group-hover:accent-gradient-text transition-all duration-300">
                akashreddy564@gmail.com
              </div>
              <div className="text-xs text-muted mt-2 uppercase tracking-widest">
                Open for opportunities ↗
              </div>
            </a>
          </div>
        </motion.div>

        {/* Footer bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stroke/40">
          {/* Social links */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-stroke/60 text-muted hover:text-text-primary hover:border-stroke transition-all duration-200 text-xs"
                aria-label={link.label}
              >
                {ICON_MAP[link.icon]}
                <span className="hidden sm:block">{link.label}</span>
              </a>
            ))}
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
            <span className="text-[10px] text-muted uppercase tracking-[0.25em]">
              SYSTEMS ONLINE // AVAILABLE FOR FORWARD TRANSFERS & PROJECTS
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center">
          <span className="text-[10px] text-muted/40 font-mono uppercase tracking-widest">
            © 2026 Akash Reddy // All systems nominal
          </span>
        </div>
      </div>
    </footer>
  )
}
