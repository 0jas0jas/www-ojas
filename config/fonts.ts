import { Anton, Permanent_Marker, Special_Elite } from "next/font/google";

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
