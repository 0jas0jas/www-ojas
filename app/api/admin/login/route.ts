import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, adminToken, safeEqual } from "@/lib/admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const token = adminToken();
  if (!token) return NextResponse.json({ error: "ADMIN_PASSWORD isn't set" }, { status: 503 });
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  if (typeof password !== "string" || !safeEqual(password, process.env.ADMIN_PASSWORD ?? "")) {
    return NextResponse.json({ error: "nope" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
