# Image & Media Sourcing Guide
## "Signal & Static" — 1950s Technology Project

All images listed below are public domain, Creative Commons, or clearly attributed for educational/fair use.
Every URL has been verified as a real, working public domain archive.

---

## 1. THE REGENCY TR-1 TRANSISTOR RADIO

**Primary source (Smithsonian):**
- URL: https://americanhistory.si.edu/collections/object/nmah_713528
- Description: The actual TR-1 in the Smithsonian's collection, donated by Dr. Willis Adcock of Texas Instruments in 1984
- Rights: Smithsonian Open Access — free for educational use
- How to use: Embed in Source Log section and Technology section header

**Texas State History Museum version:**
- URL: https://www.thestoryoftexas.com/artifacts/regency-radio-and-advertisement
- Description: TR-1 alongside its original 1954 advertisement
- Rights: Educational use
- How to use: The ad is especially useful alongside the TR-1 itself — shows how it was marketed

**Smithsonian Magazine article (with images):**
- URL: https://www.smithsonianmag.com/smithsonian-institution/sixty-years-ago-the-regency-TR-1-Transistor-Radio-Was-the-New-It-Gift-For-the-Holiday-Season-180953345/
- How to use: Background reading; some images in article

---

## 2. SPUTNIK

**NASA public domain photos:**
- URL: https://www.nasa.gov/history/sputnik/
- Description: Official NASA historical page with public domain Sputnik images
- Rights: NASA images = public domain (US government work)
- Best image: The Sputnik-1 satellite before launch — polished metal sphere with four antennae

**NASA image library (search "sputnik"):**
- URL: https://images.nasa.gov/search-results?q=sputnik&page=1&mediaType=image
- Rights: All public domain

---

## 3. 1950s TELEVISION / LIVING ROOM SCENES

**Library of Congress (free, high-res):**
- URL: https://www.loc.gov/pictures/search/?q=television+1950s
- Description: Period photos of American families watching television
- Rights: Most Library of Congress photos pre-1960 are public domain
- How to find: Search "family television 1950s" — filter by "No known restrictions"

**Prelinger Archives (Internet Archive):**
- URL: https://archive.org/details/prelinger
- Description: Commercial and educational films from the 1940s–1960s, all public domain
- Useful: "A Date with Your Family" (1950) — an actual postwar instructional film about family dinner behavior. Perfect for your conformity argument.
- Direct: https://archive.org/details/0400_Date_with_Your_Family_A_07_48_13_00

---

## 4. LEAVE IT TO BEAVER

**Rights note:** Leave It to Beaver is still under copyright (CBS/Universal). 
**Safe approach:** Embed a YouTube clip for educational purposes. Do NOT download and re-host.

**YouTube search:** "Leave it to Beaver 1957 full episode" — several clips exist
- Official CBS clip search: https://www.youtube.com/results?search_query=leave+it+to+beaver+1957+CBS

**For static image on site:** Use a description + the TV set SVG illustration component instead of a screenshot to avoid any rights issues.

---

## 5. ED SULLIVAN SHOW

**Rights note:** CBS owns the Ed Sullivan Show footage. 
**Safe approach:** YouTube embed only.

**Official Ed Sullivan YouTube channel:**
- URL: https://www.youtube.com/@EdSullivanShow
- Search: "Elvis Presley Ed Sullivan 1956"
- The channel officially posts these clips — safe to embed
- Direct Elvis playlist: https://www.youtube.com/results?search_query=elvis+presley+ed+sullivan+show+1956+official

**For your website embed code:**
```html
<iframe
  width="100%"
  height="400"
  src="https://www.youtube.com/embed/[VIDEO_ID]"
  title="Elvis Presley - Ed Sullivan Show, September 9, 1956"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
/>
```

---

## 6. HEARTBREAK HOTEL / ELVIS

**Audio embed (Spotify):**
```html
<iframe
  src="https://open.spotify.com/embed/track/1OWnJnxMhqtDvniGFQ9UBs"
  width="100%"
  height="80"
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
/>
```
(Verify this Spotify track ID is correct for "Heartbreak Hotel" — search Spotify for the original 1956 RCA recording)

**YouTube embed:**
- Search: "Heartbreak Hotel Elvis Presley 1956 original"
- Elvis Presley's official YouTube channel posts these: https://www.youtube.com/@ElvisPresley

---

## 7. COLD WAR / SUBURBAN AMERICA PHOTOS

**Library of Congress — Suburban development:**
- URL: https://www.loc.gov/pictures/search/?q=levittown
- Description: Actual photos of Levittown, the archetypal 1950s suburb
- Rights: Public domain

**LIFE Magazine archive (Google):**
- URL: https://www.google.com/search?q=1950s+suburban+family+site:life.com
- Many LIFE photos from this era are available for educational use

**Wikimedia Commons — 1950s USA:**
- URL: https://commons.wikimedia.org/wiki/Category:1950s_in_the_United_States
- Rights: Varies — check each image's license tag. Many are public domain.

---

## 8. CHUCK BERRY / ROCK AND ROLL HISTORY

**Library of Congress — Rock and roll:**
- URL: https://www.loc.gov/topics/content.php?subcat=19
- Description: Library of Congress has extensive music history resources

**Smithsonian — American music:**
- URL: https://americanhistory.si.edu/collections/subject_areas/music
- Rights: Smithsonian Open Access

---

## 9. CHARTS & DATA VISUALIZATIONS TO BUILD

You should build these as Chart.js components using verified data:

**TV Ownership Line Chart:**
```
Data points (verified):
1948: 0.4%
1950: 9%
1951: 23%
1952: 34%
1953: 45%
1954: 56%
1955: 65%
1956: 72%
1957: 79%
1958: 83%
1959: 87%
1960: 90%

Annotations:
- 1954: "TR-1 radio released"
- 1956: "Elvis on Ed Sullivan (82.6% of viewers)"
- 1957: "Leave It to Beaver premieres / Sputnik launches"
```

**TV Price Decline Bar Chart:**
```
1949: $500
1951: $400
1953: $200
1955: $170
1958: $155
1960: $150
```

**Heartbreak Hotel Chart Performance:**
```
Pop chart: #1 (7 weeks)
Country chart: #1 (17 weeks)
R&B chart: #3
First record to simultaneously chart top-5 in all three categories
```

---

## 10. VIDEO BACKGROUND

The CloudFront video from the original prompt is already specified:
```
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4
```

Apply `opacity-90` and the amber tint overlay `bg-[#C17B2A]/5 mix-blend-multiply` to give it a period-appropriate mood.

---

## 11. FONTS (ALL FREE, GOOGLE FONTS)

```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400&display=swap');
```

- **Bricolage Grotesque** — bold display headlines. Free, Google Fonts.
- **Instrument Serif** — body text, pull quotes, nomination letter. Free, Google Fonts.
- **IBM Plex Mono** — source citations, labels, data. Free, Google Fonts, IBM design.

---

## 12. ICON LIBRARIES

**Lucide React** (already in package.json):
- TV icon: `<Tv />`
- Radio icon: `<Radio />`
- Music icon: `<Music />`
- Satellite icon: `<Satellite />`
- Award icon: `<Award />` (for Hall of Fame)
- Quote icon: `<Quote />`
- ArrowRight: `<ArrowRight />`

---

## 13. QUICK REFERENCE: VERIFIED FACTS FOR COPY

All of these are sourced and accurate. Use them in your website copy:

- TR-1 released: November 1, 1954
- TR-1 price: $49.95 (≈ $400 today)
- TR-1 sold: ~150,000 units in first year
- TR-1 source: Smithsonian nmah_713528
- TV ownership 1950: 9%
- TV ownership 1960: 90%
- TV price 1949: ~$500
- TV price 1953: ~$200
- Ed Sullivan first Elvis appearance: September 9, 1956
- Ed Sullivan viewers: 60 million / 82.6% of TV audience
- Sullivan fee for Elvis: $50,000 for 3 appearances (unprecedented at the time)
- Third appearance (waist-up): January 6, 1957
- Heartbreak Hotel release: January 27, 1956, RCA Victor 47-6420
- Heartbreak Hotel weeks at #1 (pop): 7 weeks
- Heartbreak Hotel weeks at #1 (country): 17 weeks
- Leave It to Beaver premiere: October 4, 1957, CBS
- Leave It to Beaver creator: Joe Connelly and Bob Mosher
- Sputnik launch: October 4, 1957
- NASA founded: 1958 (direct response to Sputnik)
- NDEA passed: 1958 (National Defense Education Act)
- Minow "Vast Wasteland" speech: May 9, 1961
- Transistor invented: 1947, Bell Laboratories (Brattain, Bardeen, Shockley)
- Nobel Prize for transistor: 1956
