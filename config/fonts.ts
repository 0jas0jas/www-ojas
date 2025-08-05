import { Roboto as FontMono } from "next/font/google";
import localFont from "next/font/local";

export const fontSans = localFont({
  src: [
    {
      path: "../public/fonts/BluuNext-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/BluuNext-Bolditalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});
