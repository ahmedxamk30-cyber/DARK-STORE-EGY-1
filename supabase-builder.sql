-- DARK STORE VISUAL BUILDER

alter table public.profiles
drop constraint if exists profiles_role_check;

alter table public.profiles
add constraint profiles_role_check
check (role in ('user','admin','owner'));

create or replace function public.is_owner()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'owner'
  );
$$;

create or replace function public.is_admin_or_owner()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin','owner')
  );
$$;

create table if not exists public.site_settings (
  id uuid primary key default uuid_generate_v4(),
  site_name text not null default 'DARK STORE',
  logo_url text,
  primary_color text not null default '#facc15',
  secondary_color text not null default '#22d3ee',
  background_color text not null default '#050505',
  whatsapp text,
  description text,
  updated_at timestamptz default now()
);

create table if not exists public.site_pages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  published boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.site_sections (
  id uuid primary key default uuid_generate_v4(),
  page_id uuid references public.site_pages(id) on delete cascade,
  section_type text not null,
  title text,
  content jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.media_library (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  url text not null,
  type text,
  created_at timestamptz default now()
);

alter table public.site_settings enable row level security;
alter table public.site_pages enable row level security;
alter table public.site_sections enable row level security;
alter table public.media_library enable row level security;

drop policy if exists "Public site settings" on public.site_settings;
create policy "Public site settings"
on public.site_settings
for select
using (true);

drop policy if exists "Owner manages settings" on public.site_settings;
create policy "Owner manages settings"
on public.site_settings
for all
using (public.is_owner())
with check (public.is_owner());

drop policy if exists "Public published pages" on public.site_pages;
create policy "Public published pages"
on public.site_pages
for select
using (published = true or public.is_admin_or_owner());

drop policy if exists "Owner manages pages" on public.site_pages;
create policy "Owner manages pages"
on public.site_pages
for all
using (public.is_owner())
with check (public.is_owner());

drop policy if exists "Public visible sections" on public.site_sections;
create policy "Public visible sections"
on public.site_sections
for select
using (
  visible = true
  or public.is_admin_or_owner()
);

drop policy if exists "Owner manages sections" on public.site_sections;
create policy "Owner manages sections"
on public.site_sections
for all
using (public.is_owner())
with check (public.is_owner());

drop policy if exists "Owner manages media" on public.media_library;
create policy "Owner manages media"
on public.media_library
for all
using (public.is_owner())
with check (public.is_owner());

insert into public.site_settings
(site_name, primary_color, secondary_color, background_color)
select 'DARK STORE', '#facc15', '#22d3ee', '#050505'
where not exists (select 1 from public.site_settings);

insert into public.site_pages (name, slug)
select 'الرئيسية', 'home'
where not exists (
  select 1 from public.site_pages where slug = 'home'
);

insert into public.site_sections
(page_id, section_type, title, content, sort_order, visible)
select
  p.id,
  'hero',
  'الرئيسية',
  '{"headline":"DARK STORE","subheadline":"متجرك الرقمي للألعاب والخدمات","buttonText":"ابدأ الآن"}'::jsonb,
  0,
  true
from public.site_pages p
where p.slug = 'home'
and not exists (
  select 1
  from public.site_sections s
  where s.page_id = p.id
);

insert into public.site_sections
(page_id, section_type, title, content, sort_order, visible)
select
  p.id,
  'games',
  'الألعاب',
  '{"description":"شحن الألعاب والخدمات الرقمية"}'::jsonb,
  1,
  true
from public.site_pages p
where p.slug = 'home'
and not exists (
  select 1
  from public.site_sections s
  where s.page_id = p.id
  and s.section_type = 'games'
);

insert into public.site_sections
(page_id, section_type, title, content, sort_order, visible)
select
  p.id,
  'offers',
  'العروض',
  '{"description":"أقوى عروض DARK STORE"}'::jsonb,
  2,
  true
from public.site_pages p
where p.slug = 'home'
and not exists (
  select 1
  from public.site_sections s
  where s.page_id = p.id
  and s.section_type = 'offers'
);
