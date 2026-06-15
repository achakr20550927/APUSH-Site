# Component Architecture & Code Spec
## "Signal & Static" — Developer Reference

---

## FILE STRUCTURE

```
signal-and-static/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── src/
│   ├── index.css
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Footer.tsx
│   │   ├── sections/
│   │   │   ├── IntroSection.tsx
│   │   │   ├── TechnologySection.tsx
│   │   │   ├── TelevisionSection.tsx
│   │   │   ├── MusicSection.tsx
│   │   │   ├── SourceLogSection.tsx
│   │   │   ├── ReflectionSection.tsx
│   │   │   └── HallOfFameSection.tsx
│   │   └── ui/
│   │       ├── StatCard.tsx
│   │       ├── SourceCard.tsx
│   │       ├── PullQuote.tsx
│   │       ├── TVSet.tsx
│   │       ├── TVChart.tsx
│   │       └── SectionLabel.tsx
│   └── hooks/
│       ├── useScrollReveal.ts
│       └── useCountUp.ts
```

---

## KEY COMPONENT SPECS

### useScrollReveal.ts
```ts
// Custom hook — triggers animation when element enters viewport
import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
```

### useCountUp.ts
```ts
// Animates a number from 0 to target when isVisible
export function useCountUp(target: number, isVisible: boolean, duration = 1200) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, target, duration])

  return count
}
```

### StatCard.tsx
```tsx
interface StatCardProps {
  value: string    // e.g. "90%"
  label: string    // e.g. "TV ownership"
  sub: string      // e.g. "by 1960"
  delay?: number
  dark?: boolean
}
// Renders a bordered card with animated count-up
// Uses useScrollReveal and useCountUp hooks
// dark prop: bg-[#1A1816] text-[#F5F1E8] vs bg-[#F5F1E8] text-[#1A1A1A]
```

### SourceCard.tsx
```tsx
interface SourceCardProps {
  number: string          // "01", "02", etc.
  title: string
  type: "Primary" | "Secondary"
  origin: string
  date: string
  categories: string[]    // ["Technology & innovation", "Music & dance"]
  whatItTells: string
  howItConnects: string
}
// Renders a formal source log entry
// Left amber border (w-1 bg-amber)
// Type badge: uppercase IBM Plex Mono, text-xs
// Categories: small chip pills
// Hover: translateY(-4px) transition
```

### TVSet.tsx
```tsx
// Pure SVG component — no image rights issues
// Props: size (number), showWaistLine (boolean), showCensorLabel (boolean)
// Renders: 1950s-style TV set with screen content, knobs, legs, antenna
// Screen shows: "CBS" text, optional waist-line dashes, optional label
// Used in: Hero, HallOfFameSection, TelevisionSection

export function TVSet({ size = 300, showWaistLine = false, showCensorLabel = false }) {
  // Scale all measurements from base 300px
  const scale = size / 300
  // ... SVG implementation
}
```

### TVChart.tsx
```tsx
// Chart.js line chart — TV ownership 1948–1960
// Import: { Line } from 'react-chartjs-2'
// Dark background (#1A1816), amber line (#C17B2A)
// Gridlines: #3A3530 (subtle)
// Labels: IBM Plex Mono
// Annotations plugin for event markers

const data = {
  labels: ['1948','1950','1951','1952','1953','1954','1955','1956','1957','1958','1959','1960'],
  datasets: [{
    label: 'TV Ownership %',
    data: [0.4, 9, 23, 34, 45, 56, 65, 72, 79, 83, 87, 90],
    borderColor: '#C17B2A',
    backgroundColor: 'rgba(193,123,42,0.1)',
    tension: 0.3,
    pointBackgroundColor: '#C17B2A',
    pointRadius: 5,
  }]
}
```

### SectionLabel.tsx
```tsx
// Reusable eyebrow label above section headings
// Props: number (string), title (string), color? ("amber" | "cream" | "muted")
// Renders: "02 / TECHNOLOGY & INNOVATION" in IBM Plex Mono
// Has an amber left border (h-full w-0.5)
```

### PullQuote.tsx
```tsx
// Large pull quote with decorative elements
// Props: quote (string), attribution? (string), dark? (boolean)
// Render: large Instrument Serif italic, centered or left-aligned
// Optional: amber left border, quotation marks in display font
```

---

## SMOOTH SCROLL IMPLEMENTATION

```tsx
// In Navbar.tsx — smooth scroll to sections
const handleNavClick = (e: React.MouseEvent, href: string) => {
  e.preventDefault()
  const target = document.querySelector(href)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// In each section — add id attribute
<section id="technology" className="...">
```

---

## MOTION VARIANTS (reusable)

```ts
// src/lib/motionVariants.ts

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

// Use with motion.div:
// <motion.div variants={fadeUp} initial="hidden" animate="visible">
// Or with viewport:
// <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
```

---

## REDUCED MOTION

```css
/* In index.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

```tsx
// In components — respect user preference
import { useReducedMotion } from 'motion/react'

const shouldReduceMotion = useReducedMotion()
const animProps = shouldReduceMotion
  ? {}
  : { initial: "hidden", animate: "visible", variants: fadeUp }
```

---

## RESPONSIVE BREAKPOINTS

```
Mobile:  < 640px   (sm)
Tablet:  640–1024px (md)
Desktop: > 1024px   (lg/xl)

Key responsive behaviors:
- Navbar: full links at lg, hamburger at < lg
- Hero h1: clamp(3rem, 8vw, 8rem)
- Section grid: 12-col at md, single col at mobile
- TV set illustration: hidden at mobile, shown at md+
- Stat cards: 1-col at mobile, 3-col at sm+
- Source cards: full width at mobile, two-col grid at md+
```

---

## HALL OF FAME SECTION — FULL SPEC

This is the most complex section. Build it last.

**Structure:**
```tsx
<section id="hall-of-fame" className="bg-[#2A2725] py-32 px-8 md:px-16">
  {/* 1. Header band */}
  <div className="border-b border-[#C17B2A] pb-8 mb-16">
    <p className="font-mono text-xs text-[#C17B2A] tracking-[0.3em] uppercase">
      American Culture Hall of Fame
    </p>
    <h2 className="font-display text-[clamp(4rem,10vw,10rem)] text-[#F5F1E8] leading-none">
      The Ed Sullivan Show
    </h2>
    <p className="font-mono text-[#C17B2A]">September 9, 1956</p>
  </div>

  {/* 2. Main content grid — 12 col */}
  <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">

    {/* Left: TV set + stats — col 1-5 */}
    <div className="col-span-12 md:col-span-5">
      <TVSet size={400} showWaistLine showCensorLabel />
      <div className="grid grid-cols-2 gap-3 mt-8">
        <StatCard value="60M" label="viewers" sub="Sept 9, 1956" dark />
        <StatCard value="82.6%" label="of TV households" sub="all viewers" dark />
        <StatCard value="$50K" label="performance fee" sub="unprecedented" dark />
        <StatCard value="3rd" label="appearance" sub="filmed waist up" dark />
      </div>
    </div>

    {/* Right: Letter + argument — col 7-12 */}
    <div className="col-span-12 md:col-span-6 md:col-start-7">
      {/* Nomination letter */}
      {/* Significance argument */}
      {/* APUSH connection */}
    </div>
  </div>

  {/* 3. Artifact description — full width */}
  <div className="mt-16 border border-[#3A3530] p-8 max-w-7xl mx-auto">
    {/* Museum-placard style artifact description */}
  </div>

  {/* 4. Induction plaque — centered, slow reveal */}
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1.2, delay: 0.3 }}
    viewport={{ once: true }}
    className="mt-16 border-2 border-[#C17B2A] p-12 max-w-2xl mx-auto text-center"
  >
    {/* Induction statement */}
  </motion.div>
</section>
```

---

## VITE CONFIG

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
})
```

---

## SETUP COMMANDS

```bash
# Create project
npm create vite@latest signal-and-static -- --template react-ts
cd signal-and-static

# Install dependencies
npm install motion chart.js react-chartjs-2 lucide-react

# Install dev dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Start dev server
npm run dev
```

---

## ACCESSIBILITY REQUIREMENTS

- All images: `alt` text with historical description
- All iframes (YouTube): `title` attribute
- Nav: `<nav>` element with `aria-label="Main navigation"`
- Section headings: proper H1 → H2 → H3 hierarchy
- Color contrast: amber on dark (#2A2725) must pass WCAG AA
- Keyboard navigation: all interactive elements focusable
- Skip link: "Skip to main content" for screen readers
- Reduced motion: respected via `prefers-reduced-motion`
