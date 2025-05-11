import { supabase } from './supabase';

export type AIInteraction = {
  id: string;
  user_query: string;
  ai_response: string;
  feedback_rating?: number;
  created_at: string;
  metadata: {
    style: 'detailed' | 'concise' | 'eli5';
    model: string;
    tokens: {
      total_tokens: number;
      completion_tokens: number;
      prompt_tokens: number;
    };
  };
};

export async function getAIInteractions(limit = 10) {
  const { data, error } = await supabase
    .from('ai_interactions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as AIInteraction[];
}

export async function askAI(query: string, options: {
  style?: 'detailed' | 'concise' | 'eli5';
  questionId?: string;
}) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/ai-help`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        userId: session.user.id,
        questionId: options.questionId,
        style: options.style || 'detailed',
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get AI response');
  }

  return response.json();
}

export async function provideFeedback(interactionId: string, rating: number) {
  const { error } = await supabase
    .from('ai_interactions')
    .update({ feedback_rating: rating })
    .eq('id', interactionId);

  if (error) throw error;
}