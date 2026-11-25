# Supabase setup

## 1. Create a project

Create a Supabase project, then copy **Project URL** and **anon/public key** into a local `.env` file:

```env
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

`.env` is gitignored. Never add a `service_role` key or an AI provider token to this app.

## 2. Apply the migration

Run `supabase/migrations/0001_supabase_backend.sql` in the Supabase SQL editor, or with the CLI:

```bash
npx supabase db push
```

Wait for the `Database password` prompt if using the CLI. The migration creates:

- `public.profiles` — one row per auth user, created by a trigger on signup
- `public.plant_scans` — scan records with `user_id` referencing `auth.users`
- RLS policies that restrict every row to its owner
- private Storage bucket `leaf-images` with owner-path policies

## 3. Enable email auth

In **Authentication → Providers**, keep Email enabled. For local testing you may disable email confirmation; otherwise signup returns a confirmation notice before the user can enter the app.

## 4. Verify RLS

Use the Supabase SQL editor with a non-service role:

```sql
select * from public.plant_scans; -- only your own rows
select * from public.profiles;    -- only your own row
```

Attempting to insert a scan with another user's `user_id` must fail.

## Storage path contract

Leaf images are uploaded to:

```
leaf-images/<user-id>/<scan-id>.jpg
```

The client keeps that path in `plant_scans.image_path`. Signed URLs are required to read images because the bucket is private. The bucket accepts JPEG, PNG and WebP images up to 10 MB; the app enforces the same limits (see `src/config/upload.js`) before uploading.

## AI boundary

This milestone stores **pending scans only** when a user saves a photo. No disease label or confidence is generated. Real inference will be added later with a server-side provider.
