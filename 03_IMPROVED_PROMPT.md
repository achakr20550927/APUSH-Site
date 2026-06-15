# Improved Build Prompt — "Signal & Static"
## React + Vite + Tailwind + motion/react
### APUSH 1950s Technology Project

---

Build a modern, editorial-grade React landing page using Vite, Tailwind CSS, and motion/react. The site is called **"Signal & Static"** — an APUSH decades project about how technology shaped the 1950s. It must feel like a real publication: part magazine, part museum exhibit, part academic argument. Typography-forward, content-dense, historically grounded.

---

## 1. TYPOGRAPHY & GLOBAL CSS (`src/index.css`)

Import from Google Fonts:
- `Instrument Serif` (body, pull quotes, letter text)
- `IBM Plex Mono` (captions, source labels, data, annotations)
- `Bricolage Grotesque` (display headlines, section titles)

CSS custom properties:
```css
--font-display:     'Bricolage Grotesque', sans-serif;
--font-body:        'Instrument Serif', serif;
--font-mono:        'IBM Plex Mono', monospace;

--color-bg:         #EDEEF5;
--color-surface:    #F5F1E8;
--color-ink:        #1A1A1A;
--color-muted:      #6B6560;
--color-amber:      #C17B2A;
--color-amber-lt:   #F5DEB3;
--color-static:     #2A2725;
--color-border:     rgba(26,26,26,0.12);
```

Body: `@apply bg-[#EDEEF5] text-[#1A1A1A] font-body antialiased`

---

## 2. ROOT COMPONENT (`src/App.tsx`)

Import: `Navbar`, `Hero`, and one section component per section.

```tsx
return (
  <div className="min-h-screen bg-[#EDEEF5] selection:bg-[#C17B2A] selection:text-white">
    <Navbar />
    <main>
      <Hero />
      <IntroSection />
      <TechnologySection />
      <TelevisionSection />
      <MusicSection />
      <SourceLogSection />
      <ReflectionSection />
      <HallOfFameSection />
    </main>
    <Footer />
  </div>
)
```

---

## 3. NAVBAR (`src/components/Navbar.tsx`)

Fixed, glassmorphic, fades from dark to transparent:

```
fixed top-0 left-0 w-full z-50 py-5 md:py-8
bg-gradient-to-b from-[#2A2725]/90 to-transparent
backdrop-blur-[3px]
```

Grid layout (12-col, max-w-7xl, mx-auto, px-6 md:px-12):

**Left (cols 1–3):**
- A small broadcast-tower SVG icon (stroke: #C17B2A)
- Brand name: **"signal & static"** in IBM Plex Mono, text-sm, text-[#F5F1E8]/80

**Center (cols 4–9), desktop only:**
- Nav links: `technology` · `television` · `music` · `sources` · `hall of fame`
- All lowercase, IBM Plex Mono, text-xs, text-[#F5F1E8]/60, hover:text-[#C17B2A]
- Each link is a smooth-scroll anchor (`href="#technology"` etc)

**Right (cols 10–12):**
- "1950–1960" in IBM Plex Mono text-xs text-[#C17B2A]
- "apush period 8" badge: small, border border-[#F5F1E8]/20, rounded-sm, px-2 py-0.5

**Mobile drawer:**
- Hamburger icon (animated, 3 lines → X via motion)
- AnimatePresence + motion.div slides down, dark bg, full nav links stacked
- Close on link click

---

## 4. HERO SECTION (`src/components/Hero.tsx`)

```tsx
<section className="relative min-h-[110vh] sm:min-h-[140vh] w-full flex flex-col items-center justify-start overflow-hidden bg-[#EDEEF5]">
```

**Background video container:**
```tsx
<div className="absolute top-[15vh] sm:top-[20vh] left-0 w-full h-[95vh] sm:h-[120vh] z-0 pointer-events-none">
  <video
    autoPlay loop muted playsInline
    className="w-full h-full object-cover opacity-90"
    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4"
  />
  {/* Top fade to merge with nav */}
  <div className="absolute top-0 left-0 w-full h-28 sm:h-40 bg-gradient-to-b from-[#EDEEF5] to-transparent" />
  {/* Amber tint overlay for period mood */}
  <div className="absolute inset-0 bg-[#C17B2A]/5 mix-blend-multiply" />
</div>
```

**Hero content (z-10, relative):**
Grid: `max-w-7xl w-full mx-auto px-8 md:px-16 lg:px-20 relative z-10 grid grid-cols-12 gap-x-4 md:gap-x-8`

Text block: `col-span-12 md:col-span-8 md:col-start-2 pt-[18vh] sm:pt-[22vh]`

**Eyebrow (motion, delay 0):**
```
IBM Plex Mono, text-xs, text-[#C17B2A] tracking-[0.2em] uppercase mb-4
"APUSH DECADES PROJECT  //  1950s  //  TECHNOLOGY & INNOVATION"
```
Animation: `initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}`

**H1 (motion, delay 0.1):**
```
Bricolage Grotesque, text-[clamp(3rem,8vw,8rem)], leading-[0.95], font-bold
```
Animation: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}`

Text structure:
```
Signal [text-[#1A1A1A]]
& [text-[#C17B2A]]
Static [text-[#1A1A1A]]
```
(stacked, one word per line on large screens)

**Subhead (motion, delay 0.25):**
```
Instrument Serif, text-xl md:text-2xl, text-[#6B6560], italic, max-w-lg, mt-6
"How technology rewired America in the 1950s — and why it still explains today."
```

**Thesis pill (motion, delay 0.4):**
Small capsule under subhead:
```
bg-[#2A2725] text-[#F5F1E8]/80 rounded-[4px] px-4 py-2 text-xs font-mono mt-8 inline-block
"Cold War anxiety → conformity → the same technology that enforced it escaped it"
```

**Search / Ask pill (motion, delay 0.5):**
Same capsule style as original prompt:
```tsx
<div className="bg-white rounded-[6px] border border-black/[0.05] p-1 pl-4 flex items-center shadow-sm mt-6 max-w-sm">
  <input
    placeholder="Ask about the 1950s..."
    className="flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#6B6560] outline-none"
  />
  <button className="bg-[#1A1A1A] text-white w-9 h-9 rounded-full flex items-center justify-center">
    {/* Arrow SVG */}
  </button>
</div>
```

**Edge anchors (absolute positioned):**
- Middle right: glassmorphic pill `"1950 · 1960"` — `absolute right-8 top-1/2 -translate-y-1/2 ... rotate-90`
- Bottom left: `"technology rewired america"` in IBM Plex Mono text-xs text-[#6B6560]
- Bottom right: `"apush period 8 · 1945–1980"` in IBM Plex Mono text-xs text-[#6B6560]

---

## 5. INTRO SECTION (`src/components/sections/IntroSection.tsx`)

Layout: `max-w-7xl mx-auto px-8 md:px-16 py-32 grid grid-cols-12 gap-8`

**Left (col-span-12 md:col-span-5):**
- Section label: "01 / OVERVIEW" in IBM Plex Mono amber
- H2: "The decade that built the cage and the key" — Bricolage Grotesque, large
- 2-paragraph body copy (Instrument Serif, comfortable reading size)

**Right (col-span-12 md:col-span-6 md:col-start-7):**
- Thesis block: dark card (`bg-[#2A2725]`), amber left border, Instrument Serif italic, large
- Three category chips: amber for Technology, muted for Film/TV and Music
- APUSH Period chip: `"APUSH Period 8 · 1945–1980"`

**Stat row (full width, mt-16):**
Three stat cards, animated count-up on scroll:
- `90%` / "of US homes had a TV by 1960"
- `60M` / "viewers watched Elvis on Ed Sullivan"
- `$200` / "average TV set price by 1953 (was $500 in 1949)"

---

## 6. TECHNOLOGY SECTION (`src/components/sections/TechnologySection.tsx`)

**ID:** `id="technology"`

**Header row:**
- Dark band across full width: `bg-[#2A2725] py-8 px-8 md:px-16`
- "02 / TECHNOLOGY & INNOVATION" amber mono label
- H2: "The revolution you could hold in your pocket" — Bricolage Grotesque, cream

**Sub-section 1: The TR-1**
Two-column layout:
- Left: Image (Smithsonian TR-1 photo or illustration) with caption block
- Right: Body copy + source citation card
- Pull quote: "Teenagers weren't buying sound quality. They were buying privacy."

**Sub-section 2: TV Price Collapse**
- Full-width Chart.js line chart showing TV ownership 1948–1960
- Dark background, amber line, labeled axes in IBM Plex Mono
- Annotation callout at 1957: "Leave It to Beaver premieres"
- Annotation callout at 1956: "Elvis on Ed Sullivan"

**Sub-section 3: Sputnik**
- Image: NASA Sputnik photo (public domain)
- Date stamp: "October 4, 1957" large amber mono
- Key consequence list: NDEA, NASA, space race
- Callout box: "If they could launch a satellite, they could launch a warhead."

**Sub-section 4: The Contradiction Diagram**
Visual diagram showing:
```
POSTWAR INDUSTRIAL BOOM
        ↓
[Television] ←→ [Transistor Radio]
        ↓                ↓
  Conformity         Rebellion
  (Leave It       (Rock and Roll,
   to Beaver)      Private Listening)
        ↓                ↓
      SAME TECHNOLOGY, OPPOSITE OUTCOMES
```
Animate this with motion, staggered reveals.

---

## 7. TELEVISION SECTION (`src/components/sections/TelevisionSection.tsx`)

**ID:** `id="television"`

- Leave It to Beaver analysis: premiere date, Cold War function, contrast with real America 1957
- Large callout: "Leave It to Beaver premiered the same day Faubus called the National Guard to Little Rock."
- YouTube embed: Leave It to Beaver clip (if available)
- Ed Sullivan preview card with link to Hall of Fame section

---

## 8. MUSIC SECTION (`src/components/sections/MusicSection.tsx`)

**ID:** `id="music"`

- Heartbreak Hotel story: recording date, label, chart performance
- Chart performance graphic (pop / country / R&B crossing simultaneously)
- TR-1 → rock and roll connection
- YouTube or Spotify embed
- Racial history acknowledgment: Chuck Berry, Little Richard context

---

## 9. SOURCE LOG (`src/components/sections/SourceLogSection.tsx`)

**ID:** `id="sources"`

Four `SourceCard` components, each displaying:
- Source number badge
- Type label (Primary / Secondary)
- Title + creator + date
- Cultural categories
- "What does it tell you?" paragraph
- "How does it connect?" paragraph
- Thin amber border on left

---

## 10. REFLECTION SECTION (`src/components/sections/ReflectionSection.tsx`)

Two sub-sections styled differently:
- Reflections A: editorial card layout, Q&A format
- Reflections B: centered thesis display, large Instrument Serif italic for the thesis statement

---

## 11. HALL OF FAME SECTION (`src/components/sections/HallOfFameSection.tsx`)

**ID:** `id="hall-of-fame"`

This is the premium section. Dark bg (`bg-[#2A2725]`).

- Header: "AMERICAN CULTURE HALL OF FAME" in IBM Plex Mono tracking-widest amber
- Nominee: "The Ed Sullivan Show" in massive Bricolage Grotesque, cream
- Date: "September 9, 1956" in amber
- TV set SVG illustration (component: `TVSet.tsx`)
- Four stat cards: 60M viewers, 82.6%, $50K, 3rd appearance
- Nomination letter (left column, Instrument Serif)
- Significance argument (right column)
- Artifact description (full-width, placard style)
- Induction plaque component at bottom (centered, bordered, slow fade-in)
- APUSH Period 8 connection box

---

## 12. ANIMATION GUIDE

```
Page load:
  - Navbar: fade in (0.4s)
  - Hero eyebrow: opacity 0→1 (0.6s, delay 0)
  - Hero h1: opacity 0→1, y 20→0 (0.9s, delay 0.1)
  - Hero subhead: opacity 0→1, y 15→0 (0.7s, delay 0.25)
  - Hero pill: opacity 0→1 (0.6s, delay 0.4)
  - Search bar: opacity 0→1, y 10→0 (0.5s, delay 0.5)

Scroll-triggered (IntersectionObserver, threshold 0.15):
  - Section headers: opacity 0→1, y 30→0 (0.6s)
  - Body paragraphs: opacity 0→1, y 15→0 (0.5s, staggered 0.1s)
  - Stat cards: opacity 0→1, scale 0.95→1 (0.4s, staggered 0.08s)
  - Chart: draw animation after entry
  - Hall of Fame plaque: opacity 0→1 (1.2s, delay 0.3)

Hover states:
  - Source cards: translateY(-4px), shadow-md (0.2s ease)
  - Nav links: color to amber (0.15s)
  - Stat cards: border-amber (0.2s)

Reduced motion:
  - All transitions disabled when prefers-reduced-motion: reduce
```

---

## 13. IMAGE SOURCES (PUBLIC DOMAIN / FREE USE)

| Element | Source | URL |
|---|---|---|
| TR-1 Radio | Smithsonian (public domain) | https://americanhistory.si.edu |
| Sputnik | NASA (public domain) | https://nasa.gov/history |
| 1950s suburb | Library of Congress | https://loc.gov |
| Elvis Ed Sullivan | Getty/CBS (check rights) | Use illustration instead if needed |
| Leave It to Beaver | CBS (check rights) | Use screenshot with fair use |
| 1950s TV set | Smithsonian public domain | https://americanhistory.si.edu |

**Safe fallback:** Create SVG illustrations for anything with unclear rights. The `TVSet.tsx` component should be a fully designed SVG, not a photo.

---

## 14. PACKAGE.JSON

```json
{
  "name": "signal-and-static",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "motion": "^11.11.0",
    "chart.js": "^4.4.4",
    "react-chartjs-2": "^5.2.0",
    "lucide-react": "^0.454.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.5.3",
    "vite": "^5.4.8"
  }
}
```

---

## 15. TAILWIND CONFIG

```js
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Bricolage Grotesque", "sans-serif"],
        body: ["Instrument Serif", "serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      colors: {
        bg: "#EDEEF5",
        surface: "#F5F1E8",
        ink: "#1A1A1A",
        muted: "#6B6560",
        amber: "#C17B2A",
        "amber-lt": "#F5DEB3",
        static: "#2A2725",
      },
    },
  },
  plugins: [],
}
```
