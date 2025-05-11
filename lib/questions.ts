import { supabase } from '@/lib/supabase';

export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer';

export interface Question {
  id: string;
  note_id: string;
  question_text: string;
  answer_text: string;
  difficulty_level: number;
  question_type: QuestionType;
  options?: string[];
  created_at: string;
}

export async function getQuestions(noteId: string) {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('note_id', noteId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Question[];
}

export async function createQuestion(question: Omit<Question, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('questions')
    .insert([question])
    .select()
    .single();

  if (error) throw error;
  return data as Question;
}

export async function updateQuestion(id: string, question: Partial<Question>) {
  const { data, error } = await supabase
    .from('questions')
    .update(question)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Question;
}

export async function deleteQuestion(id: string) {
  const { error } = await supabase
    .from('questions')
    .delete()
    .eq('id', id);

  if (error) throw error;
}