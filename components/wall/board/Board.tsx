/**
 * The notice board itself, drawn behind the guest posts (zone-local design px, 1440×900).
 * Board face covers about x 20–880, y 200–775; the roof and posts reach up to y ~106 and down to the floor.
 */

const BOARD = { x: 22, y: 200, w: 856, h: 576 };

/** small deterministic jitter so planks/shingles aren't identical */
const jit = (i: number, k = 1) => {
  const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

function Defs() {
  return (
    <defs>
      {/* dark streaky grain: horizontal and vertical */}
      <filter id="vb-grain-h" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.16" numOctaves="3" seed="4" />
        <feColorMatrix type="matrix" values="0 0 0 0 .09  0 0 0 0 .05  0 0 0 0 .02  2.6 0 0 0 -1.05" />
      </filter>
      <filter id="vb-grain-v" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.16 0.0035" numOctaves="3" seed="7" />
        <feColorMatrix type="matrix" values="0 0 0 0 .09  0 0 0 0 .07  0 0 0 0 .05  2.6 0 0 0 -1.05" />
      </filter>
      {/* pale sun-bleached / weathered blotches */}
      <filter id="vb-weather" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="11" />
        <feColorMatrix type="matrix" values="0 0 0 0 .86  0 0 0 0 .83  0 0 0 0 .76  2.2 0 0 0 -1.1" />
      </filter>
      <filter id="vb-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feGaussianBlur stdDeviation="12" />
      </filter>
      <radialGradient id="vb-nail" cx="35%" cy="35%" r="65%">
        <stop offset="0" stopColor="#a39d96" />
        <stop offset=".55" stopColor="#4b4642" />
        <stop offset="1" stopColor="#1b1918" />
      </radialGradient>
      <radialGradient id="vb-knot" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#2a170b" stopOpacity=".9" />
        <stop offset=".5" stopColor="#3d2414" stopOpacity=".6" />
        <stop offset="1" stopColor="#3d2414" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="vb-rust" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7a3d14" stopOpacity=".55" />
        <stop offset="1" stopColor="#7a3d14" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="vb-roofshade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#000" stopOpacity=".05" />
        <stop offset="1" stopColor="#000" stopOpacity=".35" />
      </linearGradient>
    </defs>
  );
}

function Nail({ x, y, r = 5, rust = true }: { x: number; y: number; r?: number; rust?: boolean }) {
  return (
    <g>
      {rust && <rect x={x - 1.5} y={y} width={3} height={r * 5} fill="url(#vb-rust)" />}
      <circle cx={x + 1.5} cy={y + 2.5} r={r} fill="rgba(0,0,0,.45)" />
      <circle cx={x} cy={y} r={r} fill="url(#vb-nail)" />
    </g>
  );
}

function Knot({ x, y, rx = 9, ry = 5 }: { x: number; y: number; rx?: number; ry?: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="url(#vb-knot)" />;
}

/** horizontal planks inside a framed board */
function FramedPlanks({ palette, frame }: { palette: string[]; frame: string }) {
  const { x, y, w, h } = BOARD;
  const f = 16;
  const n = 6;
  const ph = (h - f * 2) / n;
  return (
    <g>
      <rect x={x + 10} y={y + 16} width={w} height={h} fill="#000" opacity=".55" filter="url(#vb-shadow)" />
      <rect x={x} y={y} width={w} height={h} fill={frame} />
      <rect x={x} y={y} width={w} height={h} filter="url(#vb-grain-h)" opacity=".8" />
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x + f} y={y + f + i * ph} width={w - f * 2} height={ph - 2} fill={palette[i % palette.length]} />
      ))}
      <rect x={x + f} y={y + f} width={w - f * 2} height={h - f * 2} filter="url(#vb-grain-h)" />
      <rect x={x + f} y={y + f} width={w - f * 2} height={h - f * 2} filter="url(#vb-weather)" opacity=".18" />
      {/* plank seams */}
      {Array.from({ length: n - 1 }, (_, i) => (
        <rect key={i} x={x + f} y={y + f + (i + 1) * ph - 2} width={w - f * 2} height={3} fill="rgba(20,10,4,.75)" />
      ))}
      <Knot x={x + 180} y={y + f + ph * 1.5} />
      <Knot x={x + 610} y={y + f + ph * 3.4} rx={12} ry={6} />
      <Knot x={x + 420} y={y + f + ph * 5.5} rx={7} ry={4} />
      {/* inner frame lip shadow */}
      <rect x={x + f} y={y + f} width={w - f * 2} height={6} fill="rgba(0,0,0,.35)" />
      {/* plank nails into the frame */}
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <Nail x={x + f + 10} y={y + f + i * ph + ph / 2} r={3.5} rust={false} />
          <Nail x={x + w - f - 10} y={y + f + i * ph + ph / 2} r={3.5} rust={false} />
        </g>
      ))}
    </g>
  );
}

function Shingles({ top, bottom, left, right, clip, id }: { top: number; bottom: number; left: number; right: number; clip: string; id: string }) {
  const rowH = 17;
  const rows = Math.ceil((bottom - top) / rowH) + 1;
  const tones = ["#6b4a33", "#5d3f2b", "#77543a", "#543826", "#674632", "#4c3324"];
  return (
    <g>
      <clipPath id={id}>
        <polygon points={clip} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <rect x={left} y={top} width={right - left} height={bottom - top} fill="#1f150e" />
        {Array.from({ length: rows }, (_, r) => {
          // cedar shakes: uneven widths, each row overlapping the one above
          const out = [];
          let sx = left - jit(r, 9) * 30;
          for (let c = 0; sx < right; c++) {
            const k = r * 97 + c;
            const sw = 26 + jit(k, 1) * 26;
            const sy = top + r * rowH - 8;
            const len = rowH + 9 + jit(k, 3) * 5;
            const tone = tones[Math.floor(jit(k) * tones.length)];
            out.push(
              <g key={c}>
                <path d={`M${sx + 1} ${sy} h${sw - 2} v${len - 2} q${-(sw - 2) / 2} ${2 + jit(k, 4) * 3} ${-(sw - 2)} 0 z`} fill={tone} />
                <path d={`M${sx + 1} ${sy + len - 2} q${(sw - 2) / 2} ${2 + jit(k, 4) * 3} ${sw - 2} 0`} stroke="rgba(0,0,0,.55)" strokeWidth={2.5} fill="none" />
                <path d={`M${sx + 2} ${sy + len - 6} h${sw - 4}`} stroke="rgba(255,225,180,.1)" strokeWidth={1.5} />
              </g>
            );
            sx += sw;
          }
          return <g key={r}>{out}</g>;
        })}
        <rect x={left} y={top} width={right - left} height={bottom - top} filter="url(#vb-grain-v)" opacity=".7" />
        <rect x={left} y={top} width={right - left} height={bottom - top} fill="url(#vb-roofshade)" />
      </g>
    </g>
  );
}

/** a few turns of rope lashed around a post */
function Lashing({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      {Array.from({ length: 5 }, (_, i) => (
        <g key={i}>
          <path d={`M${x - 3} ${y + i * 7 + 6} L${x + w + 3} ${y + i * 7}`} stroke="#3b2a16" strokeWidth={7} strokeLinecap="round" />
          <path d={`M${x - 3} ${y + i * 7 + 6} L${x + w + 3} ${y + i * 7}`} stroke="#c3a067" strokeWidth={5} strokeLinecap="round" />
          <path d={`M${x - 3} ${y + i * 7 + 6} L${x + w + 3} ${y + i * 7}`} stroke="#8a6a3b" strokeWidth={5} strokeDasharray="2 4" strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

function Rope({ d }: { d: string }) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke="rgba(0,0,0,.4)" strokeWidth={7} transform="translate(3 6)" />
      <path d={d} stroke="#3b2a16" strokeWidth={7} />
      <path d={d} stroke="#c3a067" strokeWidth={5} />
      <path d={d} stroke="#8a6a3b" strokeWidth={5} strokeDasharray="3 5" />
    </g>
  );
}

function Post({ x, top, w = 34 }: { x: number; top: number; w?: number }) {
  return (
    <g>
      <rect x={x + 8} y={top + 10} width={w} height={900 - top} fill="#000" opacity=".5" filter="url(#vb-shadow)" />
      <rect x={x} y={top} width={w} height={900 - top} fill="#5a3b22" />
      <rect x={x} y={top} width={w} height={900 - top} filter="url(#vb-grain-v)" />
      <rect x={x} y={top} width={6} height={900 - top} fill="rgba(255,230,190,.08)" />
      <rect x={x + w - 7} y={top} width={7} height={900 - top} fill="rgba(0,0,0,.3)" />
    </g>
  );
}

/* ───────── the freestanding village board: posts, rope lashings, shingled roof ───────── */
function VillageBoard() {
  const roof = "40,116 860,116 940,206 -40,206";
  return (
    <>
      <Post x={-8} top={110} />
      <Post x={874} top={110} />
      {/* sagging rope between the posts, under the board */}
      <Rope d="M20 812 Q 450 880 880 812" />
      <FramedPlanks palette={["#8a6038", "#7c5431", "#94683d", "#83593a", "#8e6339", "#775032"]} frame="#4a2f1a" />
      <Lashing x={-8} y={226} w={34} />
      <Lashing x={874} y={226} w={34} />
      <Lashing x={-8} y={736} w={34} />
      <Lashing x={874} y={736} w={34} />
      {/* roof */}
      <polygon points={roof} fill="#000" opacity=".45" filter="url(#vb-shadow)" transform="translate(6 14)" />
      <Shingles top={116} bottom={210} left={-40} right={940} clip={roof} id="vb-roof1" />
      <rect x={34} y={106} width={832} height={14} rx={3} fill="#33231a" />
      <rect x={34} y={106} width={832} height={14} rx={3} filter="url(#vb-grain-h)" />
      <rect x={-46} y={202} width={992} height={13} fill="#3d2716" />
      <rect x={-46} y={202} width={992} height={13} filter="url(#vb-grain-h)" />
      <rect x={-46} y={215} width={992} height={8} fill="rgba(0,0,0,.35)" />
    </>
  );
}

export function Board() {
  return (
    <svg
      aria-hidden="true"
      width={1440}
      height={900}
      viewBox="0 0 1440 900"
      style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", overflow: "visible" }}
    >
      <Defs />
      <VillageBoard />
    </svg>
  );
}
