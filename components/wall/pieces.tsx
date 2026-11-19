import type { CSSProperties, ReactNode } from "react";

export const Tape = ({ style }: { style?: CSSProperties }) => <span className="tape" style={style} />;
export const Pin = ({ style }: { style?: CSSProperties }) => <span className="pin" style={style} />;
export const Staple = ({ style }: { style?: CSSProperties }) => <span className="staple" style={style} />;

/** Photo + handwritten caption. Put it in a piece with a white background and padding. */
export function Polaroid({
  src,
  alt,
  w,
  h,
  caption,
  captionSize = 20,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  caption?: ReactNode;
  captionSize?: number;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={w} height={h} loading="lazy" draggable={false} style={{ width: w, height: h, objectFit: "cover", display: "block" }} />
      {caption && (
        <div className="marker" style={{ fontSize: captionSize, textAlign: "center", paddingTop: 8, lineHeight: 1.15 }}>
          {caption}
        </div>
      )}
    </>
  );
}

/** A plain image filling its box. */
export function Photo({ src, alt, style, eager }: { src: string; alt: string; style?: CSSProperties; eager?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} draggable={false} style={{ width: "100%", objectFit: "cover", display: "block", ...style }} />
  );
}
