import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const GUEST_BUCKET = "guest";

let client: SupabaseClient | null | undefined;

/** Server-side Supabase client (service role). null when the guest wall isn't configured. */
export function supabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return client;
}

export function publicImageUrl(path: string | null): string | null {
  if (!path) return null;
  return supabase()?.storage.from(GUEST_BUCKET).getPublicUrl(path).data.publicUrl ?? null;
}
