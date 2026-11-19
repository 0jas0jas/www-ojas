"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export type DoodleHandle = {
  toBlob: () => Promise<Blob | null>;
  isEmpty: () => boolean;
  clear: () => void;
};

const PENS = [
  { name: "Black pen", color: "#16110d" },
  { name: "Pink pen", color: "#FF3D8B" },
  { name: "Orange pen", color: "#FF5A1F" },
  { name: "Blue pen", color: "#2F6FD6" },
];

/** A little drawing pad. Exports a transparent PNG that gets stuck on a sticky note. */
export const DoodlePad = forwardRef<DoodleHandle, { background: string }>(function DoodlePad({ background }, ref) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawn = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [pen, setPen] = useState(PENS[0].color);
  const [eraser, setEraser] = useState(false);

  useImperativeHandle(ref, () => ({
    toBlob: () => new Promise((resolve) => canvas.current?.toBlob((b) => resolve(b), "image/png") ?? resolve(null)),
    isEmpty: () => !drawn.current,
    clear,
  }));

  function clear() {
    const c = canvas.current;
    c?.getContext("2d")?.clearRect(0, 0, c.width, c.height);
    drawn.current = false;
  }

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    return { x: ((e.clientX - r.left) * c.width) / r.width, y: ((e.clientY - r.top) * c.height) / r.height };
  };

  const stroke = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = eraser ? "destination-out" : "source-over";
    ctx.strokeStyle = pen;
    ctx.lineWidth = eraser ? 28 : 7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <span className="lbl">DRAW SOMETHING</span>
      <canvas
        ref={canvas}
        width={720}
        height={440}
        aria-label="Drawing pad"
        style={{ width: "100%", height: 220, border: "2px solid var(--ink)", background, touchAction: "none", cursor: "crosshair" }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          last.current = point(e);
          stroke(last.current, last.current);
          if (!eraser) drawn.current = true;
        }}
        onPointerMove={(e) => {
          if (!last.current) return;
          const p = point(e);
          stroke(last.current, p);
          last.current = p;
        }}
        onPointerUp={() => (last.current = null)}
        onPointerCancel={() => (last.current = null)}
      />
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {PENS.map((p) => (
          <button
            key={p.color}
            type="button"
            aria-label={p.name}
            aria-pressed={!eraser && pen === p.color}
            onClick={() => {
              setPen(p.color);
              setEraser(false);
            }}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: p.color,
              border: "3px solid var(--paper)",
              outline: !eraser && pen === p.color ? "3px solid var(--ink)" : "none",
              cursor: "pointer",
            }}
          />
        ))}
        <div style={{ flex: 1 }} />
        <button
          type="button"
          aria-pressed={eraser}
          onClick={() => setEraser((v) => !v)}
          className="elite"
          style={{ height: 44, padding: "0 12px", border: "2px solid var(--ink)", background: eraser ? "var(--ink)" : "transparent", color: eraser ? "var(--paper)" : "var(--ink)", fontSize: 14, cursor: "pointer" }}
        >
          eraser
        </button>
        <button
          type="button"
          onClick={clear}
          className="elite"
          style={{ height: 44, padding: "0 12px", border: "2px solid var(--ink)", background: "transparent", color: "var(--ink)", fontSize: 14, cursor: "pointer" }}
        >
          clear
        </button>
      </div>
    </div>
  );
});
