import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Award, ExternalLink, Music, Radio, Satellite, Tv } from 'lucide-react'

const videoUrl =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4'

const images = {
  tr1: 'https://ids.si.edu/ids/deliveryService?id=NMAH-ET2014-09027&max_w=800',
  sputnik: 'https://www.nasa.gov/wp-content/uploads/static/history/sputnik/sputnik1-mockup.jpg',
  tvFamily: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Family_watching_television_1958.jpg',
  levittown: 'https://tile.loc.gov/storage-services/service/pnp/cph/3c20000/3c21000/3c21000/3c21069v.jpg',
  heartbreak: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Heartbreak_Hotel_US_single_label.png',
}

const nav = [
  ['Intro', '#intro'],
  ['Technology', '#technology'],
  ['Television', '#television'],
  ['Music', '#music'],
  ['Artifacts', '#artifacts'],
  ['Sources', '#sources'],
  ['Reflection', '#reflection'],
  ['Hall of Fame', '#hall'],
]

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible')
          observer.unobserve(node)
        }
      },
      { threshold: 0.16 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return ref
}

function useCount(target: number, suffix = '') {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = useState(0)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1100, 1)
        setValue(Math.round(target * progress))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      observer.disconnect()
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [target])
  return { ref, text: `${value}${suffix}` }
}

function Navbar() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`nav ${solid ? 'nav-solid' : ''}`}>
      <a className="brand" href="#top">1950s Technology</a>
      <div className="nav-links">
        {nav.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </div>
    </nav>
  )
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    const onScroll = () => {
      const y = Math.min(window.scrollY / 900, 1)
      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${1 + y * 0.09}) translateY(${y * 28}px)`
        videoRef.current.style.filter = `sepia(${0.25 + y * 0.45}) contrast(${1.05 + y * 0.15})`
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="hero" id="top">
      <video ref={videoRef} className="hero-video" src={videoUrl} autoPlay muted loop playsInline />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="kicker">1950-1960 / Technology & Innovation</p>
        <h1>Technology in the 1950's</h1>
        <p className="hero-subhead">How technology rewired America, turned living rooms into broadcast stations, and made rock and roll impossible to contain.</p>
        <a className="button primary" href="#intro">Read the argument <ArrowRight size={18} /></a>
      </div>
      <div className="hero-footer">
        <span>Cold War confidence</span>
        <span>Teenage escape</span>
      </div>
    </header>
  )
}

function Stat({ value, suffix, label, detail }: { value: number; suffix?: string; label: string; detail: string }) {
  const counter = useCount(value, suffix)
  return (
    <div className="stat">
      <strong><span ref={counter.ref}>{counter.text}</span></strong>
      <span>{label}</span>
      <small>{detail}</small>
    </div>
  )
}

function SectionLabel({ n, children }: { n: string; children: string }) {
  return <p className="section-label">{n} / {children}</p>
}

function PullQuote({ children }: { children: string }) {
  return <blockquote className="pullquote">{children}</blockquote>
}

function Intro() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="intro" className="section intro reveal" ref={ref}>
      <div className="grid two">
        <div>
          <SectionLabel n="01">Argument</SectionLabel>
          <h2>The Big Idea</h2>
          <p>After the Great Depression and World War II, many Americans wanted safety, routine, and proof that capitalism worked. The Cold War made that desire political. A television, a refrigerator, a suburb, and a family sitcom all became evidence that the United States had built a better life than the Soviet Union.</p>
          <p>But the same postwar technology that broadcast respectability also gave young people private access to rock and roll. That contradiction is the heart of this project.</p>
        </div>
        <div className="paper">
          <PullQuote>The establishment used technology to broadcast conformity, but young people used technology to escape it.</PullQuote>
          <div className="chips">
            <span>Technology & Innovation</span>
            <span>Film & Television</span>
            <span>Music & Dance</span>
          </div>
        </div>
      </div>
      <div className="stats-row">
        <Stat value={90} suffix="%" label="TV ownership" detail="of U.S. homes by 1960" />
        <Stat value={60} suffix="M" label="Elvis viewers" detail="on Ed Sullivan, Sept. 9, 1956" />
        <Stat value={50} suffix="K" label="Sullivan fee" detail="for Elvis's three appearances" />
      </div>
    </section>
  )
}

function Technology() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="technology" className="section dark reveal" ref={ref}>
      <SectionLabel n="02">Technology & Innovation</SectionLabel>
      <div className="grid two">
        <div>
          <h2>Technology Changed Daily Life</h2>
          <p>Television turned culture into a national broadcast. The transistor radio turned listening into a private act. Sputnik then exposed the fear underneath the decade's confidence: maybe American technology was not automatically ahead.</p>
          <div className="timeline">
            <article><Radio /><b>1954</b><span>Regency TR-1 puts a radio in a teenager's hand.</span></article>
            <article><Tv /><b>1950-1960</b><span>TV ownership rises from about 9% to 90% of homes.</span></article>
            <article><Satellite /><b>1957</b><span>Sputnik shocks Americans and launches the space race.</span></article>
          </div>
        </div>
        <figure className="image-card tall">
          <img src={images.tr1} alt="Red Regency TR-1 transistor radio from the Smithsonian collection" />
          <figcaption>Regency TR-1 transistor radio, Smithsonian National Museum of American History, CC0.</figcaption>
        </figure>
      </div>
      <div className="grid three image-strip">
        <figure className="image-card"><img src={images.sputnik} alt="Sputnik 1 satellite mockup from NASA" /><figcaption>Sputnik 1, NASA history archive.</figcaption></figure>
        <div className="chart-card">
          <h3>TV Ownership Growth</h3>
          <div className="bars">
            {[
              ['1950', 9],
              ['1953', 45],
              ['1955', 65],
              ['1957', 79],
              ['1960', 90],
            ].map(([year, value]) => (
              <div className="bar-row" key={year}>
                <span>{year}</span>
                <div><i style={{ width: `${value}%` }} /></div>
                <b>{value}%</b>
              </div>
            ))}
          </div>
        </div>
        <div className="contradiction">
          <h3>One media system. Two outcomes.</h3>
          <p><b>Adults saw:</b> a shared national living room.</p>
          <p><b>Teenagers heard:</b> a private signal their parents could not control.</p>
        </div>
      </div>
    </section>
  )
}

function Television() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="television" className="section reveal" ref={ref}>
      <SectionLabel n="03">Film & Television</SectionLabel>
      <div className="grid two">
        <figure className="image-card wide">
          <img src={images.tvFamily} alt="A family watching television in 1958" />
          <figcaption>Family watching television, 1958. National Archives image via Wikimedia Commons, public domain.</figcaption>
        </figure>
        <div>
          <h2>Television Showed the Perfect Family</h2>
          <p>Shows such as <i>Leave It to Beaver</i> turned the white middle-class suburban family into a weekly model of normal American life. That mattered because the real 1950s also included McCarthyism, Cold War fear, school desegregation, and youth rebellion.</p>
          <p>The point is not that every family lived like the Cleavers. The point is that television taught millions of viewers what the decade wanted an "ordinary" American family to look like.</p>
          <a className="button secondary exhibit-jump" href="#hall" aria-label="Jump to the Hall of Fame exhibit">
            <span>Hall of Fame exhibit</span>
            <Award size={24} />
          </a>
        </div>
      </div>
      <div className="video-panel">
        <iframe src="https://www.youtube.com/embed/aNYWl13IWhY" title="Elvis Presley on The Ed Sullivan Show" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        <div>
          <h3>Why Ed Sullivan belongs here</h3>
          <p>Network television profited from Elvis's rebellion, then tried to contain it. That is exactly the 1950s technology contradiction: the same screen that sold family order delivered rock and roll into the home.</p>
        </div>
      </div>
    </section>
  )
}

function MusicSection() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="music" className="section amber reveal" ref={ref}>
      <SectionLabel n="04">Music & Dance</SectionLabel>
      <div className="grid two">
        <div>
          <h2>Radio Helped Rock and Roll Spread</h2>
          <p>Rock and roll grew from Black American blues, gospel, and rhythm and blues, but national media often filtered that sound through white performers and mainstream gatekeepers. Portable radios made that control weaker, because teenagers could listen privately.</p>
          <p>Elvis's <i>Heartbreak Hotel</i> crossed pop, country, and R&B audiences in 1956. Television gave rock and roll a body; radio gave it a private audience.</p>
          <div className="music-stack">
            <iframe className="spotify" src="https://open.spotify.com/embed/track/1iUgrte2PxLxQ6Te95RnAV" title="Spotify embed: Heartbreak Hotel" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
            <div className="music-artifact">
              <Music size={22} />
              <div>
                <b>Chuck Berry, "Maybellene" (1955)</b>
                <span>Use this as the Black rock-and-roll counterpoint: radio helped white teenagers hear sounds mainstream culture often tried to filter.</span>
              </div>
            </div>
          </div>
        </div>
        <figure className="image-card wide">
          <img src={images.levittown} alt="Levittown Center shopping center in 1957" />
          <figcaption>Levittown Center shopping center, 1957. Library of Congress, no known restrictions.</figcaption>
        </figure>
      </div>
      <div className="video-panel music-video-panel">
        <div>
          <h3>More music on the screen</h3>
          <p>This second Ed Sullivan clip shows the faster side of Elvis's 1956 breakthrough. It helps the music section feel less like background information and more like a live cultural event.</p>
        </div>
        <iframe src="https://www.youtube.com/embed/7tiBYUzRLmI" title="Elvis Presley Ready Teddy on The Ed Sullivan Show" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
    </section>
  )
}

function Artifacts() {
  const ref = useReveal<HTMLElement>()
  const artifacts = [
    {
      title: 'TR-1 transistor radio',
      label: 'Portable privacy',
      image: images.tr1,
      caption: 'The object that turned radio from family furniture into a pocket signal.',
      source: 'Smithsonian',
      link: 'https://www.si.edu/object/regency-model-tr-1-transistor-radio%3Anmah_713528',
    },
    {
      title: 'Heartbreak Hotel label',
      label: 'RCA Victor 47-6420',
      image: images.heartbreak,
      caption: 'The 1956 single makes the music argument tangible as a physical record.',
      source: 'Wikimedia Commons',
      link: 'https://commons.wikimedia.org/wiki/File:Heartbreak_Hotel_US_single_label.png',
    },
    {
      title: 'Sputnik 1',
      label: 'Cold War shock',
      image: images.sputnik,
      caption: 'The space race artifact that punctured American technological confidence.',
      source: 'NASA',
      link: 'https://www.nasa.gov/history/sputnik/gallerysput.html',
    },
    {
      title: 'Family TV room',
      label: 'Shared living room',
      image: images.tvFamily,
      caption: 'A real 1958 family viewing scene, showing television as a household ritual.',
      source: 'National Archives / Wikimedia',
      link: 'https://commons.wikimedia.org/wiki/File:Family_watching_television_1958.jpg',
    },
  ]

  return (
    <section id="artifacts" className="section artifacts reveal" ref={ref}>
      <SectionLabel n="05">Artifact Wall</SectionLabel>
      <div className="grid two artifact-intro">
        <div>
          <h2>Real Artifacts</h2>
          <p>The project works better when the argument is attached to things people could actually hold, buy, watch, or hear. These artifacts show the chain from technology to television to music.</p>
        </div>
        <div className="archive-video">
          <iframe src="https://archive.org/embed/DateWith1950" title="A Date With Your Family, 1950, Internet Archive" allowFullScreen />
          <p><b>Bonus video:</b> <i>A Date With Your Family</i> is a 1950 public-domain social guidance film. It shows the kind of controlled family behavior television later normalized.</p>
        </div>
      </div>
      <div className="artifact-grid">
        {artifacts.map((artifact) => (
          <article className="artifact-card" key={artifact.title}>
            <img src={artifact.image} alt={artifact.title} />
            <div>
              <p className="kicker">{artifact.label}</p>
              <h3>{artifact.title}</h3>
              <p>{artifact.caption}</p>
              <a href={artifact.link} target="_blank" rel="noreferrer">{artifact.source} <ExternalLink size={14} /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const sources = [
  {
    title: 'Regency Model TR-1 Transistor Radio',
    type: 'Primary artifact',
    link: 'https://www.si.edu/object/regency-model-tr-1-transistor-radio%3Anmah_713528',
    text: 'The Smithsonian identifies the TR-1 as a 1954 portable radio made by Idea Incorporated. Its $50 price and portable design make it the clearest object for showing how technology created teenage privacy.',
  },
  {
    title: 'Elvis Presley on The Ed Sullivan Show',
    type: 'Primary broadcast',
    link: 'https://www.edsullivan.com/artists/elvis-presley/',
    text: 'The September 9, 1956 broadcast reached about 60 million viewers. It shows network television turning rock and roll into a national event while trying to keep it acceptable for family audiences.',
  },
  {
    title: 'Leave It to Beaver, "Beaver Gets \'Spelled"',
    type: 'Primary TV episode',
    link: 'https://www.imdb.com/title/tt0630176/',
    text: 'Premiering in 1957, the show presented suburbia, gender roles, and family order as ordinary life, even as the real United States was dealing with Cold War pressure and civil rights conflict.',
  },
  {
    title: 'Newton Minow, "Television and the Public Interest"',
    type: 'Government speech',
    link: 'https://www.americanrhetoric.com/speeches/newtonminow.htm',
    text: 'Minow called much of television a "vast wasteland" in 1961, which helps close the argument: the medium Americans trusted to prove modern progress was already being publicly criticized.',
  },
]

function Sources() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="sources" className="section reveal" ref={ref}>
      <SectionLabel n="05">Source Log</SectionLabel>
      <h2>Sources I Used</h2>
      <div className="source-grid">
        {sources.map((source, index) => (
          <article className="source-card" key={source.title}>
            <span className="source-number">{String(index + 1).padStart(2, '0')}</span>
            <p className="kicker">{source.type}</p>
            <h3>{source.title}</h3>
            <p>{source.text}</p>
            <a href={source.link} target="_blank" rel="noreferrer">Open source <ExternalLink size={15} /></a>
          </article>
        ))}
      </div>
    </section>
  )
}

function Reflection() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="reflection" className="section dark reveal" ref={ref}>
      <SectionLabel n="06">Reflection</SectionLabel>
      <div className="grid two">
        <div>
          <h2>Reflection</h2>
          <p>What surprised me most was how much power came from small devices. Before researching, I expected television to be the whole story, but the transistor radio showed me that a pocket-sized technology could change who controlled culture inside a family.</p>
          <p>APUSH explains the Cold War, the GI Bill, McCarthyism, and suburban growth, but popular culture shows what those pressures felt like in ordinary life. A sitcom family, a teenage radio, and a censored Elvis performance make the decade's values and fears visible.</p>
        </div>
        <div className="paper dark-paper">
          <h3>Today connection</h3>
          <p>The 1950s tension shows up today in algorithmic platforms. Large companies shape what millions of people watch and hear, but teenagers still create private spaces through group chats, niche apps, and subcultures. The tools change, but the fight over who controls culture stays familiar.</p>
        </div>
      </div>
    </section>
  )
}

function HallOfFame() {
  const ref = useReveal<HTMLElement>()
  const facts = useMemo(
    () => [
      ['60M', 'viewers'],
      ['82.6%', 'of TV audience'],
      ['$50K', 'for three appearances'],
      ['1957', 'waist-up censorship'],
    ],
    [],
  )
  return (
    <section id="hall" className="section hall reveal" ref={ref}>
      <SectionLabel n="07">Hall of Fame Induction</SectionLabel>
      <div className="hall-layout">
        <div className="plaque">
          <Award size={42} />
          <p>Inducted Artifact</p>
          <h2>Elvis on <i>The Ed Sullivan Show</i></h2>
          <span>September 9, 1956 / CBS Television</span>
        </div>
        <div className="nomination">
          <h3>Nomination Letter</h3>
          <p>I nominate Elvis Presley's first appearance on <i>The Ed Sullivan Show</i> for the 1950s Popular Culture Hall of Fame because it captures the decade's central contradiction in one broadcast. Ed Sullivan represented respectable family television, while Elvis represented the rebellious energy of rock and roll. CBS wanted the ratings Elvis could bring, but the network also wanted to control what families saw.</p>
          <p>The broadcast matters because technology made the contradiction unavoidable. Television gave Elvis a national audience of about 60 million people, and radio helped teenagers keep listening afterward. The establishment could profit from youth rebellion, but it could not fully contain it.</p>
          <div className="fact-grid">
            {facts.map(([big, small]) => (
              <div key={big}><b>{big}</b><span>{small}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>APUSH Decades Project / 1950s Technology, Television, and Rock and Roll</p>
      <a href="#top">Back to top</a>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <main>
        <Intro />
        <Technology />
        <Television />
        <MusicSection />
        <Artifacts />
        <Sources />
        <Reflection />
        <HallOfFame />
      </main>
      <Footer />
    </>
  )
}
