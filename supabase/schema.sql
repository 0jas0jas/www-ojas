-- Guest wall storage. Run once in the Supabase SQL editor.
-- The site talks to Supabase only from the server with the service role key,
-- so row level security is on with no public policies: nobody can read or
-- write the table directly from a browser.

create table if not exists public.guest_posts (
  id          uuid primary key default gen_random_uuid(),
  kind        text not null check (kind in ('note', 'doodle', 'photo')),
  text        text check (char_length(text) <= 200),
  name        text check (char_length(name) <= 30),
  caption     text check (char_length(caption) <= 60),
  color       text,
  x           integer not null,
  y           integer not null,
  rotate      real not null default 0,
  image_path  text,
  ip_hash     text not null,
  hidden      boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists guest_posts_visible_idx on public.guest_posts (hidden, created_at desc);
create index if not exists guest_posts_ratelimit_idx on public.guest_posts (ip_hash, created_at desc);

alter table public.guest_posts enable row level security;

-- Public bucket for doodles and photos (read-only to the world; uploads go through the API).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('guest', 'guest', true, 3145728, array['image/webp', 'image/png', 'image/jpeg'])
on conflict (id) do nothing;
