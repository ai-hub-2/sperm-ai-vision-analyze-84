import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from 'next-themes';
import CameraCapture from './CameraCapture';
import UploadHeader from './upload/UploadHeader';
import TechnologyShowcase from './upload/TechnologyShowcase';
import UploadArea from './upload/UploadArea';
import FilePreview from './upload/FilePreview';
import ProcessingStatus from './upload/ProcessingStatus';

interface VideoUploadProps {
  onAnalysisComplete: (data: any) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onAnalysisComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');
  const [processingStage, setProcessingStage] = useState('');
  const [koyebJobId, setKoyebJobId] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [mediaType, setMediaType] = useState<'photo' | 'video' | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const darkMode = theme === 'dark';
  const setDarkMode = (isDark: boolean) => {
    setTheme(isDark ? 'dark' : 'light');
  };

  const realProcessingStages = [
    '🚀 نشر التحليل الحقيقي على Koyeb GPU Cloud',
    '🎥 معالجة الوسائط بـ OpenCV + FFmpeg الحقيقي',
    '🤖 تشغيل YOLOv8n الحقيقي للكشف عن الحيوانات المنوية',
    '🔍 تتبع متعدد الكائنات الحقيقي بـ DeepSort',
    '🔬 تحليل CASA حقيقي متوافق مع WHO 2010',
    '🧬 تصنيف التشكل الحقيقي بـ ResNet50 + CNN',
    '📊 تحليل الحركة والفيزياء الحقيقي',
    '⚡ معالجة GPU حقيقية على NVIDIA RTX 4000',
    '🏥 إنتاج التقرير الطبي المعتمد الحقيقي',
    '📋 فحص الجودة والتحقق الطبي النهائي'
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    
    if (!isVideo && !isImage) {
      toast({
        title: "نوع ملف غير مدعوم",
        description: "يرجى اختيار ملف فيديو أو صورة صالح للتحليل الحقيقي",
        variant: "destructive"
      });
      return;
    }

    const maxSize = isVideo ? 2 * 1024 * 1024 * 1024 : 100 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "حجم الملف كبير جداً",
        description: `يرجى اختيار ملف أصغر من ${isVideo ? '2 جيجابايت' : '100 ميجابايت'} للتحليل الحقيقي`,
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    setMediaType(isVideo ? 'video' : 'photo');
  };

  const handleCameraCapture = (file: File, type: 'photo' | 'video') => {
    setSelectedFile(file);
    setMediaType(type);
    setShowCamera(false);
    toast({
      title: `تم ${type === 'photo' ? 'التقاط الصورة' : 'تسجيل الفيديو'} بنجاح!`,
      description: "جاهز للتحليل الحقيقي بالذكاء الاصطناعي"
    });
  };

  const uploadToSupabase = async (file: File): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    const fileName = `${user.id}/${Date.now()}_${file.name}`;
    
    const { data, error } = await supabase.storage
      .from('sperm-videos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('sperm-videos')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const startRealAnalysis = async () => {
    if (!selectedFile || !user) return;

    setAnalysisStatus('uploading');
    setUploadProgress(0);

    try {
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(uploadInterval);
            return 90;
          }
          return prev + Math.random() * 12 + 8;
        });
      }, 400);

      const mediaUrl = await uploadToSupabase(selectedFile);
      setUploadProgress(100);
      clearInterval(uploadInterval);

      setAnalysisStatus('processing');
      
      let stageIndex = 0;
      const stageInterval = setInterval(() => {
        if (stageIndex < realProcessingStages.length) {
          setProcessingStage(realProcessingStages[stageIndex]);
          stageIndex++;
        } else {
          clearInterval(stageInterval);
        }
      }, 4000);

      console.log('🚀 Starting REAL AI analysis with Koyeb...', mediaType);
      const { data: analysisData, error } = await supabase.functions.invoke('sperm-analysis', {
        body: {
          mediaUrl,
          fileName: selectedFile.name,
          originalFilename: selectedFile.name,
          userId: user.id,
          mediaType: mediaType
        }
      });

      clearInterval(stageInterval);

      if (error) {
        console.error('Real analysis error:', error);
        throw error;
      }

      console.log('✅ Real analysis completed:', analysisData);
      setKoyebJobId(analysisData.koyeb_job_id);
      setAnalysisStatus('completed');
      onAnalysisComplete(analysisData);
      
      toast({
        title: `🔬 تم التحليل الحقيقي بنجاح!`,
        description: `تم إنتاج تقرير طبي دقيق للـ${mediaType === 'photo' ? 'صورة' : 'فيديو'} باستخدام Koyeb GPU الحقيقي`,
      });

    } catch (error) {
      console.error('Real AI analysis error:', error);
      setAnalysisStatus('error');
      toast({
        title: "خطأ في التحليل الحقيقي",
        description: "حدث خطأ أثناء التحليل بـ Koyeb GPU. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setAnalysisStatus('idle');
    setUploadProgress(0);
    setProcessingStage('');
    setKoyebJobId(null);
    setMediaType(null);
  };

  const containerClass = darkMode 
    ? "bg-gray-900 text-white border-gray-700" 
    : "bg-white text-gray-900 border-gray-200";

  return (
    <>
      <div className={`w-full max-w-4xl mx-auto transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        <Card className={`${containerClass} border-2`}>
          <UploadHeader darkMode={darkMode} setDarkMode={setDarkMode} />
          
          <CardContent className="space-y-6">
            <TechnologyShowcase darkMode={darkMode} />

            {analysisStatus === 'idle' && !selectedFile && (
              <UploadArea
                dragActive={dragActive}
                darkMode={darkMode}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onFileInput={handleFileInput}
                onCameraClick={() => setShowCamera(true)}
              />
            )}

            {selectedFile && analysisStatus === 'idle' && (
              <FilePreview
                selectedFile={selectedFile}
                mediaType={mediaType}
                darkMode={darkMode}
                onRemove={resetUpload}
                onStartAnalysis={startRealAnalysis}
              />
            )}

            <ProcessingStatus
              analysisStatus={analysisStatus}
              uploadProgress={uploadProgress}
              processingStage={processingStage}
              koyebJobId={koyebJobId}
              mediaType={mediaType}
              darkMode={darkMode}
              onReset={resetUpload}
            />
          </CardContent>
        </Card>
      </div>

      {showCamera && (
        <CameraCapture
          onMediaCaptured={handleCameraCapture}
          onClose={() => setShowCamera(false)}
          darkMode={darkMode}
        />
      )}
    </>
  );
};

export default VideoUpload;
