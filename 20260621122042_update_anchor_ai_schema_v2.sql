/*
# Anchor AI Schema Migration v2

1. New Tables
- `identity_scores`: Track identity balance scores over time for trend chart
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `score` (integer)
  - `achievement` (integer)
  - `relationships` (integer)
  - `creativity` (integer)
  - `wellness` (integer)
  - `growth` (integer)
  - `community` (integer)
  - `created_at` (timestamptz)

2. Modified Tables
- `journal_entries`: Added `identity_score` (integer) to track score at time of entry
- `profiles`: Added `reflection_answers` (jsonb) to store onboarding reflection responses

3. Security
- Enable RLS on all new tables
- Owner-scoped policies for authenticated users
*/

-- Identity scores history table
CREATE TABLE IF NOT EXISTS identity_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  score integer NOT NULL DEFAULT 50,
  achievement integer DEFAULT 30,
  relationships integer DEFAULT 30,
  creativity integer DEFAULT 30,
  wellness integer DEFAULT 30,
  growth integer DEFAULT 30,
  community integer DEFAULT 30,
  created_at timestamptz DEFAULT now()
);

-- Add identity_score to journal_entries
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'journal_entries' AND column_name = 'identity_score'
  ) THEN
    ALTER TABLE journal_entries ADD COLUMN identity_score integer;
  END IF;
END
$$;

-- Add community to identity_maps
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'identity_maps' AND column_name = 'community'
  ) THEN
    ALTER TABLE identity_maps ADD COLUMN community integer DEFAULT 30;
  END IF;
END
$$;

-- Add reflection_answers to profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'reflection_answers'
  ) THEN
    ALTER TABLE profiles ADD COLUMN reflection_answers jsonb DEFAULT '[]';
  END IF;
END
$$;

-- Add identity_areas to profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'identity_areas'
  ) THEN
    ALTER TABLE profiles ADD COLUMN identity_areas text[] DEFAULT '{}';
  END IF;
END
$$;

-- RLS for identity_scores
ALTER TABLE identity_scores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_scores" ON identity_scores;
CREATE POLICY "select_own_scores" ON identity_scores FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_scores" ON identity_scores;
CREATE POLICY "insert_own_scores" ON identity_scores FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_scores" ON identity_scores;
CREATE POLICY "update_own_scores" ON identity_scores FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_scores" ON identity_scores;
CREATE POLICY "delete_own_scores" ON identity_scores FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
