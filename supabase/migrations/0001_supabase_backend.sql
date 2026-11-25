-- Flora Chaos backend foundation: profiles, user-owned scans, RLS and storage.
-- Run this in the Supabase SQL editor (or `supabase db push`) before using live mode.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.plant_scans (
  id uuid primary key default gen_random_uuid(),
  -- The default binds every insert to the calling user; RLS also enforces it.
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  image_path text,
  crop text,
  status text not null default 'pending'
    check (status in ('pending', 'detected', 'healthy', 'failed')),
  disease_name text,
  disease_slug text,
  confidence numeric(4, 3) check (confidence is null or (confidence >= 0 and confidence <= 1)),
  severity text,
  provider text,
  model_version text,
  needs_review boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists plant_scans_user_created_idx
  on public.plant_scans (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Timestamps and profile bootstrap
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists plant_scans_set_updated_at on public.plant_scans;
create trigger plant_scans_set_updated_at
before update on public.plant_scans
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    nullif(coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)), ''),
    nullif(new.raw_user_meta_data ->> 'avatar_url', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.plant_scans enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select to authenticated
using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles for insert to authenticated
with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles for update to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can read own scans" on public.plant_scans;
create policy "Users can read own scans"
on public.plant_scans for select to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own scans" on public.plant_scans;
create policy "Users can insert own scans"
on public.plant_scans for insert to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own scans" on public.plant_scans;
create policy "Users can update own scans"
on public.plant_scans for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own scans" on public.plant_scans;
create policy "Users can delete own scans"
on public.plant_scans for delete to authenticated
using (auth.uid() = user_id);

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.profiles, public.plant_scans to authenticated;

-- ---------------------------------------------------------------------------
-- Private Storage bucket for leaf images
-- Objects must be stored as: <auth.uid()>/<scan-id>.jpg
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'leaf-images',
  'leaf-images',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Users can upload own leaf images" on storage.objects;
create policy "Users can upload own leaf images"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'leaf-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can read own leaf images" on storage.objects;
create policy "Users can read own leaf images"
on storage.objects for select to authenticated
using (
  bucket_id = 'leaf-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can delete own leaf images" on storage.objects;
create policy "Users can delete own leaf images"
on storage.objects for delete to authenticated
using (
  bucket_id = 'leaf-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);
