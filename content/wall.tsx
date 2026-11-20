/**
 * Everything pinned on the wall.
 *
 * Add something: append an entry here, then give it a position in content/layout.json
 * (or open the site in dev with ?edit=1, drag it where you want and hit save).
 * Images live in public/wall/.
 */
import type { WallItem } from "./types";
import { Pin, Polaroid, Photo, Staple, Tape } from "@/components/wall/pieces";
import { SpotifyCard } from "@/components/wall/SpotifyCard";
import { GuestWall } from "@/components/wall/GuestWall";
import { ZONE_W, STAGE_H } from "./zones";

const ink = "var(--ink)";
const paper = "var(--paper)";
const white = "var(--paper-white)";

export const items: WallItem[] = [
  /* ───────────── 01 · me ───────────── */
  {
    id: "poster",
    label: "Ojas, live in Montreal",
    w: 380,
    h: 500,
    style: { background: "var(--orange)", display: "flex", flexDirection: "column" },
    content: (
      <>
        <div style={{ height: 300, overflow: "hidden", background: ink }}>
          <Photo src="/wall/pfp.jpg" alt="Portrait of Ojas" style={{ height: "100%" }} eager />
        </div>
        <div style={{ padding: "10px 22px 18px", display: "flex", flexDirection: "column", gap: 4 }}>
          <div className="anton" style={{ fontSize: 132, lineHeight: 0.9 }}>OJAS</div>
          <div className="anton" style={{ fontSize: 22 }}>montreal, qc</div>
          <div style={{ fontSize: 15 }}>McGill University | math + cs</div>
        </div>
        <Tape />
      </>
    ),
  },
  {
    id: "welcome",
    w: 230,
    h: 230,
    className: "marker",
    style: { background: "var(--sticky)", padding: "32px 18px 14px", fontSize: 19, lineHeight: 1.25 },
    content: (
      <>
        hey, welcome to my wall. scroll → or drag it around. anything that lifts when you hover is clickable.
        <Pin />
      </>
    ),
  },
  {
    id: "me-polaroid",
    w: 222,
    style: { background: white, padding: "12px 12px 10px" },
    content: (
      <>
        <Polaroid src="/wall/profile.jpg" alt="Ojas balancing a paper cup on their nose" w={198} h={198} caption="me, probably" />
        <Tape />
      </>
    ),
  },
  {
    id: "canyon",
    w: 330,
    style: { background: white, padding: 12 },
    content: (
      <>
        <Photo src="/wall/canyon.jpg" alt="Two small figures standing on a canyon ledge at sunset" style={{ height: 172 }} />
        <Tape />
      </>
    ),
  },
  {
    id: "montreal",
    label: "The where: Montreal, QC",
    w: 300,
    h: 310,
    className: "torn",
    style: { background: paper },
    content: (
      <>
        <Photo src="/wall/montreal.jpg" alt="Street map of Montreal" style={{ height: 250 }} />
        <div style={{ background: ink, color: paper, padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span className="marker" style={{ fontSize: 20 }}>the where.</span>
          <span style={{ fontSize: 14 }}>montreal, QC</span>
        </div>
        <Pin style={{ top: 14 }} />
      </>
    ),
  },
  {
    id: "hackathons",
    label: "I host(ed) hackathons",
    w: 250,
    h: 370,
    style: { background: ink, display: "flex", flexDirection: "column" },
    content: (
      <>
        <Photo src="/wall/hackathon.jpg" alt="Ojas speaking at a hackathon" style={{ height: 250 }} />
        <div style={{ padding: "10px 16px" }}>
          <div className="anton" style={{ fontSize: 44, lineHeight: 0.95, color: "var(--pink)" }}>i host(ed) hackathons</div>
        </div>
        <Tape />
      </>
    ),
  },
  {
    id: "lucknow",
    w: 190,
    style: { background: white, padding: "10px 10px 8px" },
    content: (
      <>
        <Polaroid src="/wall/lucknow.jpg" alt="Street in Lucknow at sunset" w={170} h={130} caption="lucknow" captionSize={17} />
        <Pin />
      </>
    ),
  },
  {
    id: "sticker-projects",
    label: "Things I've made",
    href: "#zone-work",
    w: 220,
    h: 96,
    className: "anton",
    style: {
      background: ink,
      color: "var(--orange)",
      border: `5px solid ${paper}`,
      borderRadius: 16,
      fontSize: 32,
      lineHeight: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 8,
    },
    content: <>things i&apos;ve made →</>,
  },
  {
    id: "sticker-resume",
    label: "Resume",
    href: "/resume",
    w: 170,
    h: 108,
    style: { background: paper, borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 },
    content: (
      <>
        <span className="anton" style={{ fontSize: 34, lineHeight: 1 }}>resume</span>
        <span style={{ fontSize: 12 }}></span>
      </>
    ),
  },
  {
    id: "sticker-garden",
    label: "My digital garden",
    href: "https://notebook.knowojas.com",
    w: 230,
    h: 84,
    className: "anton",
    style: {
      background: "var(--pink)",
      fontSize: 28,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      clipPath: "polygon(4% 0,100% 3%,97% 100%,0 96%)",
    },
    content: <>digital garden ↗</>,
  },
  {
    id: "scrawl-was-here",
    flat: true,
    className: "marker",
    style: { fontSize: 44, color: "rgba(239,231,214,.2)", whiteSpace: "nowrap" },
    content: <>chloe was here</>,
  },
  {
    id: "scrawl-keep-going",
    flat: true,
    className: "marker",
    style: { fontSize: 30, color: "var(--orange)", whiteSpace: "nowrap" },
    content: <> →</>,
  },

  /* ───────────── 02 · work ───────────── */
  {
    id: "flyer-projects",
    label: "Things I've made: all projects",
    href: "/projects",
    w: 420,
    h: 640,
    style: { background: paper, display: "flex", flexDirection: "column" },
    content: (
      <>
        <div style={{ padding: "26px 26px 0", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 13, letterSpacing: ".2em" }}>NOW SHOWING · 10 PROJECTS</div>
          <div className="anton" style={{ fontSize: 92, lineHeight: 0.88 }}>things i&apos;ve made</div>
          <div style={{ fontSize: 15, lineHeight: 1.5, borderTop: `3px solid ${ink}`, paddingTop: 10 }}>
            Next.js · Python · Godot · Go · OpenCV · scikit-learn · a lot of late nights
          </div>
          <div className="anton" style={{ fontSize: 26, color: "var(--red)" }}>see them all →</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ height: 190, display: "flex", borderTop: "2px dashed rgba(22,17,13,.5)" }}>
          <div className="tear"><span>Popcorn</span></div>
          <div className="tear"><span>Where&apos;s My Jam?</span></div>
          <div className="tear"><span>McMayhem</span></div>
          <div className="tear" style={{ background: "#3a3a3a", borderLeftColor: "transparent" }} />
          <div className="tear"><span>Game of Life</span></div>
          <div className="tear"><span>Mon Cahier</span></div>
          <div className="tear"><span>ChordsIdentifier</span></div>
        </div>
        <Tape />
      </>
    ),
  },
  {
    id: "nuclear",
    label: "Nuclear",
    href: "https://nuclearapp.ca",
    w: 260,
    h: 330,
    style: { background: ink, color: "#F7E26B", padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 },
    content: (
      <>
        <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="56" fill="none" stroke="#F7E26B" strokeWidth="4" />
          <circle cx="60" cy="60" r="10" fill="#F7E26B" />
          <path d="M60 60 L33 13 A54 54 0 0 1 87 13 Z" fill="#F7E26B" />
          <path d="M60 60 L114 60 A54 54 0 0 1 87 107 Z" fill="#F7E26B" />
          <path d="M60 60 L33 107 A54 54 0 0 1 6 60 Z" fill="#F7E26B" />
        </svg>
        <div className="anton" style={{ fontSize: 64, lineHeight: 1 }}>nuclear</div>
        <div style={{ fontSize: 15, color: paper }}>nuclearapp.ca ↗</div>
        <Pin />
      </>
    ),
  },
  {
    id: "codeday",
    label: "CodeDay",
    href: "https://codeday.org",
    w: 250,
    style: { background: white, padding: "12px 12px 10px" },
    content: (
      <>
        <Polaroid src="/wall/codeday.jpg" alt="CodeDay shirt with a rubber duck" w={226} h={200} caption="codeday ↗" />
        <Tape />
      </>
    ),
  },
  {
    id: "games",
    label: "Games I've made, on itch.io",
    href: "https://f1shf1sh.itch.io",
    w: 300,
    h: 250,
    style: {
      background: ink,
      color: paper,
      border: "4px solid var(--pink)",
      padding: 22,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    content: (
      <>
        <div style={{ fontSize: 13, letterSpacing: ".25em", color: "var(--pink)" }}>INSERT COIN</div>
        <div className="anton" style={{ fontSize: 58, lineHeight: 0.92 }}>games i&apos;ve made</div>
        <div style={{ fontSize: 15 }}>play them on itch.io ↗</div>
        <Pin />
      </>
    ),
  },
  {
    id: "badge-top5",
    w: 150,
    h: 150,
    style: {
      borderRadius: "50%",
      background: "var(--orange)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 14,
      boxShadow: "0 6px 10px rgba(0,0,0,.5)",
    },
    content: (
      <>
        <div className="anton" style={{ fontSize: 36, lineHeight: 1 }}>top 5 / 50</div>
        <div style={{ fontSize: 12 }}>McGameJam &apos;24</div>
      </>
    ),
  },
  {
    id: "resume-sheet",
    label: "Resume",
    href: "/resume",
    w: 290,
    h: 380,
    style: { background: white, padding: "30px 26px", display: "flex", flexDirection: "column", gap: 10 },
    content: (
      <>
        <div className="anton" style={{ fontSize: 40, lineHeight: 1 }}>resume</div>
        <div style={{ fontSize: 13 }}>ojas · montreal, qc</div>
        <div className="line" style={{ width: "90%" }} />
        <div className="line" style={{ width: "75%" }} />
        <div className="line" style={{ width: "85%" }} />
        <div style={{ fontSize: 12, paddingTop: 6 }}>EDUCATION</div>
        <div className="line" style={{ width: "70%" }} />
        <div className="line" style={{ width: "80%" }} />
        <div style={{ fontSize: 12, paddingTop: 6 }}>PROJECTS</div>
        <div className="line" style={{ width: "88%" }} />
        <div className="line" style={{ width: "60%" }} />
        <div className="line" style={{ width: "78%" }} />
        <div
          className="anton"
          style={{
            position: "absolute",
            right: 18,
            bottom: 34,
            fontSize: 34,
            color: "var(--red)",
            border: "4px solid var(--red)",
            padding: "2px 12px",
            transform: "rotate(-6deg)",
            opacity: 0.85,
          }}
        >
          pls gib j*b
        </div>
        <Staple style={{ left: 24, top: 10, transform: "rotate(-30deg)" }} />
        <Staple style={{ right: 24, top: 10, transform: "rotate(30deg)" }} />
      </>
    ),
  },
  {
    id: "github",
    label: "Other stuff, on GitHub",
    href: "https://github.com/0jas0jas",
    w: 190,
    h: 190,
    style: {
      borderRadius: "50%",
      background: ink,
      border: `5px solid ${paper}`,
      color: paper,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    content: (
      <>
        <div className="anton" style={{ fontSize: 36, lineHeight: 1 }}>other stuff</div>
        <div style={{ fontSize: 14, color: "var(--orange)" }}>github ↗</div>
      </>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/0jas0jas",
    w: 170,
    h: 58,
    style: { background: paper, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 },
    content: (
      <>
        linkedin ↗
        <Staple style={{ left: 72, top: -2 }} />
      </>
    ),
  },
  {
    id: "scrawl-3am",
    flat: true,
    w: 260,
    className: "marker",
    style: { fontSize: 38, color: "rgba(239,231,214,.22)", lineHeight: 1.1 },
    content: <>made at 3am, mostly</>,
  },

  /* ───────────── 03 · taste ───────────── */
  {
    id: "films",
    label: "I love films: my Letterboxd",
    href: "https://letterboxd.com/f1shf1sh",
    w: 310,
    h: 440,
    style: { background: ink, display: "flex", flexDirection: "column" },
    content: (
      <>
        <Photo src="/wall/film.jpg" alt="Ojas shooting with a camera" style={{ height: 280 }} />
        <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 6 }}>
          <div className="anton" style={{ fontSize: 62, lineHeight: 0.9, color: paper }}>
            i <span style={{ color: "var(--pink)" }}>love</span> films.
          </div>
          <div style={{ fontSize: 14, color: paper }}>my diary on letterboxd ↗</div>
        </div>
        <Tape />
      </>
    ),
  },
  {
    id: "stub-1",
    className: "stub",
    content: (
      <>
        <span className="anton" style={{ fontSize: 22 }}>admit one</span>
        <span style={{ fontSize: 11 }}>ROW F · SEAT 12</span>
      </>
    ),
  },
  {
    id: "stub-2",
    className: "stub",
    style: { background: "#F2B8C6" },
    content: (
      <>
        <span className="anton" style={{ fontSize: 22 }}>admit one</span>
        <span style={{ fontSize: 11 }}>LATE SHOW</span>
      </>
    ),
  },
  {
    id: "fwwm",
    w: 290,
    h: 210,
    style: { background: white, padding: 10 },
    content: (
      <>
        <Photo src="/wall/firewalkwithme.jpg" alt="Scrap of paper reading Fire Walk With Me" style={{ height: "100%" }} />
        <Pin />
      </>
    ),
  },
  {
    id: "lynch",
    w: 300,
    style: { background: paper, padding: "26px 24px 22px", display: "flex", flexDirection: "column", gap: 12 },
    content: (
      <>
        <div style={{ fontSize: 19, lineHeight: 1.45 }}>
          &ldquo;everything i learned in my life, i learned because i decided to try something new.&rdquo;
        </div>
        <div className="anton" style={{ fontSize: 26, color: "var(--red)" }}>david lynch</div>
        <Tape style={{ transform: "rotate(4deg)" }} />
      </>
    ),
  },
  {
    id: "spotify",
    label: "My top track this month on Spotify",
    w: 330,
    h: 310,
    style: { background: ink, color: paper, padding: 22, display: "flex", flexDirection: "column", gap: 14 },
    content: (
      <>
        <SpotifyCard />
        <Pin />
      </>
    ),
  },
  {
    id: "filmstrip",
    label: "Look at my pictures on Unsplash",
    href: "https://unsplash.com/@f1shf1sh",
    w: 500,
    style: { background: "#0d0907", padding: "6px 14px", display: "flex", flexDirection: "column", gap: 6 },
    content: (
      <>
        <div className="holes" />
        <div style={{ display: "flex", gap: 10 }}>
          <Photo src="/wall/sikkim.jpg" alt="Ojas photographing in Sikkim" style={{ width: 150, height: 110 }} />
          <Photo src="/wall/speed.jpg" alt="Blurred dusk landscape from a moving car" style={{ width: 150, height: 110 }} />
          <Photo src="/wall/bb.jpg" alt="Chalkboard with music notes" style={{ width: 150, height: 110 }} />
        </div>
        <div className="holes" />
        <div className="marker" style={{ fontSize: 22, color: paper, padding: "2px 4px 6px" }}>look at my pictures → unsplash ↗</div>
      </>
    ),
  },
  {
    id: "matchbook",
    label: "Email me: ojas@knowojas.com",
    href: "mailto:ojas@knowojas.com",
    w: 210,
    h: 290,
    style: { background: "var(--red)", color: paper, display: "flex", flexDirection: "column" },
    content: (
      <>
        <div style={{ height: 70, background: `repeating-linear-gradient(90deg, ${paper} 0 8px, var(--red) 8px 14px)`, borderBottom: "6px solid #3a2a20" }} />
        <div style={{ flex: 1, padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className="anton" style={{ fontSize: 54, lineHeight: 0.95 }}>email?</div>
          <div style={{ fontSize: 14, wordBreak: "break-all" }}>ojas@knowojas.com</div>
          <div style={{ fontSize: 11, letterSpacing: ".15em" }}>Slanted and enchanted</div>
        </div>
      </>
    ),
  },
  {
    id: "meet",
    label: "Let's meet (online)",
    href: "https://zcal.co/f1shf1sh/30min",
    w: 180,
    style: { background: white, padding: "10px 10px 8px" },
    content: (
      <>
        <Polaroid src="/wall/tisme.jpg" alt="Ojas smiling, slightly blurry" w={160} h={150} caption="let's meet (online) ↗" captionSize={17} />
        <Tape />
      </>
    ),
  },
  {
    id: "scrawl-listening",
    flat: true,
    className: "marker",
    style: { fontSize: 34, color: "rgba(239,231,214,.22)", whiteSpace: "nowrap" },
    content: <>what are you listening to?</>,
  },

  /* ───────────── 04 · guest wall ───────────── */
  {
    id: "guest",
    flat: true,
    locked: true,
    w: ZONE_W,
    h: STAGE_H,
    style: { color: paper },
    content: <GuestWall />,
  },
];
