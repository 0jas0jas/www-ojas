import { Wall } from "@/components/wall/Wall";
import { WallDecor } from "@/components/wall/WallDecor";
import { Grime, WallFilters } from "@/components/wall/Grime";
import { items } from "@/content/wall";
import { zones } from "@/content/zones";
import layout from "@/content/layout.json";
import type { Layout } from "@/content/types";

export default function Home() {
  const links = items.filter((i) => i.href && i.label && !i.href.startsWith("#"));

  return (
    <>
      <h1 className="sr-only">Ojas: a wall of stuff</h1>
      {/* the same links as plain HTML, for screen readers and search engines */}
      <nav className="sr-only" aria-label="Everything on the wall">
        <ul>
          {links.map((i) => (
            <li key={i.id}>
              <a href={i.href}>{i.label}</a>
            </li>
          ))}
          <li>
            <a href="#zone-guest">Leave something on the guest wall</a>
          </li>
        </ul>
      </nav>

      <WallFilters />
      <Wall items={items} initialLayout={layout as Layout} decor={<WallDecor zoneCount={zones.length} />} />
      <Grime />
    </>
  );
}
