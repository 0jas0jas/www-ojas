import type { Metadata } from "next";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "things i've made",
  description: "Projects by Ojas: apps, games, ML experiments and workshops.",
};

const tilts = [-2, 1.5, -1, 2.5, -2.5, 1, -1.5, 2];
const papers = ["var(--paper)", "var(--paper-white)", "var(--kraft)", "var(--paper)", "#F2D7C9"];

export default function ProjectsPage() {
  return (
    <>
      <div className="-rotate-[0.5deg]">
        <h1 className="anton text-6xl leading-none text-[var(--paper)] sm:text-8xl">things i&apos;ve made</h1>
        <p className="marker mt-2 text-xl text-[var(--orange)]">{projects.length} flyers. click one to see the code.</p>
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <li key={p.url}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="piece piece-hover relative flex h-full flex-col gap-3 p-6 pt-8"
              style={{ position: "relative", background: papers[i % papers.length], ["--r" as string]: `${tilts[i % tilts.length]}deg` }}
            >
              <span className="tape" />
              <div className="flex items-baseline justify-between gap-3 text-xs tracking-[.2em]">
                <span>NO. {String(i + 1).padStart(2, "0")}</span>
                <span>{p.monthYear.toUpperCase()}</span>
              </div>
              <h2 className="anton text-4xl leading-[.95]">{p.projectName}</h2>
              <p className="border-t-2 border-[var(--ink)] pt-2 text-sm">{p.skills}</p>
              <p className="text-[15px] leading-relaxed">{p.desc}</p>
              <span className="anton mt-auto pt-2 text-xl text-[var(--red)]">see the code ↗</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
