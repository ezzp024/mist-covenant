create table if not exists public.world_players (
  player_id text primary key,
  commander text not null,
  faction text not null default 'none',
  council text,
  power int not null default 0,
  intel int not null default 0,
  influence int not null default 0,
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
  created_at timestamptz not null default now()
);

alter table public.world_players enable row level security;
alter table public.world_actions enable row level security;
alter table public.world_councils enable row level security;

drop policy if exists "world players read" on public.world_players;
drop policy if exists "world players write" on public.world_players;
drop policy if exists "world actions read" on public.world_actions;
drop policy if exists "world actions write" on public.world_actions;
drop policy if exists "world councils read" on public.world_councils;
drop policy if exists "world councils write" on public.world_councils;

create policy "world players read" on public.world_players for select to anon using (true);
create policy "world players write" on public.world_players for insert to anon with check (true);
create policy "world players update" on public.world_players for update to anon using (true) with check (true);

create policy "world actions read" on public.world_actions for select to anon using (true);
create policy "world actions write" on public.world_actions for insert to anon with check (true);

create policy "world councils read" on public.world_councils for select to anon using (true);
create policy "world councils write" on public.world_councils for insert to anon with check (true);

alter publication supabase_realtime add table public.world_actions;
