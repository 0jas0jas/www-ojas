import { NextResponse, type NextRequest } from "next/server";
import { createHash, randomUUID } from "node:crypto";
import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from "obscenity";

import { GUEST_BUCKET, publicImageUrl, supabase } from "@/lib/supabase";
import { GUEST_KINDS, LIMITS, NOTE_COLORS, type GuestKind, type GuestPost } from "@/lib/guest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const matcher = new RegExpMatcher({ ...englishDataset.build(), ...englishRecommendedTransformers });
const IMAGE_TYPES: Record<string, string> = { "image/webp": "webp", "image/png": "png", "image/jpeg": "jpg" };

type Row = Omit<GuestPost, "image_url"> & { image_path: string | null };

const toPost = (r: Row): GuestPost => ({
  id: r.id,
  kind: r.kind,
  text: r.text,
  name: r.name,
  caption: r.caption,
  color: r.color,
  x: r.x,
  y: r.y,
  rotate: r.rotate,
  created_at: r.created_at,
  image_url: publicImageUrl(r.image_path),
});

const fail = (status: number, error: string) => NextResponse.json({ error }, { status });

export async function GET() {
  const db = supabase();
  if (!db) return NextResponse.json({ posts: [] });
  const { data, error } = await db
    .from("guest_posts")
    .select("id, kind, text, name, caption, color, x, y, rotate, image_path, created_at")
    .eq("hidden", false)
    .order("created_at", { ascending: false })
    .limit(80);
  if (error) return fail(500, "couldn't load the wall");
  return NextResponse.json({ posts: (data as Row[]).map(toPost) });
}

const str = (v: FormDataEntryValue | null, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export async function POST(req: NextRequest) {
  const db = supabase();
  if (!db) return fail(503, "the guest wall isn't set up yet");

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail(400, "bad request");
  }

  const kind = form.get("kind") as GuestKind;
  if (!GUEST_KINDS.includes(kind)) return fail(400, "bad request");

  // honeypot field: hidden in the form, so only bots fill it in
  if (str(form.get("website"), 200)) return fail(400, "bad request");

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip");

  const text = str(form.get("text"), LIMITS.text);
  const name = str(form.get("name"), LIMITS.name);
  const caption = str(form.get("caption"), LIMITS.caption);
  const colorIn = str(form.get("color"), 16);
  const color = NOTE_COLORS.some((c) => c.hex === colorIn) ? colorIn : NOTE_COLORS[0].hex;
  const { minX, maxX, minY, maxY } = LIMITS.area;
  const x = clamp(Math.round(Number(form.get("x")) || 600), minX, maxX - 200);
  const y = clamp(Math.round(Number(form.get("y")) || 520), minY, maxY - 180);

  if (kind === "note" && !text) return fail(400, "write something first");
  if ([text, name, caption].some((s) => s && matcher.hasMatch(s))) return fail(400, "keep it (a little) cleaner");

  // rate limit per hashed IP
  const ipHash = createHash("sha256")
    .update(`${ip ?? "unknown"}:${process.env.IP_HASH_SALT ?? ""}`)
    .digest("hex");
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await db.from("guest_posts").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", since);
  if ((count ?? 0) >= LIMITS.postsPerHour) return fail(429, "that's a lot of posts, come back in an hour");

  let imagePath: string | null = null;
  if (kind !== "note") {
    const file = form.get("file");
    if (!(file instanceof Blob) || file.size === 0) return fail(400, kind === "photo" ? "pick a photo first" : "draw something first");
    const ext = IMAGE_TYPES[file.type];
    if (!ext) return fail(400, "that file type isn't allowed");
    if (file.size > LIMITS.imageBytes) return fail(400, "that image is too big");
    imagePath = `${kind}/${randomUUID()}.${ext}`;
    const { error } = await db.storage.from(GUEST_BUCKET).upload(imagePath, file, { contentType: file.type, upsert: false });
    if (error) return fail(500, "couldn't upload that image");
  }

  const row = {
    kind,
    text: kind === "note" ? text : null,
    name: name || null,
    caption: kind === "photo" ? caption || null : null,
    color: kind === "photo" ? null : color,
    x,
    y,
    rotate: Math.round((Math.random() * 14 - 7) * 10) / 10,
    image_path: imagePath,
    ip_hash: ipHash,
  };
  const { data, error } = await db
    .from("guest_posts")
    .insert(row)
    .select("id, kind, text, name, caption, color, x, y, rotate, image_path, created_at")
    .single();
  if (error || !data) {
    if (imagePath) await db.storage.from(GUEST_BUCKET).remove([imagePath]);
    return fail(500, "couldn't save that, try again");
  }
  return NextResponse.json({ post: toPost(data as Row) }, { status: 201 });
}
