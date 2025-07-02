
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
    const formData = await req.formData()
    const videoFile = formData.get('video') as File
    const userId = formData.get('userId') as string

    if (!videoFile || !userId) {
      throw new Error('Missing video file or user ID')
    }

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // For now, generate mock analysis data
    // In production, this would integrate with actual AI analysis service
    const mockAnalysisData = {
      user_id: userId,
      filename: `analysis_${Date.now()}.mp4`,
      original_filename: videoFile.name,
      video_url: 'mock_url',
      video_duration: 30,
      frames_analyzed: 300,
      processing_time: 45.5,
      sperm_count: Math.floor(Math.random() * 100) + 20,
      concentration: Math.floor(Math.random() * 80) + 15,
      speed_avg: Math.random() * 30 + 10,
      motility: {
        progressive: Math.floor(Math.random() * 40) + 30,
        non_progressive: Math.floor(Math.random() * 20) + 10,
        immotile: Math.floor(Math.random() * 30) + 20
      },
      morphology: {
        normal: Math.floor(Math.random() * 20) + 4,
        abnormal_head: Math.floor(Math.random() * 40) + 30,
        abnormal_midpiece: Math.floor(Math.random() * 20) + 10,
        abnormal_tail: Math.floor(Math.random() * 30) + 20
      },
      vitality: Math.floor(Math.random() * 30) + 60,
      volume: Math.random() * 3 + 2,
      ph: Math.random() * 1.5 + 7.2,
      status: 'completed'
    }

    // Save to database
    const { data, error } = await supabase
      .from('analysis_results')
      .insert(mockAnalysisData)
      .select()
      .single()

    if (error) {
      throw new Error('Failed to save analysis results')
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis: data,
        message: 'تم تحليل العينة بنجاح' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in sperm-analysis function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        message: 'حدث خطأ أثناء تحليل العينة' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
