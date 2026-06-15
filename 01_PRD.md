# Product Requirements Document
## "Signal & Static" — How Technology Shaped the 1950s
### APUSH Decades Project | Jayden | Centennial High School

---

## 1. PROJECT OVERVIEW

**Project name:** Signal & Static  
**Subtitle:** How Technology Rewired America in the 1950s  
**Purpose:** APUSH EOY Decades Project deliverable — Hall of Fame induction for The Ed Sullivan Show broadcast of September 9, 1956, presented as a fully designed editorial website  
**Anchor category:** Technology & Innovation  
**Supporting categories:** Film & Television, Music & Dance  
**Thesis:** The popular culture of the 1950s reveals that Americans were fundamentally preoccupied with security and conformity in response to Cold War anxiety, and that the same technological forces the establishment used to broadcast conformity gave young people the tools to escape it — a tension that shows up today in how platforms algorithmically enforce cultural norms while teenagers find ways around them.

---

## 2. AUDIENCE

**Primary:** AP US History teacher grading the project  
**Secondary:** Classmates, school community  
**Tertiary:** Anyone curious about 1950s American cultural history

The teacher expects: historical accuracy, sourced evidence, a clear argument, and a reflective paragraph. The design should feel polished and intentional but not try-hard. It needs to look like a real editorial publication, not a school project.

---

## 3. SITE ARCHITECTURE

```
/ (Home / Hero)
├── /intro        → What this project is (thesis + overview)
├── /technology   → Anchor section: Technology & Innovation
├── /television   → Supporting: Film & Television
├── /music        → Supporting: Music & Dance
├── /sources      → Source Log (all 4 sources formally cited)
├── /reflection   → Reflection paragraphs (A + B)
└── /hall-of-fame → The nomination: Ed Sullivan Show induction
```

**Single-page scrolling app** — all sections on one page with smooth anchor scrolling. The nav links scroll to sections. No routing needed unless you want it.

---

## 4. PAGES / SECTIONS SPEC

### 4.1 HERO SECTION
- Full-viewport opening
- Background: keep the CloudFront video from the original prompt
- Headline: "Signal & Static" in large display type
- Subhead: "How technology rewired America — and why the 1950s still explain today"
- CTA: "Read the argument →" scrolls to intro
- Year marker: "1950–1960" bottom left
- Edge anchor: "Technology & Innovation" bottom right

### 4.2 INTRO / THESIS SECTION
- Brief 2-paragraph intro establishing the Cold War context
- Thesis statement displayed as a large pull quote
- Decade overview card: what APUSH says about this period (Period 8, 1945–1980)
- Three category chips: Technology & Innovation (primary), Film & Television, Music & Dance
- Animated stat row: 90% TV ownership by 1960, $35B consumer spending, 60M Ed Sullivan viewers

### 4.3 TECHNOLOGY SECTION (ANCHOR)
**Sub-sections:**
1. The Transistor Radio (TR-1, 1954)
   - Source: Smithsonian artifact nmah_713528
   - Key argument: portable privacy → generation gap
   - Embedded image: period photo of TR-1
2. Television's Price Collapse
   - $500 (1949) → $200 (1953)
   - Chart showing TV ownership growth 1950–1960
   - Source: historical pricing data
3. Sputnik (1957)
   - How it shattered American technological confidence
   - Led directly to NASA (1958) and NDEA
   - Connection to Cold War conformity pressure
4. The Contradiction
   - Technology was the tool of conformity AND rebellion
   - Diagram: same device → two outcomes

### 4.4 FILM & TELEVISION SECTION
- Leave It to Beaver analysis
  - Premier: October 4, 1957, CBS
  - Cold War conformity function
  - Quote from Imaginative Conservative article
- Ed Sullivan Show (preview — links to Hall of Fame section)
- Embedded YouTube: original Leave It to Beaver clip (if available)
- TV set illustration or period image

### 4.5 MUSIC & DANCE SECTION
- Rock and roll's emergence
- Elvis + TR-1 connection
- Heartbreak Hotel chart data (7 weeks #1, first million-seller)
- "Heartbreak Hotel" as primary source (RCA Victor 47-6420, Jan 27 1956)
- How technology (radio, TV) nationalized a regional sound
- Audio embed: Spotify or YouTube for Heartbreak Hotel

### 4.6 SOURCE LOG
All 4 sources displayed as formal cards:
1. Regency TR-1 Transistor Radio (1954) — Smithsonian artifact
2. Elvis Presley on The Ed Sullivan Show, CBS, Sept 9 1956 — primary broadcast
3. Leave It to Beaver S1E1 "Beaver Gets 'Spelled," CBS, Oct 4 1957 — primary TV broadcast
4. "Television and the Public Interest" speech, Newton Minow, May 9 1961 — government primary source

Each card includes: Title, Type, Origin/Creator, Cultural categories, What it tells you, How it connects

### 4.7 REFLECTION SECTION
**Reflections A (answered):**
- What surprised you most?
- Which category had richest material?
- What question do you most want to answer?
- What does APUSH know vs what popular culture adds?

**Reflections B (answered):**
- Most important thing learned
- Two-part thesis (displayed prominently)
- Most exciting piece of evidence
- What still needs figuring out

### 4.8 HALL OF FAME INDUCTION
The main deliverable page — designed like an actual Hall of Fame exhibit:
- Nomination letter (full text)
- Exhibit panel with TV set illustration
- Stat cards: 60M viewers, 82.6%, $50K fee, 3rd appearance censored
- Significance argument
- Artifact description (museum placard style)
- APUSH connection callout
- Induction plaque component

---

## 5. DESIGN SYSTEM

### 5.1 Color Palette
```
--color-bg:        #EDEEF5   (page base — carry from original prompt)
--color-surface:   #F5F1E8   (card/paper surfaces)
--color-ink:       #1A1A1A   (primary text)
--color-muted:     #6B6560   (secondary text, annotations)
--color-amber:     #C17B2A   (signal color — argument spine)
--color-amber-lt:  #F5DEB3   (amber tint backgrounds)
--color-static:    #3A3530   (dark surfaces, nav band)
```

### 5.2 Typography
```
Display:  "BigShoulders" or "Bricolage Grotesque" — headlines, pull quotes
Body:     "Instrument Serif" or "Crimson Pro" — long-form text, letter
Mono:     "IBM Plex Mono" — source citations, captions, labels, data
```

### 5.3 Layout
- Max content width: 1280px
- Grid: 12-column
- Section padding: 120px top/bottom desktop, 60px mobile
- Body text max-width: 680px (readability)

### 5.4 Motion
- Hero: fade + slight upward drift on load (0.8s)
- Section entries: IntersectionObserver scroll-triggered fade-up (0.5s, staggered)
- Stat counters: count-up animation on scroll entry
- Source cards: subtle lift on hover
- Hall of Fame plaque: slow fade-in with slight scale (1.0 → 1.0, opacity 0 → 1)
- Reduce motion: respect `prefers-reduced-motion`

---

## 6. EMBEDDED ELEMENTS

| Element | Type | Source |
|---|---|---|
| Background video | CloudFront MP4 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4 |
| TV ownership chart | Chart.js line chart | Data: 9% (1950) → 90% (1960) |
| TR-1 Radio image | Smithsonian public domain | americanhistory.si.edu |
| Ed Sullivan moment | YouTube embed | CBS clip or documentary |
| Heartbreak Hotel | YouTube or Spotify embed | RCA Victor 1956 |
| Leave It to Beaver clip | YouTube embed | CBS archive |
| Sputnik launch | NASA public domain photo | nasa.gov |

---

## 7. TECHNICAL STACK

```
Framework:     React + Vite
Styling:       Tailwind CSS (custom tokens above)
Animation:     motion/react (Framer Motion)
Charts:        Chart.js via react-chartjs-2
Icons:         Lucide React
Fonts:         Google Fonts (Instrument Serif, IBM Plex Mono) + local
```

---

## 8. PERFORMANCE REQUIREMENTS

- Lighthouse score target: 85+ performance, 95+ accessibility
- Video: lazy-load below fold, autoplay only hero
- Images: WebP with fallback, lazy loading
- Fonts: preload critical display font
- No layout shift on font load (font-display: swap)

---

## 9. CONTENT ACCURACY REQUIREMENTS

All historical claims must be fact-checked against verified sources:
- TV ownership stats: Smithsonian / Nielsen historical data
- TR-1 pricing: Smithsonian catalog nmah_713528
- Ed Sullivan ratings: History.com, EBSCO Research Starters
- Heartbreak Hotel chart position: Billboard historical records
- Leave It to Beaver premiere: CBS records
- Sputnik date: NASA historical archives

**No invented statistics. Every number must have a source.**

---

## 10. DELIVERABLES CHECKLIST

- [ ] `index.html` entry point
- [ ] `src/App.tsx` root component
- [ ] `src/components/Navbar.tsx`
- [ ] `src/components/Hero.tsx`
- [ ] `src/components/sections/IntroSection.tsx`
- [ ] `src/components/sections/TechnologySection.tsx`
- [ ] `src/components/sections/TelevisionSection.tsx`
- [ ] `src/components/sections/MusicSection.tsx`
- [ ] `src/components/sections/SourceLogSection.tsx`
- [ ] `src/components/sections/ReflectionSection.tsx`
- [ ] `src/components/sections/HallOfFameSection.tsx`
- [ ] `src/components/ui/StatCard.tsx`
- [ ] `src/components/ui/SourceCard.tsx`
- [ ] `src/components/ui/PullQuote.tsx`
- [ ] `src/components/ui/TVSet.tsx` (SVG illustration component)
- [ ] `src/index.css` (global styles + tokens)
- [ ] `tailwind.config.js`
- [ ] `vite.config.ts`
- [ ] `package.json`
