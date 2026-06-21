/*
# Anchor AI Schema Migration

1. New Tables
- `profiles`: Extended user information linked to auth.users
  - `id` (uuid, primary key, references auth.users)
  - `name` (text)
  - `age` (integer)
  - `school_grade` (text)
  - `goals` (text[])
  - `activities` (text[])
  - `values` (text[])
  - `challenges` (text[])
  - `identity_score` (integer, default 50)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

- `journal_entries`: User journal entries
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `content` (text)
  - `themes` (text[])
  - `sentiment` (text)
  - `drift_risk` (text)
  - `recommendations` (jsonb)
  - `created_at` (timestamptz)

- `identity_maps`: Identity map data for users
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `achievement` (integer)
  - `relationships` (integer)
  - `creativity` (integer)
  - `wellness` (integer)
  - `growth` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

2. Security
- Enable RLS on all tables
- Owner-scoped policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  age integer,
  school_grade text,
  goals text[] DEFAULT '{}',
  activities text[] DEFAULT '{}',
  values text[] DEFAULT '{}',
  challenges text[] DEFAULT '{}',
  identity_score integer DEFAULT 50,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  themes text[] DEFAULT '{}',
  sentiment text,
  drift_risk text,
  recommendations jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS identity_maps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement integer DEFAULT 30,
  relationships integer DEFAULT 30,
  creativity integer DEFAULT 30,
  wellness integer DEFAULT 30,
  growth integer DEFAULT 30,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity_maps ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON profiles;
CREATE POLICY "delete_own_profile" ON profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- Journal entries policies
DROP POLICY IF EXISTS "select_own_entries" ON journal_entries;
CREATE POLICY "select_own_entries" ON journal_entries FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_entries" ON journal_entries;
CREATE POLICY "insert_own_entries" ON journal_entries FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_entries" ON journal_entries;
CREATE POLICY "update_own_entries" ON journal_entries FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_entries" ON journal_entries;
CREATE POLICY "delete_own_entries" ON journal_entries FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Identity maps policies
DROP POLICY IF EXISTS "select_own_maps" ON identity_maps;
CREATE POLICY "select_own_maps" ON identity_maps FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_maps" ON identity_maps;
CREATE POLICY "insert_own_maps" ON identity_maps FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_maps" ON identity_maps;
CREATE POLICY "update_own_maps" ON identity_maps FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_maps" ON identity_maps;
CREATE POLICY "delete_own_maps" ON identity_maps FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
