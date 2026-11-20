"use client";

import type { RefObject } from "react";
import clsx from "clsx";
import { AnimatePresence, m, type Transition } from "motion/react";

import { DoodlePad, type DoodleHandle } from "../DoodlePad";
import { LIMITS, type GuestKind } from "@/lib/guest";
import { HEADINGS, Nail, TINTS, paperStyle, tintOf, tornClip } from "./Notices";

const tabFade: Transition = { duration: 0.14, ease: "easeOut" };
const glide: Transition = { type: "spring", stiffness: 300, damping: 28 };

export type NoticeFormProps = {
  pos: { x: number; y: number };
  z?: number;
  held: boolean;
  onGrab: (e: React.PointerEvent) => void;
  onSubmit: () => void;
  tab: GuestKind;
  setTab: (t: GuestKind) => void;
  color: string;
  setColor: (c: string) => void;
  heading: string;
  setHeading: (h: string) => void;
  text: string;
  setText: (t: string) => void;
  name: string;
  setName: (n: string) => void;
  caption: string;
  setCaption: (c: string) => void;
  photo: { url: string } | null;
  pickPhoto: (f?: File) => void;
  status: { kind: "idle" | "busy" | "error" | "done"; msg?: string };
  clearStatus: () => void;
  doodle: RefObject<DoodleHandle>;
  trap: RefObject<HTMLInputElement>;
};

const W = 450;
const H = 790;

/** The posting form as a parchment sheet nailed to the wall beside the board. */
export function NoticeForm(p: NoticeFormProps) {
  const tint = tintOf(p.color);
  const sheet = TINTS[0];
  const maxText = LIMITS.text - (p.heading ? p.heading.length + 2 : 0);

  return (
    <m.div
      className={clsx("piece notice", p.held && "is-held")}
      data-drag
      initial={false}
      animate={{ rotate: p.held ? 0 : 0.6, scale: p.held ? 1.02 : 1 }}
      transition={glide}
      onPointerDown={p.onGrab}
      style={{ left: p.pos.x, top: p.pos.y, zIndex: p.z, width: W, height: H }}
    >
      <div style={{ position: "absolute", inset: 0, clipPath: tornClip("form-sheet", W, H, 34, 1.4), ...paperStyle(sheet, "form-sheet") }} />
      <span aria-hidden="true" style={{ position: "absolute", left: W - 34, top: H - 34, width: 34, height: 34, clipPath: "polygon(100% 0, 0 0, 0 100%)", background: `linear-gradient(135deg, ${sheet.fold} 0%, ${sheet.paper} 55%, #fff8 100%)` }} />
      <Nail style={{ left: 26, top: 14 }} />
      <Nail style={{ left: W - 40, top: 16 }} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          p.onSubmit();
        }}
        className="notice-form"
        style={{ position: "relative", height: "100%", boxSizing: "border-box", padding: "40px 32px 30px", display: "flex", flexDirection: "column", gap: 12, color: "#24170c" }}
      >
        <div style={{ textAlign: "center" }}>
          <div className="fell-sc" style={{ fontSize: 38, lineHeight: 1, letterSpacing: ".05em" }}>
            Post a Notice
          </div>
          <div className="fell italic" style={{ fontSize: 14, color: "#5a4128" }}>
            by the order of the eternal fire
          </div>
        </div>

        <div role="tablist" aria-label="What to post" style={{ display: "flex", justifyContent: "center", gap: 22 }}>
          {(["note", "doodle", "photo"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={p.tab === t}
              onClick={() => {
                p.setTab(t);
                p.clearStatus();
              }}
              className="fell-sc"
              style={{
                fontSize: 22,
                padding: "2px 4px",
                border: "none",
                background: "none",
                cursor: "pointer",
                color: p.tab === t ? "#24170c" : "rgba(36,23,12,.5)",
                borderBottom: p.tab === t ? "3px solid #24170c" : "3px solid transparent",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.div key={p.tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={tabFade} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {p.tab === "note" && (
              <>
                <div>
                  <span className="lbl fell-sc">heading (optional)</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["", ...HEADINGS].map((h) => (
                      <button
                        key={h || "none"}
                        type="button"
                        aria-pressed={p.heading === h}
                        onClick={() => p.setHeading(h)}
                        className="fell-sc"
                        style={{
                          flex: h ? 1 : "0 0 40px",
                          height: 34,
                          fontSize: 14,
                          cursor: "pointer",
                          border: "1.5px solid #24170c",
                          background: p.heading === h ? "#24170c" : "transparent",
                          color: p.heading === h ? "#efe2c0" : "#24170c",
                        }}
                      >
                        {h ? h.toLowerCase() : "—"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="lbl fell-sc" htmlFor="g-note">
                    your notice · {maxText} letters at most
                  </label>
                  <textarea
                    id="g-note"
                    className={clsx("field field-parch ruled", "fell")}
                    rows={4}
                    maxLength={maxText}
                    value={p.text}
                    onChange={(e) => p.setText(e.target.value)}
                    placeholder="lost a goat? dealing with drowners? timepass?"
                    style={{ resize: "none", fontSize: 18, backgroundColor: tint.paper }}
                  />
                </div>
                <PaperPicker {...p} />
              </>
            )}

            {p.tab === "doodle" && (
              <>
                <DoodlePad ref={p.doodle} background={tint.paper} />
                <PaperPicker {...p} />
              </>
            )}

            {p.tab === "photo" && (
              <>
                <label
                  htmlFor="g-photo"
                  style={{ height: 200, border: "2px dashed #24170c", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, textAlign: "center", cursor: "pointer", padding: 12, overflow: "hidden" }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    p.pickPhoto(e.dataTransfer.files[0]);
                  }}
                >
                  {p.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.photo.url} alt="Your photo" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                  ) : (
                    <>
                      <span className="fell-sc" style={{ fontSize: 40, lineHeight: 1 }}>
                        WANTED
                      </span>
                      <span className="fell" style={{ fontSize: 16 }}>
                        drop a photo or tap to choose
                      </span>
                      <span className="fell italic" style={{ fontSize: 13 }}>
                        it goes up as a wanted poster
                      </span>
                    </>
                  )}
                </label>
                <input id="g-photo" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => p.pickPhoto(e.target.files?.[0])} />
                <div>
                  <label className="lbl fell-sc" htmlFor="g-cap">
                    wanted for…
                  </label>
                  <input id="g-cap" className={clsx("field field-parch", "fell")} type="text" maxLength={LIMITS.caption} value={p.caption} onChange={(e) => p.setCaption(e.target.value)} placeholder="who or what, written under the picture" />
                </div>
              </>
            )}
          </m.div>
        </AnimatePresence>

        <div>
          <label className="lbl fell-sc" htmlFor="g-name">
            sign it (optional)
          </label>
          <input id="g-name" className={clsx("field field-parch", "fell italic")} type="text" maxLength={LIMITS.name} value={p.name} onChange={(e) => p.setName(e.target.value)} placeholder="your name or handle" />
        </div>

        {/* honeypot: hidden from people and screen readers; anything typed here gets the post rejected */}
        <input ref={p.trap} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} />

        <div style={{ flex: 1 }} />
        {p.status.msg && (
          <div role="status" className="fell" style={{ fontSize: 16, color: p.status.kind === "error" ? "var(--red)" : "#24170c" }}>
            {p.status.msg}
          </div>
        )}
        <button
          type="submit"
          disabled={p.status.kind === "busy"}
          className="fell-sc"
          style={{
            height: 60,
            border: "none",
            background: "#24170c",
            color: "#efe2c0",
            fontSize: 32,
            letterSpacing: ".04em",
            cursor: p.status.kind === "busy" ? "wait" : "pointer",
            clipPath: tornClip("form-btn", 386, 60, 0, 0.5),
          }}
        >
          {p.status.kind === "busy" ? "nailing it up…" : "posttt →"}
        </button>
        <div className="fell italic" style={{ fontSize: 13, lineHeight: 1.35, color: "#5a4128", textAlign: "center" }}>
          Goes up at once. I mightttt remove your stuff if it's BS
        </div>
      </form>
    </m.div>
  );
}

function PaperPicker({ color, setColor }: NoticeFormProps) {
  return (
    <div>
      <span className="lbl fell-sc">paper</span>
      <div style={{ display: "flex", gap: 12 }}>
        {TINTS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={color.toLowerCase() === t.hex.toLowerCase()}
            onClick={() => setColor(t.hex)}
            style={{ flex: 1, border: "none", background: "none", padding: 0, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
          >
            <span
              style={{
                width: "100%",
                height: 40,
                clipPath: tornClip(`sw-${t.id}`, 80, 40, 0, 0.8),
                ...paperStyle(t, `sw-${t.id}`),
                outline: "none",
                filter: color.toLowerCase() === t.hex.toLowerCase() ? "drop-shadow(0 0 0 #24170c) brightness(1.02)" : "brightness(.9)",
              }}
            />
            <span
              className="fell"
              style={{ fontSize: 13, color: "#24170c", borderBottom: color.toLowerCase() === t.hex.toLowerCase() ? "2px solid #24170c" : "2px solid transparent" }}
            >
              {t.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
