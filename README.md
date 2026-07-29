# NeoX Technologies — marketing site

Next.js 15 / TypeScript / Tailwind / GSAP + ScrollTrigger / Lenis / React Three Fiber.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

- `app/` — Next.js App Router entry (layout, page, globals.css)
- `components/layout/` — Navbar, Footer, SmoothScrollProvider (Lenis)
- `components/sections/` — Hero, Services, WhySignals, Process, DesignEngineering,
  PreviewCTA, Work, Testimonials, FAQ, CTA (contact)
- `components/three/` — R3F scenes: GradientBlob, FloatingParticles, HeroScene, OrbVisual
- `components/ui/` — Reveal (scroll-triggered fade-up wrapper), Icon (lucide-react map)
- `hooks/` — useLenis (smooth scroll), useDeviceTier (adaptive perf: DPR + particle count)
- `lib/siteConfig.ts` — single source of truth for brand, services, process, signals,
  work samples, FAQs, and contact details. Edit this file to update copy site-wide.
- `lib/gsap.ts` — GSAP + ScrollTrigger registration
- `public/assets/neox-logo.webp` — brand mark, used in Navbar and Footer

## Editing content

Almost all copy (services, process steps, "why us" signals, portfolio items, FAQs,
contact info, social links) lives in `lib/siteConfig.ts`. Update values there rather
than in the component files.

## Performance notes

- `useDeviceTier` downgrades DPR and particle count on low-end/mobile devices automatically.
- All 3D scenes are `next/dynamic` imported with `ssr: false` and code-split from the main bundle.
- `prefers-reduced-motion` disables blob rotation, particle drift, and camera parallax.
- Lenis smooth scroll is skipped entirely when reduced motion is requested.
