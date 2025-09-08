import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, budget, duration, interests, location } = await req.json();

    console.log('Trip Genie request:', { message, budget, duration, interests, location });

    const systemPrompt = `You are Trip Genie, an AI travel assistant specialized in Jharkhand tourism. You help visitors discover the rich cultural heritage, natural beauty, and tribal traditions of Jharkhand.

Key knowledge about Jharkhand:
- Famous heritage sites: Jagannath Temple Ranchi, Rajrappa Temple, Deoghar Baidyanath Temple
- Natural attractions: Hundru Falls, Dassam Falls, Betla National Park, Netarhat, Palamau Tiger Reserve
- Tribal culture: Santhal, Munda, Oraon tribes with unique festivals like Karma, Sarhul, Tusu
- Adventure activities: Trekking in Parasnath Hills, river rafting, wildlife safaris
- Cultural experiences: Tribal dance performances, handicraft workshops, village stays
- Best time: October to March for most places
- Local cuisine: Thekua, Pittha, Dhuska, tribal honey, bamboo shoot dishes

Guidelines:
1. Always prioritize Jharkhand destinations and experiences
2. Consider the user's budget, duration, and interests
3. Provide practical information: costs, best times to visit, transportation
4. Include cultural immersion opportunities
5. Suggest heritage sites based on user interests
6. Be enthusiastic and informative
7. Format responses in a conversational, helpful manner
8. Include approximate costs in INR
9. Suggest 2-3 day itineraries when appropriate

Current request context:
Budget: ${budget || 'Not specified'}
Duration: ${duration || 'Not specified'} 
Interests: ${interests || 'General tourism'}
Location preference: ${location || 'Anywhere in Jharkhand'}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    console.log('Trip Genie response generated successfully');

    return new Response(JSON.stringify({ 
      reply,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in trip-genie function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});