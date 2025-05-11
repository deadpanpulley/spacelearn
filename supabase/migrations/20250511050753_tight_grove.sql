/*
  # Add question type and options to questions table

  This migration adds support for different question types and multiple choice options.

  1. Changes
    - Add question_type column to questions table
    - Add options array column for multiple choice questions
    - Update existing questions to default type

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE questions
ADD COLUMN question_type TEXT NOT NULL DEFAULT 'short_answer'
CHECK (question_type IN ('multiple_choice', 'true_false', 'short_answer')),
ADD COLUMN options TEXT[] DEFAULT NULL;