import { NextResponse, type NextRequest } from "next/server";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

/** Dev-only: the wall's edit mode (?edit=1) saves piece positions here. */
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") return new NextResponse(null, { status: 404 });
  const layout = (await req.json()) as Record<string, { x: number; y: number; r: number }>;
  const valid =
    layout &&
    typeof layout === "object" &&
    Object.values(layout).every((p) => [p?.x, p?.y, p?.r].every((n) => typeof n === "number" && Number.isFinite(n)));
  if (!valid) return NextResponse.json({ error: "bad layout" }, { status: 400 });
  const body = "{\n" + Object.entries(layout).map(([id, p]) => `  ${JSON.stringify(id)}: { "x": ${p.x}, "y": ${p.y}, "r": ${p.r} }`).join(",\n") + "\n}\n";
  await writeFile(path.join(process.cwd(), "content", "layout.json"), body);
  return NextResponse.json({ ok: true });
}
