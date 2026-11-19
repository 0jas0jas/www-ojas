/** Shared between the guest wall UI and the API. */

export const NOTE_COLORS = [
  { name: "Yellow sticky", hex: "#F7E26B" },
  { name: "Pink sticky", hex: "#F2B8C6" },
  { name: "Blue sticky", hex: "#9FD3E8" },
  { name: "Green sticky", hex: "#B9E28C" },
] as const;

export const GUEST_KINDS = ["note", "doodle", "photo"] as const;
export type GuestKind = (typeof GUEST_KINDS)[number];

export const LIMITS = {
  text: 200,
  name: 30,
  caption: 60,
  /** after client-side compression */
  imageBytes: 3 * 1024 * 1024,
  postsPerHour: 5,
  /** the area of the guest zone posts can be placed in (zone-local design px) */
  area: { minX: 20, maxX: 880, minY: 210, maxY: 760 },
} as const;

export type GuestPost = {
  id: string;
  kind: GuestKind;
  text: string | null;
  name: string | null;
  caption: string | null;
  color: string | null;
  x: number;
  y: number;
  rotate: number;
  image_url: string | null;
  created_at: string;
  hidden?: boolean;
};
