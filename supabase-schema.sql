create table if not exists public.world_players (
  player_id text primary key,
  commander text not null,
  faction text not null default 'none',
  council text,
  council_code text,
  power int not null default 0,
  intel int not null default 0,
  influence int not null default 0,
  city_tier int not null default 1,
  season_number int not null default 1,
  updated_at timestamptz not null default now()
);

create table if not exists public.world_actions (
  id bigint generated always as identity primary key,
  player_id text not null,
  commander text not null,
  action_type text not null,
  summary text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.world_councils (
  council_code text primary key,
  council_name text not null,
  leader_id text not null,
  treasury int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.world_council_members (
  council_code text not null references public.world_councils(council_code) on delete cascade,
  player_id text not null,
  commander text not null,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (council_code, player_id)
);

create table if not exists public.world_season_archive (
  id bigint generated always as identity primary key,
  season_number int not null,
  rank_position int not null,
  commander text not null,
  power int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.world_players add column if not exists council_code text;
alter table public.world_players add column if not exists city_tier int not null default 1;
alter table public.world_players add column if not exists season_number int not null default 1;
alter table public.world_councils add column if not exists treasury int not null default 0;

alter table public.world_players enable row level security;
alter table public.world_actions enable row level security;
alter table public.world_councils enable row level security;
alter table public.world_council_members enable row level security;
alter table public.world_season_archive enable row level security;

drop policy if exists "world players read" on public.world_players;
drop policy if exists "world players write" on public.world_players;
drop policy if exists "world actions read" on public.world_actions;
drop policy if exists "world actions write" on public.world_actions;
drop policy if exists "world councils read" on public.world_councils;
drop policy if exists "world councils write" on public.world_councils;
drop policy if exists "world council members read" on public.world_council_members;
drop policy if exists "world council members write" on public.world_council_members;
drop policy if exists "world council members update" on public.world_council_members;
drop policy if exists "world season archive read" on public.world_season_archive;
drop policy if exists "world season archive write" on public.world_season_archive;

create policy "world players read" on public.world_players for select to anon using (true);
create policy "world players write" on public.world_players for insert to anon with check (true);
create policy "world players update" on public.world_players for update to anon using (true) with check (true);

create policy "world actions read" on public.world_actions for select to anon using (true);
create policy "world actions write" on public.world_actions for insert to anon with check (true);

create policy "world councils read" on public.world_councils for select to anon using (true);
create policy "world councils write" on public.world_councils for insert to anon with check (true);
create policy "world councils update" on public.world_councils for update to anon using (true) with check (true);

create policy "world council members read" on public.world_council_members for select to anon using (true);
create policy "world council members write" on public.world_council_members for insert to anon with check (true);
create policy "world council members update" on public.world_council_members for update to anon using (true) with check (true);

create policy "world season archive read" on public.world_season_archive for select to anon using (true);
create policy "world season archive write" on public.world_season_archive for insert to anon with check (true);

alter publication supabase_realtime add table public.world_actions;
