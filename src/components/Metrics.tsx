import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  id: string
  value: string
  label: string
  sublabel: string
}

const STATS: Stat[] = [
  {
    id: 'gpa',
    value: '3.80 / 4.38',
    label: 'Academic Excellence',
    sublabel: 'UGA Engineering / LHS Top 13%',
  },
  {
    id: 'runs',
    value: '10,000+',
    label: 'Monte Carlo Compute Capacity',
    sublabel: 'Rupture Engine',
  },
  {
    id: 'sat',
    value: '1,490',
    label: 'Analytical Baseline',
    sublabel: '99th Percentile SAT',
  },
]

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [displayValue, setDisplayValue] = useState('—')

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setDisplayValue(stat.value)
      }, index * 150)
      return () => clearTimeout(timer)
    }
  }, [isInView, stat.value, index])

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="p-8 md:p-10 rounded-2xl border border-stroke/50 bg-surface/20 hover:bg-surface/40 hover:border-stroke transition-all duration-300">
        {/* Accent line */}
        <div className="w-8 h-[2px] accent-gradient mb-6" />

        {/* Value */}
        <motion.div
          className="text-3xl md:text-4xl lg:text-5xl font-display italic text-text-primary mb-3 tabular-nums"
          key={displayValue}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {displayValue}
        </motion.div>

        {/* Label */}
        <div className="text-sm text-text-primary/80 font-medium mb-1">
          {stat.label}
        </div>

        {/* Sublabel */}
        <div className="text-xs text-muted uppercase tracking-[0.2em]">
          {stat.sublabel}
        </div>
      </div>
    </motion.div>
  )
}

export default function Metrics() {
  return (
    <section className="bg-bg py-16 md:py-24">
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
              Benchmarks
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display leading-tight text-text-primary">
            Systems <em className="italic">metrics</em>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {STATS.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
