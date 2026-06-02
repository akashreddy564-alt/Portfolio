<div align="center">

# AKASH REDDY — PORTFOLIO

**Computer Systems Engineering @ UGA '26**

*Full-stack platforms · Monte Carlo simulations · Robotics control systems*

---

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black)

</div>

---

## Overview

Dark, animation-driven portfolio built as a generative art experience — not a static page. Every section has a distinct motion identity. No templates, no UI kits.

## Sections

| Section | Description |
|---|---|
| **Loading Screen** | `requestAnimationFrame` counter 000→100 over 2.7s. Word cycling with `AnimatePresence`. |
| **Hero** | Mux HLS background video. GSAP `fromTo` entrance with blur-in stagger. Cycling role text. |
| **Selected Systems** | 12-column bento grid. Four projects with hand-coded SVG dashboard mockups (no screenshots). |
| **Experience** | Pill-style timeline cards. Bullet details expand on hover via `max-h` transition. |
| **Explorations** | Full-screen SVG compass/astrolabe that draws itself stroke-by-stroke, 1:1 tied to scroll via GSAP `scrub`. 480vh of dedicated scroll room drives a 10-unit timeline. |
| **Metrics** | Three engineering benchmarks with `useInView` counter reveal. |
| **Footer** | Flipped HLS video. GSAP infinite marquee. Email CTA with animated gradient border. |

## Stack

```
React 18 + Vite 5 + TypeScript
Tailwind CSS v3
GSAP 3 + ScrollTrigger    → scroll-driven animations
Framer Motion 11          → page transitions, micro-interactions
hls.js                    → Mux HLS video streaming
React Router v6           → client-side routing
Inter + Instrument Serif  → Google Fonts
```

## Local dev

```bash
git clone https://github.com/akashreddy564-alt/Portfolio
cd Portfolio
npm install
npm run dev        # → http://localhost:5173
```

```bash
npm run build      # tsc + vite build
npm run preview    # preview production build
```

## Design system

```css
--bg:      0 0%  4%    /* near-black background  */
--surface: 0 0%  8%    /* card/surface layer      */
--text:    0 0% 96%    /* primary text            */
--muted:   0 0% 53%    /* secondary / labels      */
--stroke:  0 0% 12%    /* borders                 */

/* Accent gradient */
linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)
```

Fonts: `Inter` (body) · `Instrument Serif` (display/italic)

---

<div align="center">

Built by **Akash Reddy** · [akashreddy564@gmail.com](mailto:akashreddy564@gmail.com)

</div>
