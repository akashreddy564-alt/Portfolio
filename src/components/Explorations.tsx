import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Geometry ─────────────────────────────────────────────────────────────────

const CX = 300, CY = 300
const R1 = 252   // outer ring
const R2 = 168   // mid ring
const R3 = 84    // inner ring
const R4 = 28    // core ring

const C1 = +(2 * Math.PI * R1).toFixed(1)   // 1583.4
const C2 = +(2 * Math.PI * R2).toFixed(1)   // 1055.6
const C3 = +(2 * Math.PI * R3).toFixed(1)   //  527.8
const C4 = +(2 * Math.PI * R4).toFixed(1)   //  175.9

function rad(deg: number) { return (deg * Math.PI) / 180 }

function pt(angleDeg: number, r: number) {
  const a = rad(angleDeg - 90) // 0° = top
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) }
}

// 12 spokes at 30° each — from core to outer
const SPOKES = Array.from({ length: 12 }, (_, i) => {
  const a = i * 30
  const inner = pt(a, R4)
  const outer = pt(a, R1)
  const len = Math.hypot(outer.x - inner.x, outer.y - inner.y)
  return { x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y, len }
})

// 24 tick marks on outer ring
const TICKS = Array.from({ length: 24 }, (_, i) => {
  const a = i * 15
  const major = a % 90 === 0
  const mid   = a % 30 === 0 && !major
  const tLen  = major ? 18 : mid ? 12 : 7
  const outer = pt(a, R1)
  const inner = pt(a, R1 - tLen)
  return { ...outer, ix: inner.x, iy: inner.y, len: tLen, major, mid }
})

// 12 nodes on mid ring
const MID_NODES = Array.from({ length: 12 }, (_, i) => pt(i * 30, R2))

// 4 cardinal diamonds on inner ring
const CARDINALS = [0, 90, 180, 270].map(a => pt(a, R3))

// Hexagon at core
const HEX = Array.from({ length: 6 }, (_, i) => pt(i * 60, R4 * 0.85))
const HEX_POINTS = HEX.map(p => `${p.x},${p.y}`).join(' ')
const HEX_PERIMETER = 6 * R4 * 0.85 * 2 * Math.sin(Math.PI / 6) * 6
// actual hex side = R*2*sin(π/6) = R — just use 6*R
const HEX_PERIM = +(6 * R4 * 0.85).toFixed(1)

// ─── Component ────────────────────────────────────────────────────────────────

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef  = useRef<HTMLDivElement>(null)
  const glowRef    = useRef<HTMLDivElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Set initial state for elements that start invisible
      gsap.set(glowRef.current, { opacity: 0 })
      gsap.set(textRef.current, { opacity: 0, y: 16 })

      // ── MASTER TIMELINE ─────────────────────────────────────────────────
      // Entire section = 480 vh of scroll.
      // Timeline has 10 "units". 1 unit ≈ 48 vh.
      // scrub: 1.2 → lag of ~1.2s for smoothing

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: stickyRef.current,
          pinSpacing: false,
          onUpdate(self) { setPct(Math.round(self.progress * 100)) },
        },
      })

      // ── 0 → 2.5: Outer ring traces itself ───────────────────────────────
      tl.to('#eo-r1', { strokeDashoffset: 0, duration: 2.5 }, 0)

      // ── 1.2 → 2.6: 12 spokes shoot outward (fast stagger) ───────────────
      tl.to('.eo-spoke', {
        strokeDashoffset: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
      }, 1.2)

      // ── 2.5 → 4.5: Mid ring traces ──────────────────────────────────────
      tl.to('#eo-r2', { strokeDashoffset: 0, duration: 2 }, 2.5)

      // ── 4.0 → 5.5: Inner ring ───────────────────────────────────────────
      tl.to('#eo-r3', { strokeDashoffset: 0, duration: 1.5 }, 4.0)

      // ── 4.5 → 5.3: 24 tick marks fire in fast ───────────────────────────
      tl.to('.eo-tick', {
        strokeDashoffset: 0,
        duration: 0.3,
        ease: 'power2.out',
        stagger: { each: 0.025, from: 'start' },
      }, 4.5)

      // ── 5.5 → 6.4: 12 mid nodes appear ─────────────────────────────────
      tl.to('.eo-mnode', {
        opacity: 1,
        attr: { r: 3 },
        duration: 0.35,
        stagger: 0.075,
      }, 5.5)

      // ── 6.2 → 7.0: 4 cardinal rings pop in ─────────────────────────────
      tl.to('.eo-card', {
        opacity: 1,
        attr: { r: 8 },
        duration: 0.45,
        ease: 'back.out(2)',
        stagger: 0.15,
      }, 6.2)

      // ── 6.8 → 8.0: Core ring draws ──────────────────────────────────────
      tl.to('#eo-r4', { strokeDashoffset: 0, duration: 1.2 }, 6.8)

      // ── 7.2 → 8.2: Hexagon traces ───────────────────────────────────────
      tl.to('#eo-hex', { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, 7.2)

      // ── 8.0 → 8.6: Center pulse in ──────────────────────────────────────
      tl.to('#eo-center', { opacity: 1, attr: { r: 6 }, duration: 0.5, ease: 'back.out(3)' }, 8.0)

      // ── 8.0 → 10: Radial glow swells ────────────────────────────────────
      tl.to(glowRef.current, { opacity: 1, duration: 2 }, 8.0)

      // ── 8.2 → 10: Text reveals ──────────────────────────────────────────
      tl.to(textRef.current, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, 8.2)

      // ── Continuous slow rotation of spoke layer (CSS handles this) ───────
      // Nothing more needed — CSS animation on #eo-rotating handles it

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="playground"
      ref={sectionRef}
      className="relative bg-bg"
      style={{ minHeight: '480vh' }}
    >
      {/* ── Sticky viewport ───────────────────────────────────────────────── */}
      <div
        ref={stickyRef}
        className="relative h-screen w-full overflow-hidden bg-bg flex flex-col items-center justify-center"
      >

        {/* ── Ambient glow (fades in at end) ─────────────────────────────── */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(78,133,191,0.09) 0%, rgba(137,170,204,0.03) 50%, transparent 70%)',
          }}
        />

        {/* ── Fine dot grid background ───────────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(137,170,204,0.18) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* ── Vignette ───────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, hsl(var(--bg)) 100%)',
          }}
        />

        {/* ── SVG Symbol ─────────────────────────────────────────────────── */}
        <svg
          viewBox="0 0 600 600"
          className="relative z-10 select-none"
          style={{ width: 'min(80vw, 72vh)', height: 'min(80vw, 72vh)', maxWidth: 520, maxHeight: 520, overflow: 'visible' }}
          aria-hidden="true"
        >
          <defs>
            {/* Glow filter for center */}
            <filter id="eo-glow-f" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Subtle glow for mid ring */}
            <filter id="eo-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── LAYER 0: Outer ring ──────────────────────────────────────── */}
          <circle
            id="eo-r1"
            cx={CX} cy={CY} r={R1}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.8"
            strokeDasharray={C1}
            strokeDashoffset={C1}
          />

          {/* ── LAYER 1: 12 Spokes ──────────────────────────────────────── */}
          {SPOKES.map((s, i) => (
            <line
              key={i}
              className="eo-spoke"
              x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
              stroke="rgba(137,170,204,0.28)"
              strokeWidth="0.6"
              strokeDasharray={s.len}
              strokeDashoffset={s.len}
            />
          ))}

          {/* ── LAYER 2: Mid ring ────────────────────────────────────────── */}
          <circle
            id="eo-r2"
            cx={CX} cy={CY} r={R2}
            fill="none"
            stroke="rgba(137,170,204,0.55)"
            strokeWidth="1"
            strokeDasharray={C2}
            strokeDashoffset={C2}
            filter="url(#eo-soft)"
          />

          {/* ── LAYER 3: 24 Tick marks ───────────────────────────────────── */}
          {TICKS.map((t, i) => (
            <line
              key={i}
              className="eo-tick"
              x1={t.x} y1={t.y} x2={t.ix} y2={t.iy}
              stroke={t.major ? 'rgba(255,255,255,0.55)' : t.mid ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.18)'}
              strokeWidth={t.major ? '1' : '0.6'}
              strokeDasharray={t.len}
              strokeDashoffset={t.len}
            />
          ))}

          {/* ── LAYER 4: Inner ring ──────────────────────────────────────── */}
          <circle
            id="eo-r3"
            cx={CX} cy={CY} r={R3}
            fill="none"
            stroke="#89AACC"
            strokeWidth="1.2"
            strokeDasharray={C3}
            strokeDashoffset={C3}
          />

          {/* ── LAYER 5: Mid-ring nodes (12) ─────────────────────────────── */}
          {MID_NODES.map((n, i) => (
            <circle
              key={i}
              className="eo-mnode"
              cx={n.x} cy={n.y} r={0}
              fill="#89AACC"
              opacity={0}
            />
          ))}

          {/* ── LAYER 6: Cardinal accent rings (4) ───────────────────────── */}
          {CARDINALS.map((n, i) => (
            <circle
              key={i}
              className="eo-card"
              cx={n.x} cy={n.y} r={0}
              fill="none"
              stroke="#89AACC"
              strokeWidth="1.5"
              opacity={0}
            />
          ))}

          {/* ── LAYER 7: Core ring ───────────────────────────────────────── */}
          <circle
            id="eo-r4"
            cx={CX} cy={CY} r={R4}
            fill="none"
            stroke="#89AACC"
            strokeWidth="1.5"
            strokeDasharray={C4}
            strokeDashoffset={C4}
            filter="url(#eo-soft)"
          />

          {/* ── LAYER 8: Inner hexagon ───────────────────────────────────── */}
          <polygon
            id="eo-hex"
            points={HEX_POINTS}
            fill="none"
            stroke="rgba(137,170,204,0.7)"
            strokeWidth="0.8"
            strokeDasharray={HEX_PERIM}
            strokeDashoffset={HEX_PERIM}
          />

          {/* ── LAYER 9: Center dot ──────────────────────────────────────── */}
          <circle
            id="eo-center"
            cx={CX} cy={CY} r={0}
            fill="#89AACC"
            opacity={0}
            filter="url(#eo-glow-f)"
          />
        </svg>

        {/* ── Scroll counter ─────────────────────────────────────────────── */}
        <div className="absolute top-8 right-8 pointer-events-none">
          <span className="font-mono text-[10px] text-muted/40 uppercase tracking-widest tabular-nums">
            {String(pct).padStart(2, '0')}%
          </span>
        </div>

        {/* ── Eyebrow label ──────────────────────────────────────────────── */}
        <div className="absolute top-8 left-8 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-4 h-px bg-stroke" />
            <span className="text-[9px] font-mono text-muted/40 uppercase tracking-[0.35em]">
              Explorations
            </span>
          </div>
        </div>

        {/* ── Bottom text (fades in at end of animation) ─────────────────── */}
        <motion.div
          ref={textRef}
          className="absolute bottom-10 left-0 right-0 text-center pointer-events-none"
          style={{ opacity: 0 }}
        >
          <h2 className="text-xl md:text-2xl font-display italic text-text-primary/80">
            Visual <em className="not-italic text-[#89AACC]">playground</em>
          </h2>
          <p className="text-xs text-muted mt-1 uppercase tracking-[0.3em]">
            Algorithmic studies · Robotics testing · Data labs
          </p>
        </motion.div>

        {/* ── Scroll prompt (visible at start, fades as you scroll) ─────── */}
        <div
          className="absolute bottom-10 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: pct > 5 ? 0 : 1, transition: 'opacity 0.5s' }}
        >
          <span className="text-[9px] text-muted/40 uppercase tracking-widest">scroll</span>
          <div className="w-px h-6 bg-stroke/50 relative overflow-hidden">
            <div className="absolute inset-0 accent-gradient animate-scroll-down" />
          </div>
        </div>

      </div>
    </section>
  )
}
