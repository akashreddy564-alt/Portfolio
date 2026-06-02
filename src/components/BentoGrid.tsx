import { useRef } from 'react'
import { motion } from 'framer-motion'

interface Project {
  id: string
  title: string
  tags: string[]
  span: number
  hoverLabel: string
  visual: React.ReactNode
}

// ─── Project visual mockups ───────────────────────────────────────────────────

function RuptureVisual() {
  return (
    <div className="relative w-full h-full bg-[#080c10] overflow-hidden">
      {/* Grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-rupture" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#89AACC" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-rupture)" />
      </svg>

      {/* Network graph */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 320" preserveAspectRatio="xMidYMid meet">
        {/* Edges */}
        <line x1="100" y1="80" x2="200" y2="140" stroke="#89AACC" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="200" y1="140" x2="320" y2="100" stroke="#89AACC" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="200" y1="140" x2="260" y2="220" stroke="#4E85BF" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="320" y1="100" x2="400" y2="160" stroke="#89AACC" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="260" y1="220" x2="380" y2="240" stroke="#4E85BF" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="100" y1="80" x2="140" y2="200" stroke="#89AACC" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="140" y1="200" x2="260" y2="220" stroke="#89AACC" strokeWidth="1" strokeOpacity="0.25" />
        {/* Disrupted edge */}
        <line x1="320" y1="100" x2="260" y2="220" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="4 3" />

        {/* Nodes */}
        <circle cx="100" cy="80" r="6" fill="#89AACC" fillOpacity="0.9" />
        <circle cx="200" cy="140" r="8" fill="#4E85BF" fillOpacity="1" />
        <circle cx="320" cy="100" r="5" fill="#89AACC" fillOpacity="0.8" />
        <circle cx="260" cy="220" r="6" fill="#89AACC" fillOpacity="0.8" />
        <circle cx="400" cy="160" r="5" fill="#89AACC" fillOpacity="0.7" />
        <circle cx="380" cy="240" r="4" fill="#89AACC" fillOpacity="0.6" />
        <circle cx="140" cy="200" r="5" fill="#89AACC" fillOpacity="0.7" />
        {/* Disrupted node */}
        <circle cx="320" cy="100" r="9" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.6" />

        {/* Data labels */}
        <text x="16" y="270" fill="#89AACC" fontSize="9" fontFamily="monospace" opacity="0.7">MONTE CARLO ENGINE</text>
        <text x="16" y="283" fill="#4E85BF" fontSize="8" fontFamily="monospace" opacity="0.6">10,247 SIMULATIONS</text>
      </svg>

      {/* Bottom stats bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#080c10] via-[#080c10]/80 to-transparent">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[10px] text-muted uppercase tracking-widest mb-1">DISRUPTION RISK</div>
            <div className="flex gap-1">
              {[84, 62, 91, 45, 77, 58, 83, 70].map((v, i) => (
                <div
                  key={i}
                  className="w-3 rounded-t-sm"
                  style={{
                    height: `${v * 0.3}px`,
                    background: v > 80 ? 'rgba(239,68,68,0.6)' : 'rgba(137,170,204,0.4)',
                  }}
                />
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-muted uppercase tracking-widest">RISK SCORE</div>
            <div className="text-2xl font-display italic accent-gradient-text">84.2%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StratosVisual() {
  const points = [50,65,55,75,60,80,68,90,72,85,88,78,95,82,100].map((y, i) => `${(i / 14) * 100},${100 - y}`)
  const polyline = points.join(' ')

  return (
    <div className="relative w-full h-full bg-[#060a0f] overflow-hidden">
      {/* Chart area */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="none">
        {/* Horizontal grid */}
        {[25, 50, 75].map((y) => (
          <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#89AACC" strokeWidth="0.4" strokeOpacity="0.2" />
        ))}
        {/* Equity curve fill */}
        <defs>
          <linearGradient id="equity-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4E85BF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4E85BF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={`0,100 ${polyline} 100,100`}
          fill="url(#equity-fill)"
          stroke="none"
        />
        {/* Equity curve line */}
        <polyline
          points={polyline}
          fill="none"
          stroke="#89AACC"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Last point highlight */}
        <circle cx="100" cy="0" r="2" fill="#89AACC" opacity="0.9" />
      </svg>

      {/* Metrics overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'SHARPE', value: '2.34' },
            { label: 'ALPHA', value: '+18.2%' },
            { label: 'RUNS', value: '1,284' },
          ].map((m) => (
            <div key={m.label} className="bg-surface/40 rounded-lg p-2 border border-stroke/50">
              <div className="text-[9px] text-muted uppercase tracking-widest mb-1">{m.label}</div>
              <div className="text-sm font-display italic accent-gradient-text">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top label */}
      <div className="absolute top-4 right-4 text-[9px] text-muted uppercase tracking-widest opacity-70">
        EQUITY CURVE // 90D
      </div>
    </div>
  )
}

function SupernovaVisual() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    x: 10 + (i * 37 + i * i * 7) % 82,
    y: 10 + (i * 53 + i * 11) % 75,
    size: 1.5 + (i % 3) * 0.8,
    delay: (i * 0.17) % 2,
  }))

  return (
    <div className="relative w-full h-full bg-[#05080d] overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#89AACC]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `float-particle ${1.8 + p.delay}s ease-in-out ${p.delay}s infinite`,
              opacity: 0.6 + (i % 3) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Radial glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '60%',
          height: '60%',
          left: '20%',
          top: '10%',
          background: 'radial-gradient(ellipse, rgba(78,133,191,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Wind indicator */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="w-5 h-5 flex items-center justify-center">
          <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#89AACC]" style={{ transform: 'rotate(-45deg)' }}>
            <path d="M10 2L10 18M10 2L6 8M10 2L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <span className="text-[10px] text-muted tracking-widest">NW 12mph</span>
      </div>

      {/* Bottom data */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#05080d] to-transparent">
        <div className="flex justify-between items-end">
          <div>
            <div className="text-[9px] text-muted uppercase tracking-widest">ACTIVE PARTICLES</div>
            <div className="text-xl font-display italic accent-gradient-text">5,000</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-muted uppercase tracking-widest">TEMP</div>
            <div className="text-xl font-display italic text-text-primary/80">68°F</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TypingTestVisual() {
  const text = 'The quick brown fox jumps over the lazy dog and types at incredible speed.'
  const highlightEnd = 42

  return (
    <div className="relative w-full h-full bg-[#060809] overflow-hidden flex flex-col">
      {/* Monospace text display */}
      <div className="flex-1 p-5 overflow-hidden">
        <div className="text-[11px] sm:text-xs font-mono leading-relaxed text-muted/60 break-all">
          {text.split('').map((char, i) => (
            <span
              key={i}
              className={
                i < highlightEnd
                  ? 'text-text-primary'
                  : i === highlightEnd
                  ? 'bg-[#89AACC]/30 text-[#89AACC]'
                  : ''
              }
            >
              {char}
            </span>
          ))}
          <span className="inline-block w-[2px] h-3 bg-[#89AACC] align-middle animate-pulse ml-px" />
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 pb-4">
        {/* Progress bar */}
        <div className="h-[2px] bg-stroke/50 rounded-full mb-3 overflow-hidden">
          <div
            className="h-full accent-gradient rounded-full"
            style={{ width: `${(highlightEnd / text.length) * 100}%` }}
          />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'WPM', value: '147' },
            { label: 'ACC', value: '98.3%' },
            { label: 'LAT', value: '12ms' },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-[9px] text-muted uppercase tracking-widest">{m.label}</div>
              <div className="text-sm font-display italic accent-gradient-text">{m.value}</div>
            </div>
          ))}
        </div>

        {/* Audio waveform */}
        <div className="mt-3 flex items-center gap-px h-5 overflow-hidden">
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              className="flex-1 rounded-full bg-[#89AACC]/40"
              style={{
                height: `${20 + Math.sin(i * 0.8) * 15 + Math.cos(i * 1.3) * 10}%`,
                opacity: 0.4 + (i % 4) * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Card component ───────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden cursor-pointer group md:col-span-${project.span} col-span-1`}
      style={{ gridColumn: `span ${project.span}` }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {/* Card shell */}
      <div className="relative bg-surface border border-stroke/50 rounded-2xl overflow-hidden h-[280px] sm:h-[320px]">
        {/* Halftone overlay */}
        <div className="absolute inset-0 z-[1] halftone-overlay pointer-events-none rounded-2xl" />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-[2] flex items-start justify-between p-4">
          <span className="text-xs font-mono text-muted uppercase tracking-[0.2em]">
            {project.title}
          </span>
          <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] px-1.5 py-0.5 rounded-full border border-stroke/80 text-muted bg-bg/60 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Visual area */}
        <div className="absolute inset-0 z-0">{project.visual}</div>

        {/* Hover overlay */}
        <div className="absolute inset-0 z-[3] bg-bg/70 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          {/* Hover label pill */}
          <div className="relative inline-flex">
            {/* Animated gradient border */}
            <span className="absolute inset-[-2px] rounded-full accent-gradient-animated" />
            <div className="relative bg-white rounded-full px-4 py-2">
              <span className="text-xs text-[#0a0a0a]">
                View —{' '}
                <em className="font-display italic">{project.hoverLabel}</em>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 'rupture',
    title: 'RUPTURE',
    tags: ['React', 'FastAPI', 'Python', 'NetworkX'],
    span: 7,
    hoverLabel: 'Monte Carlo Supply Chain Simulator',
    visual: <RuptureVisual />,
  },
  {
    id: 'stratos',
    title: 'STRATOS RESEARCH',
    tags: ['Next.js', 'Python', 'AWS', 'ML'],
    span: 5,
    hoverLabel: '1,000+ Run Stress-Testing Platform',
    visual: <StratosVisual />,
  },
  {
    id: 'supernova',
    title: 'SUPERNOVA SIMULATOR',
    tags: ['Node.js', 'HTML5 Canvas', 'OpenWeather API'],
    span: 5,
    hoverLabel: 'Physics Engine Dashboard',
    visual: <SupernovaVisual />,
  },
  {
    id: 'typing',
    title: 'KF TYPING TEST',
    tags: ['Vite', 'Web Audio API', 'JS Charts'],
    span: 7,
    hoverLabel: 'Real-time Audio Assessment Platform',
    visual: <TypingTestVisual />,
  },
]

export default function BentoGrid() {
  return (
    <section id="systems" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Selected Work
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display leading-tight text-text-primary mb-3">
              Featured{' '}
              <em className="italic">systems</em>
            </h2>
            <p className="text-sm text-muted max-w-md">
              A deployment history of simulations, data pipelines, and engineered
              software solutions.
            </p>
          </div>

          {/* View code history — desktop only */}
          <div className="hidden md:block relative group flex-shrink-0 ml-8">
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient-animated" />
            <button className="relative text-xs text-muted hover:text-text-primary border border-stroke rounded-full px-5 py-2.5 transition-colors duration-200 flex items-center gap-2">
              View code history <span>→</span>
            </button>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="col-span-1"
              style={{ gridColumn: `span ${project.span}` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
