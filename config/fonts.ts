import { Anton, IM_Fell_English, IM_Fell_English_SC, Permanent_Marker, Special_Elite } from "next/font/google";

export const fontAnton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const fontMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marker",
  display: "swap",
});

export const fontElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-elite",
  display: "swap",
});

/* The guest wall notice board (components/wall/board). */
export const fontFell = IM_Fell_English({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-fell",
  display: "swap",
});

export const fontFellSC = IM_Fell_English_SC({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fell-sc",
  display: "swap",
});
