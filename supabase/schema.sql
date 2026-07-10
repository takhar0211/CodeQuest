-- CodeQuest schema. Paste into the Supabase SQL editor and run once.
-- Safe to re-run: every statement uses IF NOT EXISTS / OR REPLACE.

-- =========================================================================
-- profiles: one row per auth.users user, holds the in-game persona + totals.
-- =========================================================================
create table if not exists public.profiles (
  id                      uuid primary key references auth.users(id) on delete cascade,
  email                   text,
  display_name            text not null default 'Chieftain',
  known_lang              text,
  target_lang             text,
  skill_level             text not null default 'beginner'
                          check (skill_level in ('beginner','intermediate','advanced')),
  xp                      int  not null default 0,
  streak_days             int  not null default 0,
  last_active_date        date,
  total_seconds_learned   int  not null default 0,
  unlocked_achievements   text[] not null default '{}',
  weak_topics             text[] not null default '{}',
  onboarded               boolean not null default false,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

-- =========================================================================
-- module_progress: per-user, per-module state.
-- =========================================================================
create table if not exists public.module_progress (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references auth.users(id) on delete cascade,
  module_id             text not null,
  completed_lesson_ids  text[] not null default '{}',
  quiz_best_score       real not null default 0,
  completed             boolean not null default false,
  updated_at            timestamptz not null default now(),
  unique (user_id, module_id)
);
create index if not exists module_progress_user_id_idx
  on public.module_progress(user_id);

-- =========================================================================
-- quiz_history: one row per attempted quiz, for accuracy/weak-topic stats.
-- =========================================================================
create table if not exists public.quiz_history (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  module_id   text,
  taken_on    date not null default current_date,
  correct     int not null,
  total       int not null,
  created_at  timestamptz not null default now()
);
create index if not exists quiz_history_user_id_idx
  on public.quiz_history(user_id, taken_on);

-- =========================================================================
-- Touch updated_at on row updates.
-- =========================================================================
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch
  before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists module_progress_touch on public.module_progress;
create trigger module_progress_touch
  before update on public.module_progress
  for each row execute function public.touch_updated_at();

-- =========================================================================
-- Auto-create a profile row when a new auth user signs up.
-- =========================================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', 'Chieftain'))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================================
-- Row Level Security. Users see only their own rows.
-- =========================================================================
alter table public.profiles         enable row level security;
alter table public.module_progress  enable row level security;
alter table public.quiz_history     enable row level security;

drop policy if exists "profiles_self_select" on public.profiles;
create policy "profiles_self_select" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_self_upsert" on public.profiles;
create policy "profiles_self_upsert" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles_self_update" on public.profiles;
create policy "profiles_self_update" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "module_progress_self_all" on public.module_progress;
create policy "module_progress_self_all" on public.module_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "quiz_history_self_all" on public.quiz_history;
create policy "quiz_history_self_all" on public.quiz_history
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =========================================================================
-- Public leaderboard view (top XP, names only).
-- =========================================================================
create or replace view public.leaderboard as
select display_name, xp, streak_days
from public.profiles
where onboarded = true
order by xp desc
limit 100;
