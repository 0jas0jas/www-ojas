import Link from "next/link";

import { Grime, WallFilters } from "@/components/wall/Grime";
import { siteConfig } from "@/config/site";

/** Frame for the regular (vertically scrolling) pages: same wall, same grime, a torn-paper nav strip. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="plaster relative min-h-screen" style={{ backgroundAttachment: "fixed" }}>
      <WallFilters />
      <header className="relative z-10 px-4 pt-5 sm:px-8">
        <nav
          aria-label="Site"
          className="mx-auto flex max-w-5xl -rotate-[0.15deg] flex-wrap items-center gap-x-6 gap-y-2 bg-[var(--paper)] px-5 py-3 text-[var(--ink)] shadow-[0_8px_16px_rgba(0,0,0,.5)]"
          style={{ filter: "url(#rough)" }}
        >
          <Link href="/" className="anton text-2xl hover:text-[var(--red)]">
            ← back to the wall
          </Link>
          <div className="flex-1" />
          {siteConfig.navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm underline-offset-4 hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="relative mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-8">{children}</main>
      <Grime />
    </div>
  );
}
