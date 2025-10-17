import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Ojas's resume",
};

export default function ResumePage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/resume.pdf"
        className="w-full h-full border-0"
        title="Resume"
      />
    </div>
  );
}
