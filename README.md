# Akash Reddy — Portfolio

Personal portfolio site for Akash Reddy, Computer Systems Engineering @ UGA '26.

## Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite 5 + TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | GSAP 3 + ScrollTrigger, Framer Motion 11 |
| Video | hls.js (Mux HLS stream) |
| Routing | React Router v6 |
| Fonts | Inter, Instrument Serif (Google Fonts) |

## Sections

- **Loading Screen** — RAF counter, word cycling, gradient progress bar
- **Hero** — HLS background video, GSAP entrance, cycling role text
- **Selected Systems** — Bento grid with 4 project cards + CSS dashboard mockups
- **Experience** — Timeline of engineering roles
- **Explorations** — Full-screen scroll-driven SVG symbol (compass/astrolabe) that assembles stroke-by-stroke via GSAP scrub
- **Metrics** — Engineering benchmarks
- **Footer** — GSAP marquee, email CTA, social links

## Dev

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build
npm run preview   # preview build
```

## Deploy

Deploys to Vercel. Push to `main` → auto-deploy.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/akashreddy564-alt/Portfolio)
