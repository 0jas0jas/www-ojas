import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "wall_admin";

/** Session value derived from the password, so changing ADMIN_PASSWORD logs everyone out. */
export function adminToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHmac("sha256", pw).update("wall-admin-session").digest("hex");
}

export function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export async function isAdmin(): Promise<boolean> {
  const expected = adminToken();
  const got = (await cookies()).get(ADMIN_COOKIE)?.value;
  return !!expected && !!got && safeEqual(got, expected);
}
