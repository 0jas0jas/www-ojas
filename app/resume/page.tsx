import { Metadata } from "next";

export const metadata: Metadata = {
  title: "resume",
  description: "Ojas's resume",
};

export default function ResumePage() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="anton -rotate-[0.5deg] text-6xl leading-none text-[var(--paper)] sm:text-8xl">resume</h1>
        <a
          href="/resume.pdf"
          download
          className="anton rotate-[0.5deg] border-4 border-[var(--paper)] bg-[var(--ink)] px-5 py-3 text-2xl text-[var(--orange)] shadow-[0_8px_16px_rgba(0,0,0,.5)] hover:-translate-y-1"
        >
          download the pdf ↓
        </a>
      </div>
      <div className="relative mt-10 rotate-[0.15deg] bg-[var(--paper-white)] p-2 shadow-[0_14px_28px_rgba(0,0,0,.6)] sm:p-3">
        <span className="staple" style={{ left: 30, top: 8, transform: "rotate(-30deg)" }} />
        <span className="staple" style={{ right: 30, top: 8, transform: "rotate(30deg)" }} />
        <iframe src="/resume.pdf" className="block h-[80vh] w-full border-0" title="Ojas's resume (PDF)" />
      </div>
    </>
  );
}
