import { supabase } from '@/lib/supabase';

export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export async function getNotes(search?: string, tags?: string[]) {
  let query = supabase
    .from('notes')
    .select('*')
    .order('updated_at', { ascending: false });

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  if (tags && tags.length > 0) {
    query = query.contains('tags', tags);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Note[];
}

export async function createNote(note: Omit<Note, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('notes')
    .insert([note])
    .select()
    .single();

  if (error) throw error;
  return data as Note;
}

export async function updateNote(id: string, note: Partial<Note>) {
  const { data, error } = await supabase
    .from('notes')
    .update(note)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Note;
}

export async function deleteNote(id: string) {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);

  if (error) throw error;
}