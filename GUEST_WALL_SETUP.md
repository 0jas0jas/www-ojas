# Guest wall setup

The guest wall (the last zone of the homepage) lets visitors stick notes, doodles and photos on the wall. Posts go live immediately; you moderate afterwards at `/admin`.

Without the env vars below the site still works: the guest wall shows no posts and says it isn't set up yet when someone tries to post.

## 1. Supabase (database + image storage)

1. Use an existing Supabase project or create a free one at https://supabase.com.
2. Open **SQL Editor**, paste `supabase/schema.sql`, run it. It only adds a `guest_posts` table and a public `guest` storage bucket; it never drops or changes anything else.
3. From **Project Settings → API** copy:
   - Project URL → `SUPABASE_URL`
   - `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY` (server only; never expose it in a `NEXT_PUBLIC_` variable)

## 2. The rest

- `IP_HASH_SALT`: any long random string (`openssl rand -hex 32`). Visitor IPs are only stored as salted hashes, for the 5-posts-per-hour limit. Don't change it once set.
- `ADMIN_PASSWORD`: the password for `/admin`.

Put all of these in `.env.local` for local dev and in Vercel → Settings → Environment Variables for production, then redeploy.

## Moderating

Go to `/admin`, log in, and **hide** (reversible) or **delete** (removes the image too) anything you don't want up.

What's in place to keep things sane: a hidden honeypot field that catches simple bots, 5 posts per hour per visitor, a profanity filter on all text, image type/size limits (photos are shrunk to ≤1200px in the browser before upload). There's no captcha, so a determined bot can still get through the hourly limit from many IPs. Photos are not checked automatically, so look at `/admin` regularly. You're responsible for taking down anything illegal quickly.
