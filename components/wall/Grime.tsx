"use client";

import { useEffect, useState } from "react";

/** Paints a tile of film grain once and returns it as a data URL. */
function makeGrain(size: number, blur: number, contrast: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    // centred around mid-grey so the overlay blend only lightens/darkens
    const v = Math.max(0, Math.min(255, 128 + (Math.random() - 0.5) * 255 * contrast));
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  if (blur > 0) {
    // soften into clumps, like 16mm grain rather than digital noise
    const out = document.createElement("canvas");
    out.width = size;
    out.height = size;
    const octx = out.getContext("2d");
    if (!octx) return canvas.toDataURL();
    octx.filter = `blur(${blur}px) contrast(1.6)`;
    octx.drawImage(canvas, 0, 0);
    return out.toDataURL();
  }
  return canvas.toDataURL();
}

/**
 * Everything that sits on top of the wall: light falloff, dirt + vignette,
 * Atlanta-style 16mm grain, lifted blacks and a slight desaturation.
 */
export function Grime() {
  const [grain, setGrain] = useState<{ fine: string; clump: string } | null>(null);

  useEffect(() => {
    setGrain({ fine: makeGrain(256, 0.6, 1.1), clump: makeGrain(256, 2.2, 1.4) });
  }, []);

  return (
    <div aria-hidden="true">
      <div className="fx fx-light" />
      <div className="fx fx-dirt" />
      {grain && (
        <>
          <div className="fx fx-grain" style={{ backgroundImage: `url(${grain.fine})` }} />
          <div className="fx fx-clump" style={{ backgroundImage: `url(${grain.clump})` }} />
        </>
      )}
      <div className="fx fx-fade" />
      <div className="fx fx-desat" />
    </div>
  );
}

/** SVG filters referenced from CSS (`filter: url(#rough)`) and the wall decorations. */
export function WallFilters() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="2" result="t" />
        <feDisplacementMap in="SourceGraphic" in2="t" scale="4" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="brush" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency=".02 .2" numOctaves="3" seed="9" result="t" />
        <feDisplacementMap in="SourceGraphic" in2="t" scale="18" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
