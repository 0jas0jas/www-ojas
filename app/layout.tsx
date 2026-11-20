import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { fontAnton, fontElite, fontFell, fontFellSC, fontMarker } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#3a3a3a",
};

// Sets the wall's scale before first paint so it never flashes at the wrong size.
// Keep in sync with wallScale() in components/wall/Wall.tsx.
const scaleScript = `(function(){var w=window.innerWidth,s=window.innerHeight/900;if(w<640)s=Math.min(s,w/560);document.documentElement.style.setProperty('--s',String(s));})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx(fontAnton.variable, fontMarker.variable, fontElite.variable, fontFell.variable, fontFellSC.variable)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scaleScript }} />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
