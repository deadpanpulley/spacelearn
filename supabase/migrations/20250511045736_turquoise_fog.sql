/*
  # SpaceLearn Database Schema

  1. New Tables
    - users: Core user data and settings
    - notes: User's learning materials
    - questions: Flashcards/questions derived from notes
    - spacing_profiles: Spaced repetition configuration
    - study_sessions: Track learning sessions
    - review_items: Spaced repetition tracking
    - ai_interactions: AI-assisted learning history

  2. Indexes
    - Optimized queries for user-related data
    - Fast access to upcoming reviews
    - Efficient note and question lookups

  3. Security
    - RLS policies for data protection
    - Secure user data isolation
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMPTZ,
  settings JSONB DEFAULT '{}'::jsonb
);

-- Notes table
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  note_id UUID REFERENCES notes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  answer_text TEXT NOT NULL,
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Spacing profiles table
CREATE TABLE IF NOT EXISTS spacing_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  intervals INTEGER[] NOT NULL,
  ease_factor FLOAT DEFAULT 2.5,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Study sessions table
CREATE TABLE IF NOT EXISTS study_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  start_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMPTZ,
  total_cards_reviewed INTEGER DEFAULT 0,
  performance_metrics JSONB DEFAULT '{}'::jsonb
);

-- Review items table
CREATE TABLE IF NOT EXISTS review_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  spacing_profile_id UUID REFERENCES spacing_profiles(id),
  last_reviewed TIMESTAMPTZ,
  next_review TIMESTAMPTZ,
  ease_factor FLOAT DEFAULT 2.5,
  interval INTEGER DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  performance_history JSONB[] DEFAULT ARRAY[]::jsonb[]
);

-- AI interactions table
CREATE TABLE IF NOT EXISTS ai_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id),
  user_query TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  feedback_rating INTEGER CHECK (feedback_rating BETWEEN 1 AND 5),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);
CREATE INDEX IF NOT EXISTS idx_questions_note_id ON questions(note_id);
CREATE INDEX IF NOT EXISTS idx_review_items_user_id ON review_items(user_id);
CREATE INDEX IF NOT EXISTS idx_review_items_next_review ON review_items(next_review);
CREATE INDEX IF NOT EXISTS idx_ai_interactions_user_id ON ai_interactions(user_id);

-- Create updated_at trigger for notes
DROP TRIGGER IF EXISTS set_updated_at ON notes;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON notes
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_updated_at();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE spacing_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view own notes"
  ON notes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes"
  ON notes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes"
  ON notes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes"
  ON notes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Similar policies for other tables
CREATE POLICY "Users can manage own questions"
  ON questions FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM notes
    WHERE notes.id = note_id
    AND notes.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage own study sessions"
  ON study_sessions FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own review items"
  ON review_items FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own AI interactions"
  ON ai_interactions FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view spacing profiles"
  ON spacing_profiles FOR SELECT
  TO authenticated
  USING (true);