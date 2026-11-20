"use client";

import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { m, type Transition } from "motion/react";

import { NOTE_COLORS, type GuestPost } from "@/lib/guest";
import { TILT } from "@/content/zones";

/* ───────── paper ───────── */

export type Tint = "cream" | "bleached" | "tan" | "smoke";

/** The four parchment tints. Stored in the DB as the NOTE_COLORS hexes (from the sticky-note days), so no schema change. */
export const TINTS: { id: Tint; name: string; hex: (typeof NOTE_COLORS)[number]["hex"]; paper: string; burn: string; fold: string }[] = [
  { id: "cream", name: "cream", hex: NOTE_COLORS[0].hex, paper: "#ecdcb4", burn: "rgba(120,78,28,.42)", fold: "#d9c595" },
  { id: "bleached", name: "bleached", hex: NOTE_COLORS[2].hex, paper: "#f0ebde", burn: "rgba(130,110,70,.28)", fold: "#ddd5c1" },
  { id: "tan", name: "tan", hex: NOTE_COLORS[1].hex, paper: "#d9ba86", burn: "rgba(105,62,18,.5)", fold: "#c6a46c" },
  { id: "smoke", name: "smoke-stained", hex: NOTE_COLORS[3].hex, paper: "#bba67f", burn: "rgba(45,30,15,.62)", fold: "#a8936c" },
];
export const tintOf = (hex?: string | null) => TINTS.find((t) => t.hex.toLowerCase() === hex?.toLowerCase()) ?? TINTS[0];

export const HEADINGS = ["NOTICE", "WANTED", "LOST", "REWARD"] as const;
/** "LOST: my goat" → heading LOST, body "my goat". The form adds the prefix; anyone can also just type it. */
export function splitHeading(text: string | null): { heading: string | null; body: string } {
  const t = text ?? "";
  const mm = t.match(/^\s*(NOTICE|WANTED|LOST|REWARD)\s*[:!.\-—]\s*/i);
  return mm ? { heading: mm[1].toUpperCase(), body: t.slice(mm[0].length) } : { heading: null, body: t };
}

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
};
const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** A torn-paper clip-path. `fold` cuts the bottom-right corner off (px) for the curled corner. */
export function tornClip(seed: string, w: number, h: number, fold = 0, rough = 1) {
  return `polygon(${tornPoints(seed, w, h, fold, rough)
    .map(([x, y]) => `${x.toFixed(1)}px ${y.toFixed(1)}px`)
    .join(",")})`;
}

/** The outline points of a torn sheet (px). */
export function tornPoints(seed: string, w: number, h: number, fold = 0, rough = 1): [number, number][] {
  const r = rng(hash(seed));
  const pts: [number, number][] = [];
  const P = (x: number, y: number) => pts.push([x, y]);
  const steps = (len: number, each: number) => Math.max(4, Math.round(len / each));
  // top: nearly straight (it was cut, then nailed)
  for (let i = 0, n = steps(w, 24); i <= n; i++) P((w * i) / n, r() * 2 * rough);
  // right
  for (let i = 1, n = steps(h, 18); i <= n; i++) {
    const y = (h * i) / n;
    if (fold && y > h - fold) break;
    P(w - r() * 4 * rough, y);
  }
  if (fold) {
    P(w, h - fold);
    P(w - fold, h);
  }
  // bottom: properly ragged
  for (let i = 1, n = steps(w, 12); i < n; i++) {
    const x = w - (w * i) / n;
    if (fold && x > w - fold) continue;
    P(x, h - r() * 7 * rough);
  }
  // left
  for (let i = 0, n = steps(h, 18); i <= n; i++) P(r() * 4 * rough, h - (h * i) / n);
  return pts;
}

const FIBRES =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' seed='5'/%3E%3CfeColorMatrix values='0 0 0 0 .35 0 0 0 0 .25 0 0 0 0 .12 0 0 0 .55 -.12'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E\")";

export function paperStyle(tint: (typeof TINTS)[number], seed: string): CSSProperties {
  const r = rng(hash(seed + "stain"));
  const sx = Math.round(15 + r() * 70);
  const sy = Math.round(20 + r() * 60);
  return {
    background: [
      FIBRES,
      `radial-gradient(ellipse ${30 + r() * 30}% ${20 + r() * 20}% at ${sx}% ${sy}%, rgba(120,80,30,${0.12 + r() * 0.12}), transparent 70%)`,
      `radial-gradient(circle at ${100 - sx}% ${100 - sy}%, rgba(255,250,235,.25), transparent 45%)`,
      tint.paper,
    ].join(","),
    boxShadow: `inset 0 0 26px 6px ${tint.burn}, inset 0 0 3px 1px ${tint.burn}`,
  };
}

/* ───────── fixings ───────── */

export function Nail({ style }: { style?: CSSProperties }) {
  return <span className="iron-nail" style={style} />;
}

/* ───────── motion: a notice being slapped onto the board drops in big, overshoots, settles ───────── */

const slap: Transition = { type: "spring", stiffness: 520, damping: 17, mass: 0.9 };

/** fonts on the notices */
const HEAD = "fell-sc";
const BODY = "fell";
const SIG = "fell italic";

type PieceProps = {
  post: GuestPost;
  x: number;
  y: number;
  z?: number;
  held: boolean;
  fresh: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
};

/** Parchment: torn clip + curled corner + nail. The shadow is a drop-shadow (.notice) so it follows the tear. */
function Parchment({
  seed,
  tint,
  w,
  h,
  fold = 22,
  children,
  pad = "30px 16px 16px",
}: {
  seed: string;
  tint: (typeof TINTS)[number];
  w: number;
  h: number;
  fold?: number;
  children: ReactNode;
  pad?: string;
}) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: tornClip(seed, w, h, fold),
          padding: pad,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          ...paperStyle(tint, seed),
        }}
      >
        {children}
      </div>
      {fold > 0 && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: w - fold,
            top: h - fold,
            width: fold,
            height: fold,
            clipPath: "polygon(100% 0, 0 0, 0 100%)",
            background: `linear-gradient(135deg, ${tint.fold} 0%, ${tint.paper} 55%, #fff8 100%)`,
          }}
        />
      )}
      <Nail style={{ left: w / 2 - 7, top: 7 }} />
    </>
  );
}

export function NoticePiece({ post, x, y, z, held, fresh, onPointerDown }: PieceProps) {
  const rotate = post.rotate * TILT * 2;
  const tint = tintOf(post.color);
  const sig = post.name ? `— ${post.name}` : "— a visitor";

  const wrap = (w: number, hgt: number, body: ReactNode) => (
    <m.div
      data-post=""
      data-drag=""
      className={clsx("piece notice", held && "is-held")}
      onPointerDown={onPointerDown}
      initial={fresh ? { opacity: 0, scale: 1.35, y: -40, rotate: rotate - 9 } : false}
      animate={{ opacity: 1, scale: held ? 1.05 : 1, y: 0, rotate: held ? 0 : rotate }}
      transition={slap}
      style={{ left: x, top: y, zIndex: z, width: w, height: hgt }}
    >
      {body}
    </m.div>
  );

  /* photo → WANTED poster: photo in the middle, caption below */
  if (post.kind === "photo") {
    const W = 200;
    const H = 268;
    return wrap(
      W,
      H,
      <Parchment seed={post.id} tint={tint} w={W} h={H} pad="26px 16px 14px" fold={0}>
        <div className={HEAD} style={{ fontSize: 37, lineHeight: 0.9, textAlign: "center", letterSpacing: "0.01em", color: "#2a1a0e" }}>
          WANTED
        </div>
        <div className={clsx(BODY, "italic")} style={{ fontSize: 11, textAlign: "center", margin: "3px 0 6px", color: "#4a3520" }}>
          ~ seen around these parts ~
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image_url ?? ""}
          alt={post.caption ? `Visitor photo: ${post.caption}` : "Photo left by a visitor"}
          loading="lazy"
          draggable={false}
          style={{ width: "100%", height: 124, objectFit: "cover", display: "block", outline: "2px solid #2a1a0e", outlineOffset: 2 }}
        />
        <div className={HEAD} style={{ fontSize: (post.caption?.length ?? 0) > 28 ? 15 : 19, lineHeight: 1.05, textAlign: "center", marginTop: 9, color: "#2a1a0e", overflowWrap: "anywhere" }}>
          {post.caption || post.name || "the usual suspect"}
        </div>
        <div className={SIG} style={{ fontSize: 12, textAlign: "center", marginTop: "auto", color: "#4a3520" }}>
          {sig}
        </div>
      </Parchment>
    );
  }

  /* doodle: ink sketch on parchment */
  if (post.kind === "doodle") {
    const W = 200;
    const H = 196;
    return wrap(
      W,
      H,
      <Parchment seed={post.id} tint={tint} w={W} h={H} pad="28px 14px 12px">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image_url ?? ""}
          alt="Doodle left by a visitor"
          loading="lazy"
          draggable={false}
          style={{ width: "100%", height: 122, objectFit: "contain", mixBlendMode: "multiply", filter: "contrast(1.15) saturate(.7)" }}
        />
        <small className={SIG} style={{ fontSize: 13, marginTop: "auto", color: "#3b2a18" }}>
          {sig}
        </small>
      </Parchment>
    );
  }

  /* note, with an optional NOTICE / WANTED / LOST / REWARD heading */
  const { heading, body } = splitHeading(post.text);
  const W = 196;
  const H = heading ? 196 : 180;
  const len = body.length;
  return wrap(
    W,
    H,
    <Parchment seed={post.id} tint={tint} w={W} h={H}>
      {heading && (
        <div
          className={HEAD}
          style={{
            fontSize: 28,
            lineHeight: 1,
            textAlign: "center",
            letterSpacing: ".06em",
            color: heading === "WANTED" || heading === "REWARD" ? "#7a1a12" : "#2a1a0e",
            borderBottom: "1.5px solid rgba(42,26,14,.55)",
            paddingBottom: 4,
            marginBottom: 6,
          }}
        >
          {heading}
        </div>
      )}
      <span className={BODY} style={{ overflow: "hidden", fontSize: len > 120 ? 13 : len > 60 ? 15 : 18, lineHeight: 1.22, color: "#24170c", overflowWrap: "anywhere" }}>
        {body}
      </span>
      <small className={SIG} style={{ fontSize: 13, marginTop: "auto", color: "#3b2a18" }}>
        {sig}
      </small>
    </Parchment>
  );
}

/* ───────── "yours goes here": no words, just the empty outline of a notice waiting to be nailed up ───────── */

export function SpotGhost() {
  const outline = tornPoints("ghost", 200, 180, 0, 0.8)
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  return (
    <>
      <svg aria-hidden="true" width={200} height={180} viewBox="0 0 200 180" className="spot-ghost" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {/* the sun-faded patch on the wood where a notice used to hang */}
        <polygon points={outline} fill="rgba(255,236,200,.12)" />
        <polygon points={outline} fill="none" stroke="rgba(0,0,0,.35)" strokeWidth={3} transform="translate(1.5 2.5)" />
        <polygon className="spot-ghost-line" points={outline} fill="none" stroke="var(--orange)" strokeWidth={2.5} strokeDasharray="9 7" strokeLinejoin="round" />
      </svg>
      {/* the nail waiting for it, with a scrap of the last notice still caught under it */}
      <span aria-hidden="true" style={{ position: "absolute", left: 84, top: 0, width: 34, height: 22, background: "#e6d6ae", clipPath: "polygon(0 0,100% 0,92% 60%,70% 100%,48% 70%,22% 100%,6% 55%)" }} />
      <Nail style={{ left: 93, top: 4 }} />
    </>
  );
}
