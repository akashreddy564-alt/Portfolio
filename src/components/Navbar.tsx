import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = ['Home', 'Systems', 'Experience', 'Playground'] as const

const SECTION_IDS: Record<string, string> = {
  Home: 'home',
  Systems: 'systems',
  Experience: 'experience',
  Playground: 'playground',
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('Home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (link: string) => {
    setActive(link)
    const id = SECTION_IDS[link]
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <motion.div
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-all duration-300 ${
          scrolled ? 'shadow-md shadow-black/20' : ''
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
      >
        {/* Logo */}
        <motion.button
          className="relative w-9 h-9 rounded-full flex-shrink-0 group"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          aria-label="Home"
          onClick={() => handleNavClick('Home')}
        >
          {/* Gradient ring — reverses direction on hover */}
          <span
            className="absolute inset-0 rounded-full p-[2px] transition-all duration-300"
            style={{
              background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
            }}
          >
            <span className="flex w-full h-full rounded-full bg-bg items-center justify-center">
              <span className="font-display italic text-[13px] text-text-primary leading-none">
                AR
              </span>
            </span>
          </span>
          {/* Reversed gradient on hover — absolutely overlaid */}
          <span
            className="absolute inset-0 rounded-full p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(270deg, #89AACC 0%, #4E85BF 100%)',
            }}
          >
            <span className="flex w-full h-full rounded-full bg-bg items-center justify-center">
              <span className="font-display italic text-[13px] text-text-primary leading-none">
                AR
              </span>
            </span>
          </span>
        </motion.button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2 flex-shrink-0" />

        {/* Nav links */}
        <div className="flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 whitespace-nowrap ${
                active === link
                  ? 'text-text-primary bg-stroke/50'
                  : 'text-muted hover:text-text-primary hover:bg-stroke/50'
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2 flex-shrink-0" />

        {/* Connect button */}
        <div className="relative group flex-shrink-0">
          {/* Gradient border ring (shown on hover) */}
          <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient-animated" />
          <button className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary transition-colors duration-200">
            <span className="flex items-center gap-1 rounded-full bg-surface backdrop-blur-md px-2 py-0.5">
              Connect ↗
            </span>
          </button>
        </div>
      </motion.div>
    </nav>
  )
}
