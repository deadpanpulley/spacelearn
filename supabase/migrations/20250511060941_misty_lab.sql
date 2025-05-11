/*
  # AI Interactions Table
  
  1. New Tables
    - `ai_interactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `question_id` (uuid, references questions)
      - `user_query` (text)
      - `ai_response` (text)
      - `feedback_rating` (integer, 1-5)
      - `metadata` (jsonb)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS
    - Add policy for authenticated users to manage their own interactions
    
  3. Indexes
    - Create index on user_id for faster queries
*/

CREATE TABLE IF NOT EXISTS ai_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  question_id uuid REFERENCES questions(id),
  user_query text NOT NULL,
  ai_response text NOT NULL,
  feedback_rating integer CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own AI interactions" ON ai_interactions;

CREATE POLICY "Users can manage own AI interactions"
  ON ai_interactions
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_ai_interactions_user_id ON ai_interactions(user_id);