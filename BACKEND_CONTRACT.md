# Backend Contract (Frozen)

This project uses a frozen backend contract for stability. Do not introduce ad-hoc SQL in chat snippets.

## Canonical schema source

- `supabase-schema.sql` is the single source of truth.
- Any schema or policy change must be added there first.

## Required tables

- `public.world_players`
- `public.world_actions`
- `public.world_councils`
- `public.world_council_members`
- `public.world_season_archive`
- `public.world_war_targets`

## Required access model

- RLS enabled on all tables above.
- Policies are created idempotently (drop if exists + create).
- Realtime subscription uses `public.world_actions`.

## Change process

1. Update `supabase-schema.sql`.
2. Run migration in Supabase SQL Editor.
3. Verify REST endpoints return `200`.
4. Verify app smoke checklist before pushing.

## Do not

- Do not run one-off SQL fixes that are not represented in `supabase-schema.sql`.
- Do not create duplicate policy names without dropping existing policies first.
