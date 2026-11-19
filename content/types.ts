import type { CSSProperties, ReactNode } from "react";

export type WallItem = {
  /** Unique id; also the key into content/layout.json. */
  id: string;
  /** Plain-text name for screen readers and the hidden link index. */
  label?: string;
  /** Makes the whole piece a link. "#zone-<id>" scrolls the wall instead. */
  href?: string;
  w?: number;
  h?: number;
  className?: string;
  style?: CSSProperties;
  /** No shadow / rough edges (writing on the wall, the guest area). */
  flat?: boolean;
  /** Can't be dragged in edit mode. */
  locked?: boolean;
  content: ReactNode;
};

export type Placement = { x: number; y: number; r: number };
export type Layout = Record<string, Placement>;
