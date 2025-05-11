import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import { Configuration, OpenAIApi } from 'npm:openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const openai = new OpenAIApi(
  new Configuration({
    apiKey: Deno.env.get('OPENAI_API_KEY'),
  })
);

async function handleAIRequest(req: Request) {
  try {
    const { query, userId, questionId, style = 'detailed' } = await req.json();

    // Rate limiting check
    const { count } = await supabase
      .from('ai_interactions')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000))
      .single();

    if (count > 50) {
      return new Response(
        JSON.stringify({ error: 'Daily limit exceeded' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare system message based on style
    let systemMessage = 'You are a helpful study assistant. ';
    switch (style) {
      case 'concise':
        systemMessage += 'Provide brief, focused answers.';
        break;
      case 'eli5':
        systemMessage += 'Explain concepts as if teaching a beginner.';
        break;
      default:
        systemMessage += 'Provide detailed explanations with examples.';
    }

    // Get AI response
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: query }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.data.choices[0]?.message?.content || 'No response generated';

    // Store interaction
    const { data: interaction, error } = await supabase
      .from('ai_interactions')
      .insert({
        user_id: userId,
        question_id: questionId,
        user_query: query,
        ai_response: aiResponse,
        metadata: {
          style,
          model: 'gpt-4',
          tokens: completion.data.usage,
        }
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, data: interaction }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method === 'POST') {
    return handleAIRequest(req);
  }

  return new Response(null, { status: 405 });
});