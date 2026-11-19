import { ZONE_W, STAGE_H } from "@/content/zones";

/**
 * Paint history on the wall itself: lighter rectangles where old posters were
 * ripped off, painted-over brush strokes, and drips running down from the top.
 * One <g> per zone, in that zone's local coordinates.
 */
export function WallDecor({ zoneCount }: { zoneCount: number }) {
  return (
    <svg
      aria-hidden="true"
      width={ZONE_W * zoneCount}
      height={STAGE_H}
      style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
    >
      {/* 01 me */}
      <g>
        <g filter="url(#brush)" opacity=".55">
          <rect x="300" y="30" width="250" height="330" fill="#707070" />
          <rect x="760" y="470" width="300" height="210" fill="#6a6a6a" />
          <rect x="1180" y="520" width="180" height="240" fill="#707070" />
        </g>
        <g filter="url(#brush)" fill="none" strokeLinecap="round">
          <path d="M30 880 L560 780" stroke="#3d3d3d" strokeWidth="44" opacity=".75" />
          <path d="M960 70 L1400 20" stroke="#6c6c6c" strokeWidth="28" opacity=".6" />
          <ellipse cx="720" cy="-30" rx="460" ry="150" fill="#333333" stroke="none" opacity=".5" />
        </g>
        <Drips xs={[380, 392, 640, 905, 1110]} />
      </g>

      {/* 02 work */}
      <g transform={`translate(${ZONE_W} 0)`}>
        <g filter="url(#brush)" opacity=".55">
          <rect x="500" y="440" width="320" height="300" fill="#707070" />
          <rect x="1180" y="40" width="220" height="160" fill="#6a6a6a" />
        </g>
        <g filter="url(#brush)" fill="none" strokeLinecap="round">
          <path d="M1100 870 L1430 760" stroke="#3d3d3d" strokeWidth="40" opacity=".75" />
          <path d="M20 30 L380 10" stroke="#6c6c6c" strokeWidth="26" opacity=".6" />
          <ellipse cx="900" cy="-30" rx="420" ry="140" fill="#333333" stroke="none" opacity=".5" />
        </g>
        <Drips xs={[520, 830, 842, 1180]} />
      </g>

      {/* 03 taste */}
      <g transform={`translate(${ZONE_W * 2} 0)`}>
        <g filter="url(#brush)" opacity=".55">
          <rect x="380" y="560" width="300" height="200" fill="#707070" />
          <rect x="1120" y="400" width="260" height="320" fill="#6a6a6a" />
        </g>
        <g filter="url(#brush)" fill="none" strokeLinecap="round">
          <path d="M700 880 L1300 800" stroke="#3d3d3d" strokeWidth="40" opacity=".75" />
          <path d="M330 20 L760 50" stroke="#6c6c6c" strokeWidth="24" opacity=".6" />
          <ellipse cx="500" cy="-30" rx="440" ry="140" fill="#333333" stroke="none" opacity=".5" />
        </g>
        <Drips xs={[395, 735, 1115, 1400]} />
      </g>

      {/* 04 guest wall */}
      <g transform={`translate(${ZONE_W * 3} 0)`}>
        <g filter="url(#brush)" opacity=".55">
          <rect x="40" y="440" width="260" height="300" fill="#707070" />
          <rect x="600" y="80" width="300" height="130" fill="#6a6a6a" />
        </g>
        <g filter="url(#brush)" fill="none" strokeLinecap="round">
          <path d="M20 860 L520 800" stroke="#3d3d3d" strokeWidth="40" opacity=".75" />
          <ellipse cx="420" cy="-30" rx="460" ry="140" fill="#333333" stroke="none" opacity=".5" />
        </g>
        <Drips xs={[250, 560, 900]} />
      </g>
    </svg>
  );
}

function Drips({ xs }: { xs: number[] }) {
  return (
    <g filter="url(#rough)" opacity=".4" stroke="#2f2f2f" fill="none" strokeLinecap="round">
      {xs.map((x, i) => (
        <path key={x} d={`M${x} 0 V${90 + ((x * 7 + i * 53) % 150)}`} strokeWidth={4 + ((x + i) % 6)} />
      ))}
    </g>
  );
}
