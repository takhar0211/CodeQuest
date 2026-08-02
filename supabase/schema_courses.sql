-- CodeQuest Courses Schema. Paste into the Supabase SQL editor and run once.

-- =========================================================================
-- courses: Top-level language mapping (e.g. C++ to Python)
-- =========================================================================
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  known_lang text not null,
  target_lang text not null,
  title text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(known_lang, target_lang)
);

-- =========================================================================
-- modules: Course sections (e.g. Variables, Loops)
-- =========================================================================
create table if not exists public.modules (
  id text primary key, -- e.g. "cpp-py-variables"
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  tagline text not null,
  icon text not null,
  level text not null check (level in ('beginner','intermediate','advanced')),
  order_index int not null,
  requires jsonb not null default '[]', -- array of module ids
  reward_xp int not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================================
-- lessons: Sub-sections within a module
-- =========================================================================
create table if not exists public.lessons (
  id text primary key,
  module_id text not null references public.modules(id) on delete cascade,
  title text not null,
  intro text not null,
  real_world text,
  exercise jsonb not null, -- Stores the exercise object
  order_index int not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================================
-- lesson_comparisons: Concept mapping snippets
-- =========================================================================
create table if not exists public.lesson_comparisons (
  id uuid primary key default gen_random_uuid(),
  lesson_id text not null references public.lessons(id) on delete cascade,
  concept text not null,
  known_code text not null,
  target_code text not null,
  note text,
  explanation text, -- we use explanation in quiz, but here note is used in comparison. Let's keep note.
  order_index int not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================================
-- quiz_questions: Assessment questions for a module
-- =========================================================================
create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  module_id text not null references public.modules(id) on delete cascade,
  kind text not null check (kind in ('mcq','debug')),
  prompt text not null,
  choices jsonb not null, -- Array of strings
  broken_code text,
  correct_index int not null,
  explanation text not null,
  xp int not null,
  order_index int not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================================
-- Triggers for updated_at
-- =========================================================================

create or replace function public.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists courses_touch on public.courses;
create trigger courses_touch before update on public.courses for each row execute function public.touch_updated_at();

drop trigger if exists modules_touch on public.modules;
create trigger modules_touch before update on public.modules for each row execute function public.touch_updated_at();

drop trigger if exists lessons_touch on public.lessons;
create trigger lessons_touch before update on public.lessons for each row execute function public.touch_updated_at();

drop trigger if exists lesson_comparisons_touch on public.lesson_comparisons;
create trigger lesson_comparisons_touch before update on public.lesson_comparisons for each row execute function public.touch_updated_at();

drop trigger if exists quiz_questions_touch on public.quiz_questions;
create trigger quiz_questions_touch before update on public.quiz_questions for each row execute function public.touch_updated_at();

-- =========================================================================
-- Row Level Security (RLS) - Public Read-Only Access
-- =========================================================================
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_comparisons enable row level security;
alter table public.quiz_questions enable row level security;

-- Drop existing if re-running
drop policy if exists "public_read_courses" on public.courses;
drop policy if exists "public_read_modules" on public.modules;
drop policy if exists "public_read_lessons" on public.lessons;
drop policy if exists "public_read_lesson_comparisons" on public.lesson_comparisons;
drop policy if exists "public_read_quiz_questions" on public.quiz_questions;

create policy "public_read_courses" on public.courses for select using (true);
create policy "public_read_modules" on public.modules for select using (true);
create policy "public_read_lessons" on public.lessons for select using (true);
create policy "public_read_lesson_comparisons" on public.lesson_comparisons for select using (true);
create policy "public_read_quiz_questions" on public.quiz_questions for select using (true);
