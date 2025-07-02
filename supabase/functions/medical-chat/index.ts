
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, analysisId, userId } = await req.json()

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Get analysis data for context
    const { data: analysisData, error: analysisError } = await supabase
      .from('analysis_results')
      .select('*')
      .eq('id', analysisId)
      .single()

    if (analysisError) {
      throw new Error('Failed to fetch analysis data')
    }

    // Prepare medical context for AI
    const medicalContext = `
    تحليل الحيوانات المنوية للمريض:
    - عدد الحيوانات المنوية: ${analysisData.sperm_count} مليون/مل
    - التركيز: ${analysisData.concentration} مليون/مل
    - السرعة المتوسطة: ${analysisData.speed_avg} ميكرومتر/ثانية
    - الحيوية: ${analysisData.vitality}%
    - الحجم: ${analysisData.volume} مل
    - الحموضة: ${analysisData.ph}
    - الحركة: ${JSON.stringify(analysisData.motility)}
    - الشكل: ${JSON.stringify(analysisData.morphology)}
    
    أنت طبيب متخصص في طب الذكورة والإنجاب. قدم إجابة طبية دقيقة ومهنية باللغة العربية.
    `

    // Make request to AI service (using Ollama or another AI service)
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer boncm3rjrs6437kw3x1fjsqvmqsrz61whoeja6t1aadictbfxh6jg2wec5ndk11i`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `أنت طبيب متخصص في طب الذكورة والإنجاب والخصوبة. مهمتك تفسير نتائج تحليل الحيوانات المنوية وتقديم المشورة الطبية المناسبة باللغة العربية. ${medicalContext}`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    })

    if (!aiResponse.ok) {
      throw new Error('Failed to get AI response')
    }

    const aiData = await aiResponse.json()
    const response = aiData.choices[0].message.content

    return new Response(
      JSON.stringify({ response }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in medical-chat function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
