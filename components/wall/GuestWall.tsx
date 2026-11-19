"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, m, type Transition } from "motion/react";

import { DoodlePad, type DoodleHandle } from "./DoodlePad";
import { beginDrag } from "./drag";
import { LIMITS, NOTE_COLORS, type GuestKind, type GuestPost } from "@/lib/guest";
import { TILT } from "@/content/zones";

const SPOT_ID = "__spot";
const CLIPBOARD_ID = "__clipboard";
const SPOT_W = 200;
const SPOT_H = 180;

/** Posts can only be saved inside this part of the guest zone (the API clamps to the same box). */
const clampToArea = (x: number, y: number) => {
  const { minX, maxX, minY, maxY } = LIMITS.area;
  return {
    x: Math.min(maxX - SPOT_W, Math.max(minX, x)),
    y: Math.min(maxY - SPOT_H, Math.max(minY, y)),
  };
};

const randomSpot = () => {
  const { minX, maxX, minY, maxY } = LIMITS.area;
  return {
    x: Math.round(minX + Math.random() * (maxX - SPOT_W - minX)),
    y: Math.round(minY + Math.random() * (maxY - SPOT_H - minY)),
  };
};

/** A note being slapped onto the wall: drops in big, overshoots, settles. */
const slap: Transition = { type: "spring", stiffness: 520, damping: 17, mass: 0.9 };
const glide: Transition = { type: "spring", stiffness: 300, damping: 28 };
const tabFade: Transition = { duration: 0.14, ease: "easeOut" };

/** Shrinks a photo to ≤1200px WebP (JPEG fallback) before upload. */
async function compressImage(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const k = Math.min(1, 1200 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * k);
  c.height = Math.round(bmp.height * k);
  c.getContext("2d")?.drawImage(bmp, 0, 0, c.width, c.height);
  const webp = await new Promise<Blob | null>((r) => c.toBlob(r, "image/webp", 0.82));
  if (webp && webp.type === "image/webp") return webp;
  const jpg = await new Promise<Blob | null>((r) => c.toBlob(r, "image/jpeg", 0.85));
  if (!jpg) throw new Error("couldn't read that image");
  return jpg;
}

export function GuestWall() {
  const [posts, setPosts] = useState<GuestPost[]>([]);
  const [freshId, setFreshId] = useState<string | null>(null);
  // where your post will land: starts somewhere random, and you drag the box to move it
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);
  const [spotKey, setSpotKey] = useState(0);
  // things visitors have moved around (not saved) + who's on top
  const [moved, setMoved] = useState<Record<string, { x: number; y: number }>>({});
  const [zOrder, setZOrder] = useState<Record<string, number>>({});
  const [held, setHeld] = useState<string | null>(null);
  const zTop = useRef(100);
  const [tab, setTab] = useState<GuestKind>("note");
  const [color, setColor] = useState<string>(NOTE_COLORS[0].hex);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState<{ blob: Blob; url: string } | null>(null);
  const [status, setStatus] = useState<{ kind: "idle" | "busy" | "error" | "done"; msg?: string }>({ kind: "idle" });
  const doodle = useRef<DoodleHandle>(null);
  const trap = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/guest")
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((d) => setPosts(d.posts ?? []))
      .catch(() => {});
    // random start spot (picked after mount so server and browser render the same HTML)
    setSpot(randomSpot());
  }, []);

  /** Pick something up: posts, the "yours goes here" box, the clipboard. */
  const grab = (id: string, from: { x: number; y: number }, e: React.PointerEvent, limit?: (x: number, y: number) => { x: number; y: number }) => {
    beginDrag(e, {
      from,
      onPickUp: () => {
        setHeld(id);
        setZOrder((z) => ({ ...z, [id]: ++zTop.current }));
      },
      onMove: (x, y) => {
        const p = limit ? limit(x, y) : { x, y };
        if (id === SPOT_ID) setSpot(p);
        else setMoved((mv) => ({ ...mv, [id]: p }));
      },
      onDrop: () => setHeld(null),
    });
  };
  const clipboard = moved[CLIPBOARD_ID] ?? { x: 940, y: 40 };

  const pickPhoto = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setStatus({ kind: "error", msg: "that's not an image" });
    if (file.size > 20 * 1024 * 1024) return setStatus({ kind: "error", msg: "that photo is huge, try one under 20 MB" });
    try {
      const blob = await compressImage(file);
      if (photo) URL.revokeObjectURL(photo.url);
      setPhoto({ blob, url: URL.createObjectURL(blob) });
      setStatus({ kind: "idle" });
    } catch {
      setStatus({ kind: "error", msg: "couldn't read that image" });
    }
  };

  const submit = async () => {
    if (!spot) return;
    const fd = new FormData();
    fd.set("kind", tab);
    fd.set("name", name.trim());
    fd.set("x", String(spot.x));
    fd.set("y", String(spot.y));
    fd.set("website", trap.current?.value ?? ""); // honeypot: people never see it, bots fill it in
    if (tab === "note") {
      if (!text.trim()) return setStatus({ kind: "error", msg: "write something first" });
      fd.set("text", text.trim());
      fd.set("color", color);
    } else if (tab === "doodle") {
      if (!doodle.current || doodle.current.isEmpty()) return setStatus({ kind: "error", msg: "draw something first" });
      const blob = await doodle.current.toBlob();
      if (!blob) return setStatus({ kind: "error", msg: "couldn't save the drawing" });
      fd.set("file", blob, "doodle.png");
      fd.set("color", color);
    } else {
      if (!photo) return setStatus({ kind: "error", msg: "pick a photo first" });
      fd.set("file", photo.blob, photo.blob.type === "image/webp" ? "photo.webp" : "photo.jpg");
      fd.set("caption", caption.trim());
    }
    setStatus({ kind: "busy" });
    try {
      const res = await fetch("/api/guest", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "something broke, try again");
      setFreshId(data.post.id);
      setPosts((p) => [data.post, ...p]);
      setZOrder((z) => ({ ...z, [data.post.id]: ++zTop.current }));
      // the box moves on to a new random spot for the next one
      setSpot(randomSpot());
      setSpotKey((k) => k + 1);
      setText("");
      setCaption("");
      doodle.current?.clear();
      if (photo) URL.revokeObjectURL(photo.url);
      setPhoto(null);
      setStatus({ kind: "done", msg: "stuck it up. thanks!" });
    } catch (err) {
      setStatus({ kind: "error", msg: (err as Error).message });
    }
  };

  return (
    <>
      <div style={{ position: "absolute", left: 60, top: 40, transform: "rotate(-0.75deg)", pointerEvents: "none" }}>
        <h2 className="anton" style={{ margin: 0, fontSize: 120, lineHeight: 0.9, color: "var(--paper)", fontWeight: 400 }}>
          your turn.
        </h2>
        <div className="marker" style={{ fontSize: 26, color: "var(--orange)", paddingTop: 6 }}>
          stick something up. it goes live right away.
        </div>
      </div>

      {[...posts].reverse().map((p) => {
        const pos = moved[p.id] ?? { x: p.x, y: p.y };
        return (
          <GuestPiece
            key={p.id}
            post={p}
            x={pos.x}
            y={pos.y}
            z={zOrder[p.id]}
            held={held === p.id}
            fresh={p.id === freshId}
            onPointerDown={(e) => grab(p.id, pos, e)}
          />
        );
      })}

      {/* where your post will land. Drag it; it can only go where posts are allowed. */}
      {spot && (
        <m.div
          key={spotKey}
          data-drag
          className={clsx(held === SPOT_ID && "is-held")}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: held === SPOT_ID ? 1.05 : 1 }}
          transition={glide}
          onPointerDown={(e) => grab(SPOT_ID, spot, e, clampToArea)}
          style={{
            position: "absolute",
            left: spot.x,
            top: spot.y,
            zIndex: held === SPOT_ID ? 9001 : 9000,
            rotate: 0.5,
            width: 200,
            height: 180,
            boxSizing: "border-box",
            border: "3px dashed var(--orange)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            color: "var(--orange)",
            textAlign: "center",
            cursor: held === SPOT_ID ? "grabbing" : "grab",
            userSelect: "none",
            background: "rgba(22,17,13,.35)",
          }}
        >
          <div className="marker" style={{ fontSize: 22 }}>yours goes here</div>
          <div style={{ fontSize: 12, padding: "0 10px" }}>drag me to where you want it</div>
        </m.div>
      )}

      {/* the clipboard (grab it by the wood; the form fields still work normally) */}
      <m.div
        className={clsx("piece", held === CLIPBOARD_ID && "is-held")}
        data-drag
        initial={false}
        animate={{ rotate: held === CLIPBOARD_ID ? 0 : 0.25, scale: held === CLIPBOARD_ID ? 1.02 : 1 }}
        transition={glide}
        onPointerDown={(e) => grab(CLIPBOARD_ID, clipboard, e)}
        style={{
          left: clipboard.x,
          top: clipboard.y,
          zIndex: zOrder[CLIPBOARD_ID],
          width: 450,
          height: 790,
          background: "#7a4b2c",
          borderRadius: 14,
          padding: "46px 18px 18px",
          filter: "none",
        }}
      >
        <div style={{ position: "absolute", left: 150, top: -10, width: 150, height: 46, background: "linear-gradient(#d8d8d8,#8d8d8d)", borderRadius: "8px 8px 4px 4px", boxShadow: "0 4px 6px rgba(0,0,0,.5)" }} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          style={{ background: "var(--paper)", height: "100%", boxSizing: "border-box", padding: "22px 24px", display: "flex", flexDirection: "column", gap: 14, color: "var(--ink)" }}
        >
          <div className="anton" style={{ fontSize: 34, lineHeight: 1 }}>put something on the wall</div>

          <div role="tablist" aria-label="What to post" style={{ display: "flex", gap: 8 }}>
            {(["note", "doodle", "photo"] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => {
                  setTab(t);
                  setStatus({ kind: "idle" });
                }}
                className="elite"
                style={{ flex: 1, height: 44, border: "2px solid var(--ink)", fontSize: 16, cursor: "pointer", background: tab === t ? "var(--ink)" : "transparent", color: tab === t ? "var(--paper)" : "var(--ink)" }}
              >
                {t}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={tabFade}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
          {tab === "note" && (
            <>
              <div>
                <label className="lbl" htmlFor="g-note">YOUR NOTE · {LIMITS.text} CHARACTERS MAX</label>
                <textarea
                  id="g-note"
                  className="field marker"
                  rows={4}
                  maxLength={LIMITS.text}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="say hi, recommend a film, leave a riddle…"
                  style={{ resize: "none", fontSize: 18, background: color }}
                />
              </div>
              <ColorPicker color={color} setColor={setColor} />
            </>
          )}

          {tab === "doodle" && (
            <>
              <DoodlePad ref={doodle} background={color} />
              <ColorPicker color={color} setColor={setColor} />
            </>
          )}

          {tab === "photo" && (
            <>
              <label
                htmlFor="g-photo"
                style={{ height: 190, border: "3px dashed var(--ink)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, textAlign: "center", cursor: "pointer", padding: 12, overflow: "hidden" }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  pickPhoto(e.dataTransfer.files[0]);
                }}
              >
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo.url} alt="Your photo" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                ) : (
                  <>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="15" rx="2" />
                      <circle cx="12" cy="12.5" r="3.5" />
                      <path d="M8 5 L9.5 3 H14.5 L16 5" />
                    </svg>
                    <span style={{ fontSize: 16 }}>drop a photo or tap to choose</span>
                    <span style={{ fontSize: 12 }}>any image · it becomes a polaroid</span>
                  </>
                )}
              </label>
              <input id="g-photo" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => pickPhoto(e.target.files?.[0])} />
              <div>
                <label className="lbl" htmlFor="g-cap">CAPTION</label>
                <input id="g-cap" className="field" type="text" maxLength={LIMITS.caption} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="write on the bottom of the polaroid" />
              </div>
            </>
          )}
          </m.div>
          </AnimatePresence>

          <div>
            <label className="lbl" htmlFor="g-name">SIGN IT (OPTIONAL)</label>
            <input id="g-name" className="field" type="text" maxLength={LIMITS.name} value={name} onChange={(e) => setName(e.target.value)} placeholder="your name or handle" />
          </div>

          {/* honeypot: hidden from people and screen readers; anything typed here gets the post rejected */}
          <input ref={trap} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} />

          <div style={{ flex: 1 }} />
          {status.msg && (
            <div role="status" style={{ fontSize: 14, color: status.kind === "error" ? "var(--red)" : "var(--ink)" }}>
              {status.msg}
            </div>
          )}
          <button
            type="submit"
            disabled={status.kind === "busy"}
            className="anton"
            style={{ height: 60, border: "none", background: "var(--ink)", color: "var(--paper)", fontSize: 28, cursor: status.kind === "busy" ? "wait" : "pointer" }}
          >
            {status.kind === "busy" ? "sticking…" : "stick it up →"}
          </button>
          <div style={{ fontSize: 12, lineHeight: 1.4, color: "#4a4038" }}>Goes up instantly. Be nice-ish: ojas takes down anything nasty.</div>
        </form>
      </m.div>
    </>
  );
}

function ColorPicker({ color, setColor }: { color: string; setColor: (c: string) => void }) {
  return (
    <div>
      <span className="lbl">STICKY COLOR</span>
      <div style={{ display: "flex", gap: 10 }}>
        {NOTE_COLORS.map((c) => (
          <button
            key={c.hex}
            type="button"
            aria-label={c.name}
            aria-pressed={color === c.hex}
            onClick={() => setColor(c.hex)}
            style={{ width: 44, height: 44, cursor: "pointer", background: c.hex, border: color === c.hex ? "4px solid var(--ink)" : "2px solid rgba(22,17,13,.35)" }}
          />
        ))}
      </div>
    </div>
  );
}

function GuestPiece({
  post,
  x,
  y,
  z,
  held,
  fresh,
  onPointerDown,
}: {
  post: GuestPost;
  x: number;
  y: number;
  z?: number;
  held: boolean;
  fresh: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
}) {
  const rotate = post.rotate * TILT;
  const base = { left: x, top: y, zIndex: z };
  const sig = post.name ? `— ${post.name}` : "— a visitor";
  // posts already on the wall just sit there; the one you just made gets slapped on
  const motionProps = {
    "data-post": "",
    "data-drag": "",
    className: clsx("piece", held && "is-held"),
    onPointerDown,
    initial: fresh ? { opacity: 0, scale: 1.35, y: -40, rotate: rotate - 9 } : false,
    animate: { opacity: 1, scale: held ? 1.05 : 1, y: 0, rotate: held ? 0 : rotate },
    transition: slap,
  } as const;

  if (post.kind === "photo") {
    return (
      <m.div {...motionProps} style={{ ...base, width: 200, background: "var(--paper-white)", padding: "10px 10px 8px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.image_url ?? ""} alt={post.caption ? `Visitor photo: ${post.caption}` : "Photo left by a visitor"} loading="lazy" draggable={false} style={{ width: 180, height: 160, objectFit: "cover", display: "block" }} />
        <div className="marker" style={{ fontSize: 16, textAlign: "center", paddingTop: 6, lineHeight: 1.15 }}>
          {post.caption || ""} {sig}
        </div>
        <span className="tape" />
      </m.div>
    );
  }

  return (
    <m.div
      {...motionProps}
      className={clsx("piece marker", held && "is-held")}
      style={{
        ...base,
        width: 180,
        height: 170,
        background: post.color ?? "var(--sticky)",
        padding: post.kind === "doodle" ? "22px 14px 10px" : "30px 16px 12px",
        fontSize: (post.text?.length ?? 0) > 120 ? 14 : (post.text?.length ?? 0) > 60 ? 16 : 19,
        lineHeight: 1.2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowWrap: "anywhere",
      }}
    >
      {post.kind === "doodle" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.image_url ?? ""} alt="Doodle left by a visitor" loading="lazy" draggable={false} style={{ width: "100%", height: 104, objectFit: "contain" }} />
      ) : (
        <span style={{ overflow: "hidden" }}>{post.text}</span>
      )}
      <small className="elite" style={{ fontSize: 12 }}>{sig}</small>
      <span className="pin" />
    </m.div>
  );
}
