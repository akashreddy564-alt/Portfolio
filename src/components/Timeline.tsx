import { motion } from 'framer-motion'

interface Experience {
  id: string
  company: string
  role: string
  location: string
  period: string
  bullets: string[]
}

const EXPERIENCES: Experience[] = [
  {
    id: 'stratos',
    company: 'Stratos Research',
    role: 'Software Architect',
    location: 'Remote',
    period: 'Sept 2025 – Present',
    bullets: [
      'Architected features for a retail quant platform executing 1,000+ simulation stress-tests using React, Python, and AWS.',
      'Designed real-time data pipelines and AI strategy models for institutional-grade performance analysis.',
    ],
  },
  {
    id: 'uga-robotics',
    company: 'UGA Robotics',
    role: 'Control Systems Team Member',
    location: 'Athens, GA',
    period: 'Aug 2025 – Present',
    bullets: [
      'Engineered Python algorithms via NVIDIA Jetson for stability controls and gait execution on a quadruped robot frame.',
      'Developed real-time sensor fusion pipelines for terrain adaptation and autonomous locomotion.',
    ],
  },
  {
    id: 'aquascaping',
    company: 'Aquascaping Business',
    role: 'Engineering & Sales Manager',
    location: 'Remote',
    period: 'July 2021 – July 2025',
    bullets: [
      'Managed complex ecological systems and high-capacity custom builds up to 75 gallons.',
      'Led aquaculture B2B logistics and client systems engineering across multi-region supply networks.',
    ],
  },
  {
    id: 'tennis',
    company: 'Your Serve Tennis',
    role: 'Technical Associate / Racquet Stringer',
    location: 'Suwanee, GA',
    period: 'May 2024 – May 2025',
    bullets: [
      'Administered physical material framing optimization and movement style analysis.',
      'Leveraged structural video pipelines for technique assessment and performance tracking.',
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function Timeline() {
  return (
    <section id="experience" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Work History
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display leading-tight text-text-primary mb-3">
            Operational{' '}
            <em className="italic">history</em>
          </h2>
          <p className="text-sm text-muted max-w-md">
            Engineering roles across quantitative finance, robotics, and applied systems
            design.
          </p>
        </motion.div>

        {/* Timeline cards */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              variants={cardVariants}
              className="group"
            >
              <div className="flex items-start gap-6 p-5 sm:p-6 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-all duration-300 cursor-default">
                {/* Index number */}
                <div className="hidden sm:flex flex-shrink-0 w-8 h-8 rounded-full border border-stroke items-center justify-center">
                  <span className="text-[11px] text-muted font-mono">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  {/* Mobile: stacked, Desktop: inline flex */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-sm font-medium text-text-primary">
                        {exp.company}
                      </span>
                      <span className="hidden sm:block w-px h-3 bg-stroke" />
                      <span className="text-xs text-muted">{exp.role}</span>
                      <span className="hidden sm:block w-px h-3 bg-stroke" />
                      <span className="text-xs text-muted/60">{exp.location}</span>
                    </div>
                    <span className="text-xs text-muted/60 flex-shrink-0 font-mono">
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullets — show on hover or always on mobile */}
                  <ul className="sm:max-h-0 sm:overflow-hidden sm:group-hover:max-h-40 transition-all duration-500 ease-in-out space-y-1">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted/70">
                        <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-stroke" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right arrow */}
                <div className="hidden sm:flex flex-shrink-0 w-8 h-8 rounded-full border border-stroke items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-muted">↗</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
