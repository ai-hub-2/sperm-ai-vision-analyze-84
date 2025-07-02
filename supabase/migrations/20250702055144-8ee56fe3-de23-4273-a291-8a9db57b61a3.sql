
-- Create analysis_results table
CREATE TABLE public.analysis_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  video_url TEXT NOT NULL,
  video_duration INTEGER NOT NULL,
  frames_analyzed INTEGER NOT NULL,
  processing_time DOUBLE PRECISION NOT NULL,
  sperm_count INTEGER NOT NULL,
  concentration DOUBLE PRECISION NOT NULL,
  speed_avg DOUBLE PRECISION NOT NULL,
  motility JSONB NOT NULL,
  morphology JSONB NOT NULL,
  vitality DOUBLE PRECISION NOT NULL,
  volume DOUBLE PRECISION NOT NULL,
  ph DOUBLE PRECISION NOT NULL,
  status TEXT DEFAULT 'completed',
  koyeb_job_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create chat_history table
CREATE TABLE public.chat_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  analysis_id UUID NOT NULL REFERENCES public.analysis_results(id) ON DELETE CASCADE,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for analysis_results
CREATE POLICY "Users can view their own analysis results" 
  ON public.analysis_results 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own analysis results" 
  ON public.analysis_results 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analysis results" 
  ON public.analysis_results 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analysis results" 
  ON public.analysis_results 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for chat_history
CREATE POLICY "Users can view their own chat history" 
  ON public.chat_history 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat messages" 
  ON public.chat_history 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat messages" 
  ON public.chat_history 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chat messages" 
  ON public.chat_history 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_analysis_results_updated_at 
    BEFORE UPDATE ON public.analysis_results 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chat_history_updated_at 
    BEFORE UPDATE ON public.chat_history 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
