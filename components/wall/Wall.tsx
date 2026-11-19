"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";
import { LazyMotion, MotionConfig, domAnimation, m, type Transition } from "motion/react";

import type { Layout, WallItem } from "@/content/types";
import { STAGE_H, STAGE_W, TILT, ZONE_W, zones } from "@/content/zones";
import { beginDrag, swallowNextClick } from "./drag";

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Paper flexing: quick lift, small overshoot on the way back. */
const hoverSpring: Transition = { type: "spring", stiffness: 420, damping: 22, mass: 0.7 };
const lifted = { y: -8, rotate: 0, scale: 1.03 };

/** 1 design px → screen px. Fills the height; on phones it's capped so more than one poster fits. */
const wallScale = () => {
  const s = window.innerHeight / STAGE_H;
  return window.innerWidth < 640 ? Math.min(s, window.innerWidth / 560) : s;
};

export function Wall({ items, initialLayout, decor }: { items: WallItem[]; initialLayout: Layout; decor: ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null);
  const scale = useRef(1);
  const [active, setActive] = useState(0);

  // edit mode (dev only): ?edit=1
  const [editing, setEditing] = useState(false);
  const editingRef = useRef(false);
  const [layout, setLayout] = useState<Layout>(initialLayout);
  const [selected, setSelected] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState("");

  // anyone can move pieces around; nothing is saved (except via edit mode)
  const [held, setHeld] = useState<string | null>(null);
  const [zOrder, setZOrder] = useState<Record<string, number>>({});
  const zTop = useRef(100);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && new URLSearchParams(window.location.search).has("edit")) {
      setEditing(true);
      editingRef.current = true;
    }
  }, []);

  /* ---------- scale the stage to the viewport height ---------- */
  useEffect(() => {
    const update = () => {
      scale.current = wallScale();
      document.documentElement.style.setProperty("--s", String(scale.current));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollToZone = useCallback((i: number) => {
    scroller.current?.scrollTo({ left: i * ZONE_W * scale.current, behavior: reducedMotion() ? "auto" : "smooth" });
  }, []);

  // deep links: /#zone-guest
  useEffect(() => {
    const m = window.location.hash.match(/^#zone-([\w-]+)/);
    const i = m ? zones.findIndex((z) => z.id === m[1]) : -1;
    if (i > 0) scrollToZone(i);
  }, [scrollToZone]);

  /* ---------- wheel → sideways, drag to pan, keyboard ---------- */
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    // after a mouse drag the wall coasts to a stop instead of halting dead
    let coast = 0;
    const stopCoast = () => cancelAnimationFrame(coast);
    const startCoast = (velocity: number) => {
      if (reducedMotion() || Math.abs(velocity) < 0.05) return;
      let v = velocity; // px per ms, in scroll direction
      let last = performance.now();
      const step = (now: number) => {
        const dt = Math.min(now - last, 32);
        last = now;
        el.scrollLeft += v * dt;
        v *= Math.pow(0.94, dt / 16); // friction
        if (Math.abs(v) > 0.02) coast = requestAnimationFrame(step);
      };
      coast = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinch-zoom
      if ((e.target as HTMLElement).closest("textarea, [data-native-scroll]")) return;
      stopCoast();
      // only translate mostly-vertical wheels; trackpad sideways swipes stay native
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaMode === 1 ? e.deltaY * 40 : e.deltaY;
      }
    };

    let start: { x: number; left: number } | null = null;
    let dragged = false;
    let samples: { x: number; t: number }[] = [];
    const onDown = (e: PointerEvent) => {
      stopCoast();
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, button, select, label, canvas, [data-nodrag]")) return;
      if (t.closest("[data-drag]")) return; // grabbing a piece moves the piece, not the wall
      start = { x: e.clientX, left: el.scrollLeft };
      dragged = false;
      samples = [{ x: e.clientX, t: e.timeStamp }];
    };
    const onMove = (e: PointerEvent) => {
      if (!start) return;
      const dx = e.clientX - start.x;
      if (!dragged && Math.abs(dx) > 5) {
        dragged = true;
        el.classList.add("is-dragging");
      }
      if (dragged) el.scrollLeft = start.left - dx;
      samples.push({ x: e.clientX, t: e.timeStamp });
      if (samples.length > 6) samples.shift();
    };
    const onUp = (e: PointerEvent) => {
      if (!start) return;
      start = null;
      if (!dragged) return;
      el.classList.remove("is-dragging");
      // release velocity from the last ~100ms of movement
      const recent = samples.filter((s) => e.timeStamp - s.t < 100);
      if (recent.length >= 2) {
        const a = recent[0];
        const b = recent[recent.length - 1];
        if (b.t > a.t) startCoast(-(b.x - a.x) / (b.t - a.t));
      }
      // a drag that ends over a link must not open it
      swallowNextClick();
    };

    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea, select, [contenteditable]")) return;
      if (editingRef.current && e.key.startsWith("Arrow")) return; // used for nudging
      const page = el.clientWidth * 0.85;
      const step = 240 * scale.current;
      const behavior: ScrollBehavior = reducedMotion() ? "auto" : "smooth";
      const map: Record<string, number> = { ArrowRight: step, ArrowLeft: -step, PageDown: page, PageUp: -page };
      if (e.key in map) {
        e.preventDefault();
        el.scrollBy({ left: map[e.key], behavior });
      } else if (e.key === "Home") {
        e.preventDefault();
        el.scrollTo({ left: 0, behavior });
      } else if (e.key === "End") {
        e.preventDefault();
        el.scrollTo({ left: el.scrollWidth, behavior });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("keydown", onKey);
    return () => {
      stopCoast();
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const i = Math.floor((el.scrollLeft + el.clientWidth / 2) / (ZONE_W * scale.current));
    setActive(Math.max(0, Math.min(zones.length - 1, i)));
  };

  // "#zone-work" links scroll the wall; in edit mode no link navigates
  const onStageClick = (e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest("a");
    if (!a) return;
    if (editingRef.current) {
      e.preventDefault();
      return;
    }
    const match = a.getAttribute("href")?.match(/^#zone-([\w-]+)/);
    if (match) {
      e.preventDefault();
      const i = zones.findIndex((z) => z.id === match[1]);
      if (i >= 0) scrollToZone(i);
    }
  };

  /* ---------- moving pieces (everyone) ---------- */
  const startPieceDrag = (id: string, e: React.PointerEvent) => {
    const from = layout[id] ?? { x: 0, y: 0, r: 0 };
    beginDrag(e, {
      from,
      onPickUp: () => {
        setHeld(id);
        setZOrder((z) => ({ ...z, [id]: ++zTop.current })); // whatever you grab goes on top
        if (editingRef.current) setSelected(id);
      },
      onMove: (x, y) => setLayout((l) => ({ ...l, [id]: { ...(l[id] ?? from), x, y } })),
      onDrop: () => setHeld(null),
    });
  };

  /* ---------- edit mode (dev): rotate / nudge / save ---------- */
  useEffect(() => {
    if (!editing || !selected) return;
    const onKey = (e: KeyboardEvent) => {
      const n = e.shiftKey ? 10 : 1;
      const d: Record<string, [number, number, number]> = {
        ArrowLeft: [-n, 0, 0],
        ArrowRight: [n, 0, 0],
        ArrowUp: [0, -n, 0],
        ArrowDown: [0, n, 0],
        q: [0, 0, -0.5 * n],
        e: [0, 0, 0.5 * n],
      };
      const delta = d[e.key];
      if (!delta) return;
      e.preventDefault();
      setLayout((l) => {
        const p = l[selected] ?? { x: 0, y: 0, r: 0 };
        return { ...l, [selected]: { x: p.x + delta[0], y: p.y + delta[1], r: Math.round((p.r + delta[2]) * 10) / 10 } };
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editing, selected]);

  const save = async () => {
    setSaveMsg("saving…");
    const res = await fetch("/api/dev/layout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(layout) });
    setSaveMsg(res.ok ? "saved to content/layout.json" : "save failed");
  };

  return (
    <LazyMotion features={domAnimation} strict>
      {/* "user": people with reduce-motion turned on get instant changes, no springs */}
      <MotionConfig reducedMotion="user">
      <div ref={scroller} className="wall-scroller" onScroll={onScroll}>
        <div className="wall-sizer plaster" style={{ width: `calc(${STAGE_W}px * var(--s))` }}>
          <div className="wall-stage" style={{ width: STAGE_W }} onClickCapture={onStageClick}>
            {decor}
            {zones.map((z, i) => (
              <span key={z.id} id={`zone-${z.id}`} style={{ position: "absolute", left: i * ZONE_W, top: 0 }} />
            ))}
            {items.map((item) => {
              const p = layout[item.id] ?? { x: 0, y: 0, r: 0 };
              // painted-on writing (flat) and the guest area (locked) stay put; everything else can be grabbed.
              // In edit mode you can also move the writing.
              const movable = !item.locked && (editing || !item.flat);
              const isHeld = held === item.id;
              const style = {
                left: p.x,
                top: p.y,
                width: item.w,
                height: item.h,
                zIndex: zOrder[item.id],
                ...item.style,
              } as CSSProperties;
              const className = clsx(
                "piece",
                item.flat && "flat",
                item.className,
                isHeld && "is-held",
                editing && movable && "is-editing",
                selected === item.id && "ring-2 ring-[var(--pink)]",
              );
              // motion owns the transform: tilt + the lift while held
              const motionProps = {
                initial: false as const,
                animate: { rotate: isHeld ? 0 : p.r * TILT, scale: isHeld ? 1.05 : 1, y: 0 },
                transition: hoverSpring,
              };
              const dragProps = movable
                ? { "data-drag": "", onPointerDown: (e: React.PointerEvent) => startPieceDrag(item.id, e) }
                : {};
              if (item.href) {
                const ext = isExternal(item.href);
                return (
                  <m.a
                    key={item.id}
                    href={item.href}
                    className={className}
                    style={style}
                    {...motionProps}
                    whileHover={editing || held ? undefined : lifted}
                    whileFocus={editing ? undefined : lifted}
                    aria-label={item.label}
                    draggable={false}
                    {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...dragProps}
                  >
                    {item.content}
                  </m.a>
                );
              }
              return (
                <m.div key={item.id} className={className} style={style} {...motionProps} data-locked={item.locked ? "" : undefined} {...dragProps}>
                  {item.content}
                </m.div>
              );
            })}
          </div>
        </div>
      </div>

      <WallNav active={active} onPick={scrollToZone} />

      {editing && (
        <div className="fixed right-4 top-4 z-50 w-72 bg-[var(--paper)] p-4 text-sm text-[var(--ink)] shadow-xl">
          <div className="anton text-2xl">edit mode</div>
          <p className="mt-1">Drag pieces (writing too). Arrows nudge (shift ×10). Q / E rotate. Links are disabled. Save writes the positions for everyone.</p>
          <p className="mt-2">
            selected: <b>{selected ?? "nothing"}</b>
            {selected && layout[selected] && ` (${layout[selected].x}, ${layout[selected].y}, ${layout[selected].r}°)`}
          </p>
          <button type="button" onClick={save} className="anton mt-3 h-11 w-full bg-[var(--ink)] text-lg text-[var(--paper)]">
            save layout
          </button>
          {saveMsg && <p className="mt-2">{saveMsg}</p>}
        </div>
      )}
      </MotionConfig>
    </LazyMotion>
  );
}

/** The "bar tab" receipt at the bottom: where you are, and a way to jump. */
function WallNav({ active, onPick }: { active: number; onPick: (i: number) => void }) {
  return (
    <nav
      aria-label="Wall zones"
      className="fixed bottom-3 left-1/2 z-10 flex h-12 -translate-x-1/2 -rotate-[0.15deg] items-stretch bg-[#F6F2EA] text-sm text-[var(--ink)] shadow-[0_8px_16px_rgba(0,0,0,.5)] sm:bottom-5 sm:h-14 sm:w-[640px]"
    >
      <div className="hidden items-center border-r-2 border-dashed border-[#999] px-3 text-xs sm:flex"></div>
      {zones.map((z, i) => (
        <button
          key={z.id}
          type="button"
          onClick={() => onPick(i)}
          aria-current={active === i ? "location" : undefined}
          aria-label={`${String(i + 1).padStart(2, "0")} ${z.label}`}
          className={clsx(
            "flex min-w-11 items-center justify-center px-2 transition-colors sm:flex-1",
            active === i ? "bg-[var(--ink)] text-[#F6F2EA]" : "hover:bg-[var(--orange)]",
          )}
        >
          <span className="hidden sm:inline">
            {String(i + 1).padStart(2, "0")} {z.label}
          </span>
          <span className={clsx("block h-2.5 rounded-full sm:hidden", active === i ? "w-7 bg-[#F6F2EA]" : "w-2.5 bg-[#a89c8a]")} />
        </button>
      ))}
    </nav>
  );
}
