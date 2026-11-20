"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { m, type Transition } from "motion/react";

import { type DoodleHandle } from "./DoodlePad";
import { beginDrag } from "./drag";
import { LIMITS, NOTE_COLORS, type GuestKind, type GuestPost } from "@/lib/guest";
import { Board } from "./board/Board";
import { NoticePiece, SpotGhost } from "./board/Notices";
import { NoticeForm } from "./board/NoticeForm";

const SPOT_ID = "__spot";
const FORM_ID = "__form";
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

const glide: Transition = { type: "spring", stiffness: 300, damping: 28 };

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

/** The guest wall: a village notice board visitors nail notices, doodles and WANTED posters to. */
export function GuestWall() {
  const [posts, setPosts] = useState<GuestPost[]>([]);
  const [freshId, setFreshId] = useState<string | null>(null);
  // where your post will land: starts somewhere random, and you drag the outline to move it
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);
  const [spotKey, setSpotKey] = useState(0);
  // things visitors have moved around (not saved) + who's on top
  const [moved, setMoved] = useState<Record<string, { x: number; y: number }>>({});
  const [zOrder, setZOrder] = useState<Record<string, number>>({});
  const [held, setHeld] = useState<string | null>(null);
  const zTop = useRef(100);
  const [tab, setTab] = useState<GuestKind>("note");
  const [color, setColor] = useState<string>(NOTE_COLORS[0].hex);
  const [heading, setHeading] = useState("");
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

  /** Pick something up: posts, the "yours goes here" outline, the form. */
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
  const formPos = moved[FORM_ID] ?? { x: 940, y: 40 };

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
      // the heading travels as a prefix ("LOST: …"), see splitHeading()
      fd.set("text", heading ? `${heading}: ${text.trim()}` : text.trim());
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
      // the outline moves on to a new random spot for the next one
      setSpot(randomSpot());
      setSpotKey((k) => k + 1);
      setText("");
      setHeading("");
      setCaption("");
      doodle.current?.clear();
      if (photo) URL.revokeObjectURL(photo.url);
      setPhoto(null);
      setStatus({ kind: "done", msg: "nailed it up. thanks!" });
    } catch (err) {
      setStatus({ kind: "error", msg: (err as Error).message });
    }
  };

  return (
    <>
      <Board />
      {/* the roof needs the space above the board, so the heading sits small, on one line */}
      <div style={{ position: "absolute", left: 60, top: 14, transform: "rotate(-0.75deg)", pointerEvents: "none", display: "flex", alignItems: "baseline", gap: 28 }}>
        <h2 className="anton" style={{ margin: 0, fontSize: 80, lineHeight: 0.9, color: "var(--paper)", fontWeight: 400 }}>
          notice board.
        </h2>
        <div className="marker" style={{ fontSize: 22, color: "var(--orange)", paddingTop: 6 }}>
          If you need a witcher, herbalist or something.
        </div>
      </div>

      {[...posts].reverse().map((p) => {
        const pos = moved[p.id] ?? { x: p.x, y: p.y };
        return (
          <NoticePiece
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

      {/* where your post will land: an empty notice outline. Drag it; it can only go where posts are allowed. */}
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
            width: SPOT_W,
            height: SPOT_H,
            cursor: held === SPOT_ID ? "grabbing" : "grab",
            userSelect: "none",
          }}
        >
          <SpotGhost />
        </m.div>
      )}

      <NoticeForm
        pos={formPos}
        z={zOrder[FORM_ID]}
        held={held === FORM_ID}
        onGrab={(e) => grab(FORM_ID, formPos, e)}
        onSubmit={submit}
        tab={tab}
        setTab={setTab}
        color={color}
        setColor={setColor}
        heading={heading}
        setHeading={setHeading}
        text={text}
        setText={setText}
        name={name}
        setName={setName}
        caption={caption}
        setCaption={setCaption}
        photo={photo}
        pickPhoto={pickPhoto}
        status={status}
        clearStatus={() => setStatus({ kind: "idle" })}
        doodle={doodle}
        trap={trap}
      />
    </>
  );
}
