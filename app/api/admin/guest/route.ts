import { NextResponse, type NextRequest } from "next/server";

import { isAdmin } from "@/lib/admin";
import { GUEST_BUCKET, publicImageUrl, supabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const deny = () => NextResponse.json({ error: "unauthorized" }, { status: 401 });
const notSetUp = () => NextResponse.json({ error: "the guest wall isn't set up yet" }, { status: 503 });

/** Every post, hidden ones included, newest first. */
export async function GET() {
  if (!(await isAdmin())) return deny();
  const db = supabase();
  if (!db) return notSetUp();
  const { data, error } = await db
    .from("guest_posts")
    .select("id, kind, text, name, caption, color, x, y, rotate, image_path, created_at, hidden")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data.map((r) => ({ ...r, image_url: publicImageUrl(r.image_path) })) });
}

/** Hide / unhide: { id, hidden } */
export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) return deny();
  const db = supabase();
  if (!db) return notSetUp();
  const { id, hidden } = (await req.json().catch(() => ({}))) as { id?: string; hidden?: boolean };
  if (!id || typeof hidden !== "boolean") return NextResponse.json({ error: "bad request" }, { status: 400 });
  const { error } = await db.from("guest_posts").update({ hidden }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

/** Delete for good, image included: ?id= */
export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) return deny();
  const db = supabase();
  if (!db) return notSetUp();
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "bad request" }, { status: 400 });
  const { data } = await db.from("guest_posts").select("image_path").eq("id", id).single();
  if (data?.image_path) await db.storage.from(GUEST_BUCKET).remove([data.image_path]);
  const { error } = await db.from("guest_posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
