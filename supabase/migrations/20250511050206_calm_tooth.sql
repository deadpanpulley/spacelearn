/*
  # Add user profile fields

  1. Changes
    - Add display_name column to users table
    - Add avatar_url column to users table
    - Update RLS policies for new fields

  2. Security
    - Maintain existing RLS policies
    - Add policies for new fields
*/

-- Add new columns to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS display_name TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Update existing RLS policies to include new fields
DROP POLICY IF EXISTS "Users can update own data" ON users;
CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);