/** The wall is drawn at a fixed design size and scaled to the viewport height. */
export const STAGE_H = 900;
export const ZONE_W = 1440;

export const zones = [
  { id: "me", label: "me" },
  { id: "work", label: "work" },
  { id: "taste", label: "taste" },
  { id: "guest", label: "guest wall" },
] as const;

export type ZoneId = (typeof zones)[number]["id"];

export const STAGE_W = ZONE_W * zones.length;

/**
 * How much pieces lean: 1 = the angles in content/layout.json, 0 = perfectly straight.
 * Keep in sync with --tilt in styles/globals.css (used by pages without motion).
 */
export const TILT = 0.25;

/** Left edge of a zone in design px. */
export const zoneX = (id: ZoneId) => zones.findIndex((z) => z.id === id) * ZONE_W;
