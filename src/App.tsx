import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Award, CassetteTape, ExternalLink, Music, Radio, Satellite, Tv } from 'lucide-react'

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
  ['Videos', '#videos'],
  ['Timeline', '#timeline'],
  ['Sources', '#sources'],
  ['Reflection', '#reflection'],
  ['Hall of Fame', '#hall'],
]

const techCases = [
  {
    title: 'Transistor radio',
    year: '1954',
    icon: Radio,
    result: 'Private listening',
    text: 'The TR-1 made radio portable. That mattered because music could move out of the living room and into bedrooms, cars, sidewalks, and teen hangouts.',
    source: 'Smithsonian artifact',
  },
  {
    title: 'Television set',
    year: '1950s',
    icon: Tv,
    result: 'Shared national culture',
    text: 'TV ownership jumped from about 9% of U.S. households in 1950 to the high 80s by 1960, turning entertainment into a national ritual.',
    source: 'Census / Nielsen trend data',
  },
  {
    title: 'Sputnik',
    year: '1957',
    icon: Satellite,
    result: 'Cold War urgency',
    text: 'Sputnik made technology feel like national survival. NASA says the launch directly led to the creation of NASA in 1958.',
    source: 'NASA history',
  },
  {
    title: 'Magnetic tape',
    year: 'Postwar',
    icon: CassetteTape,
    result: 'Cheaper recording',
    text: 'Tape recording helped independent studios capture local sounds cheaply, which made regional rhythm and blues easier to record and distribute.',
    source: 'Recording history',
  },
]

const mediaCases = [
  {
    title: 'Family sitcoms',
    result: 'The ideal home',
    text: 'Sitcoms made the suburban nuclear family look ordinary, calm, and respectable, even though the real decade was full of Cold War and civil rights conflict.',
  },
  {
    title: 'Variety shows',
    result: 'Controlled rebellion',
    text: 'Shows like Ed Sullivan could turn a performer into a national star, but networks still controlled camera angles, tone, and respectability.',
  },
  {
    title: 'TV commercials',
    result: 'Consumer citizenship',
    text: 'Advertisements linked modern appliances to comfort, gender roles, and proof that American capitalism could deliver a better life.',
  },
]

const songs = [
  {
    title: 'Heartbreak Hotel',
    artist: 'Elvis Presley',
    year: '1956',
    track: '1iUgrte2PxLxQ6Te95RnAV',
    impact: 'Elvis became the bridge between radio popularity and national television spectacle. The song shows how rock and roll crossed pop, country, and R&B audiences.',
  },
  {
    title: 'Maybellene',
    artist: 'Chuck Berry',
    year: '1955',
    track: '22MbC8gTKpaqNTrmgXQfbJ',
    impact: 'Berry put cars, speed, and teenage desire into a sharp guitar-driven sound. It shows Black innovation at the center of rock and roll.',
  },
  {
    title: 'Tutti Frutti',
    artist: 'Little Richard',
    year: '1955',
    track: '2iXcvnD3d1gfLBum0cE5Eg',
    impact: 'Little Richard made rock and roll sound explosive. His performance style challenged the calm, controlled image adults wanted from popular culture.',
  },
  {
    title: "Ain't That A Shame",
    artist: 'Fats Domino',
    year: '1955',
    track: '4ZfQwNx3FlCN07cnUvekh3',
    impact: 'Domino helped rhythm and blues cross into mainstream pop. His success shows that rock and roll was not just Elvis; it was deeply rooted in Black music.',
  },
  {
    title: 'Rock Around the Clock',
    artist: 'Bill Haley & His Comets',
    year: '1954/1955',
    track: '7hLOIb9E7VKmsVelNq6YZK',
    impact: 'Its connection to Blackboard Jungle tied rock and roll to teenage rebellion in film, making music part of a wider youth-culture panic.',
  },
]

const videos = [
  {
    title: 'Elvis on Ed Sullivan',
    source: 'CBS / Ed Sullivan clip',
    embed: 'https://www.youtube.com/embed/aNYWl13IWhY',
    mp4: '',
    impact: 'Television made Elvis national. The performance shows how the same family medium used for respectability also delivered teenage rebellion.',
  },
  {
    title: 'A Date With Your Family',
    source: 'Internet Archive, 1950',
    embed: '',
    mp4: 'https://archive.org/download/DateWith1950/DateWith1950_512kb.mp4',
    impact: 'This guidance film shows the controlled family behavior the decade praised: politeness, gender roles, and domestic order.',
  },
  {
    title: 'Sputnik Newsreel',
    source: 'Universal newsreel, 1957',
    embed: '',
    mp4: 'https://archive.org/download/1957-10-07_New_Moon/1957-10-07_New_Moon_512kb.mp4',
    impact: 'Sputnik turned technology into Cold War fear. It made science education, rockets, and federal research feel urgent.',
  },
]

const timelineEvents = [
  ['1947', 'Bell Labs invents the transistor, making smaller electronics possible.'],
  ['1950', 'About 9% of U.S. households have television.'],
  ['1954', 'The Regency TR-1 transistor radio goes on sale.'],
  ['1955', 'Rock and roll breaks wider through records like Maybellene and Rock Around the Clock.'],
  ['1956', 'Elvis appears on The Ed Sullivan Show and reaches about 60 million viewers.'],
  ['1957', 'Sputnik launches and Leave It to Beaver premieres.'],
  ['1958', 'NASA is created after the Sputnik shock.'],
  ['1960', 'Television reaches the high 80s percent range of U.S. households.'],
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
        <a className="button primary" href="#intro">Start exploring <ArrowRight size={18} /></a>
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
        <Stat value={89} suffix="%" label="TV ownership" detail="Census estimate, May 1960" />
        <Stat value={60} suffix="M" label="Elvis viewers" detail="on Ed Sullivan, Sept. 9, 1956" />
        <Stat value={50} suffix="K" label="Sullivan fee" detail="for Elvis's three appearances" />
      </div>
    </section>
  )
}

function TechLab() {
  const [active, setActive] = useState(0)
  const current = techCases[active]
  const Icon = current.icon

  return (
    <div className="tech-lab">
      <div className="lab-tabs" role="tablist" aria-label="Technology examples">
        {techCases.map((item, index) => {
          const ItemIcon = item.icon
          return (
            <button
              key={item.title}
              className={active === index ? 'active' : ''}
              onClick={() => setActive(index)}
              type="button"
              role="tab"
              aria-selected={active === index}
            >
              <ItemIcon size={18} />
              <span>{item.title}</span>
            </button>
          )
        })}
      </div>
      <article className="lab-panel">
        <div className="lab-icon"><Icon size={42} /></div>
        <p className="kicker">{current.year} / {current.source}</p>
        <h3>{current.result}</h3>
        <p>{current.text}</p>
      </article>
    </div>
  )
}

function MediaLab() {
  const [active, setActive] = useState(0)
  const current = mediaCases[active]
  return (
    <div className="media-lab">
      <div className="media-buttons">
        {mediaCases.map((item, index) => (
          <button key={item.title} className={active === index ? 'active' : ''} onClick={() => setActive(index)} type="button">
            {item.title}
          </button>
        ))}
      </div>
      <div className="media-result">
        <p className="kicker">What it did</p>
        <h3>{current.result}</h3>
        <p>{current.text}</p>
      </div>
    </div>
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
            <article><Tv /><b>1950-1960</b><span>TV ownership rises from about 9% to the high 80s percent range.</span></article>
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
              ['1960', 87],
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
          <h3>The two outcomes of media.</h3>
          <p><b>Adults saw:</b> a shared national living room.</p>
          <p><b>Teenagers heard:</b> a private signal their parents could not control.</p>
        </div>
      </div>
      <TechLab />
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
      <MediaLab />
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
          <p>These songs are not random background music. Each one shows how records, radio, television, race, and teenage culture overlapped.</p>
        </div>
        <figure className="image-card wide">
          <img src={images.levittown} alt="Levittown Center shopping center in 1957" />
          <figcaption>Levittown Center shopping center, 1957. Library of Congress, no known restrictions.</figcaption>
        </figure>
      </div>
      <div className="soundtrack-grid">
        {songs.map((song) => (
          <article className="song-card" key={song.track}>
            <iframe
              src={`https://open.spotify.com/embed/track/${song.track}?utm_source=generator&theme=0`}
              title={`Spotify embed: ${song.title} by ${song.artist}`}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
            <div>
              <p className="kicker">{song.year} / {song.artist}</p>
              <h3>{song.title}</h3>
              <p>{song.impact}</p>
            </div>
          </article>
        ))}
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

function VideosSection() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="videos" className="section dark reveal" ref={ref}>
      <SectionLabel n="06">Video Evidence</SectionLabel>
      <div className="section-intro">
        <h2>Watch the Decade Change</h2>
        <p>These videos show the decade in motion: technology selling order, spreading rebellion, and turning Cold War science into public anxiety.</p>
      </div>
      <div className="video-grid">
        {videos.map((video) => (
          <article className="video-card" key={video.title}>
            {video.mp4 ? (
              <video src={video.mp4} controls preload="metadata" />
            ) : (
              <iframe src={video.embed} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            )}
            <div>
              <p className="kicker">{video.source}</p>
              <h3>{video.title}</h3>
              <p>{video.impact}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function TimelineSection() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="timeline" className="section timeline-section reveal" ref={ref}>
      <SectionLabel n="07">Timeline</SectionLabel>
      <div className="grid two">
        <div>
          <h2>How the Pieces Connect</h2>
          <p>The timeline shows cause and effect: new technology changed what Americans watched, what teenagers heard, and what the government feared.</p>
        </div>
        <div className="mini-timeline">
          {timelineEvents.map(([year, text]) => (
            <article key={year}>
              <b>{year}</b>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Conclusion() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="section conclusion reveal" ref={ref}>
      <SectionLabel n="08">Final Takeaway</SectionLabel>
      <h2>The 1950s Were More Than Just New Technology</h2>
      <p>Technology changed who controlled American culture. Television helped adults broadcast conformity, while radios helped teenagers create a culture of their own. Sputnik added the Cold War pressure underneath it all, proving that technology was also about national power.</p>
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
      caption: 'The 1956 single shows how rock and roll became a physical product teenagers could buy, collect, and replay.',
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
          <p>These are real artifacts from the 1950s. Each one shows how new technology became part of everyday American culture, from private music listening to family television nights and Cold War science fears.</p>
        </div>
        <div className="archive-video">
          <video src="https://archive.org/download/DateWith1950/DateWith1950_512kb.mp4" controls preload="metadata" />
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
    text: 'Minow called much of television a "vast wasteland" in 1961. His speech shows that the medium Americans trusted to prove modern progress was already being publicly criticized.',
  },
  {
    title: 'NASA, "Dawn of the Space Age"',
    type: 'Government history',
    link: 'https://www.nasa.gov/history/dawn-of-the-space-age/',
    text: 'NASA explains that Sputnik launched on October 4, 1957, startled Americans, intensified missile fears, and led directly to the creation of NASA in 1958.',
  },
  {
    title: 'TV Household Penetration Trends',
    type: 'Data source',
    link: 'https://www.tvb.org/wp-content/uploads/2022/10/National-TV-Household-Penetration-Trends.pdf',
    text: 'Nielsen trend data lists TV penetration at 9.0% in 1950, 64.5% in 1955, and 87.1% in 1960. A Census housing report also places TV ownership near 89% in May 1960.',
  },
  {
    title: 'Carnegie Hall, African American Music Timeline',
    type: 'Secondary reference',
    link: 'https://timeline.carnegiehall.org/genres/rock-n-roll',
    text: 'Carnegie Hall connects rock and roll to Black musical traditions and specifically highlights Little Richard and Fats Domino as major 1950s figures in the sound.',
  },
]

function Sources() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="sources" className="section reveal" ref={ref}>
      <SectionLabel n="09">Source Log</SectionLabel>
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
      <SectionLabel n="10">Reflection</SectionLabel>
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
      <SectionLabel n="11">Hall of Fame Induction</SectionLabel>
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
        <VideosSection />
        <TimelineSection />
        <Conclusion />
        <Sources />
        <Reflection />
        <HallOfFame />
      </main>
      <Footer />
    </>
  )
}
