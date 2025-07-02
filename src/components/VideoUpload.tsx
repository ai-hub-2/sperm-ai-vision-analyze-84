import React, { useState, useCallback } from 'react';
import { Upload, Video, X, AlertCircle, CheckCircle, Loader2, Cpu, Zap, Brain, Microscope, Sparkles, Image, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from 'next-themes';
import CameraCapture from './CameraCapture';
import UploadHeader from './upload/UploadHeader';
import TechnologyShowcase from './upload/TechnologyShowcase';

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
              <>
                <div className="flex justify-center gap-4 mb-6">
                  <Button
                    onClick={() => setShowCamera(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    size="lg"
                  >
                    <Camera className="w-5 h-5" />
                    تسجيل مباشر من الكاميرا
                  </Button>
                </div>

                <div className="text-center mb-4">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>أو</span>
                </div>

                <div
                  className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 scale-105'
                      : `${darkMode ? 'border-gray-600 hover:border-purple-400 hover:bg-gray-800' : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'}`
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full inline-block mb-6">
                    <Upload className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    اسحب وأفلت الفيديو أو الصورة المجهرية هنا
                  </h3>
                  <p className={`mb-6 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    أو اختر ملف من جهازك للتحليل الحقيقي بالذكاء الاصطناعي المتقدم
                  </p>
                  <input
                    type="file"
                    id="media-upload"
                    accept="video/*,image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <Button asChild variant="outline" className={`${darkMode ? 'border-purple-600 hover:bg-purple-900/20 text-purple-400' : 'border-purple-600 hover:bg-purple-50 text-purple-700'} text-lg px-8 py-3`}>
                    <label htmlFor="media-upload" className="cursor-pointer flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      <Image className="w-5 h-5" />
                      اختر فيديو أو صورة مجهرية
                    </label>
                  </Button>
                  
                  <div className="mt-8 space-y-4">
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      فيديو: حتى 2 جيجابايت • صورة: حتى 100 ميجابايت • الصيغ المدعومة: MP4, MOV, AVI, JPG, PNG
                    </p>
                    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-purple-700/30' : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-200'}`}>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <h4 className={`font-bold mb-2 ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                            🚀 تحليل حقيقي متقدم مع Koyeb GPU Cloud:
                          </h4>
                          <ul className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'} space-y-1 leading-relaxed`}>
                            <li>• <strong>فيديو:</strong> تحليل شامل مع تتبع الحركة وقياس السرعة</li>
                            <li>• <strong>صورة:</strong> تحليل التشكل والتوزيع المكاني</li>
                            <li>• <strong>YOLOv8:</strong> كشف وتعرف حقيقي بدقة عالية</li>
                            <li>• <strong>DeepSort:</strong> تتبع متعدد الكائنات عبر الإطارات</li>
                            <li>• <strong>CASA:</strong> تحليل طبي معتمد متوافق مع WHO 2010</li>
                            <li>• <strong>Koyeb GPU:</strong> معالجة سحابية على NVIDIA RTX 4000</li>
                            <li>• <strong>تقارير طبية:</strong> نتائج دقيقة قابلة للاستخدام الطبي</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedFile && analysisStatus === 'idle' && (
              <div className="space-y-6">
                <div className={`flex items-center justify-between p-6 rounded-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-gradient-to-r ${mediaType === 'video' ? 'from-blue-600 to-purple-600' : 'from-green-600 to-emerald-600'} rounded-xl`}>
                      {mediaType === 'video' ? (
                        <Video className="w-8 h-8 text-white" />
                      ) : (
                        <Image className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{selectedFile.name}</p>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} ميجابايت • {mediaType === 'video' ? 'فيديو' : 'صورة'} • جاهز للتحليل الحقيقي
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={resetUpload}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <Button 
                  onClick={startRealAnalysis}
                  className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white text-lg py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    🚀 بدء التحليل الحقيقي بـ Koyeb GPU
                    <Brain className="w-6 h-6" />
                  </div>
                </Button>
                
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-700/30' : 'bg-green-50 border border-green-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-600 rounded-lg">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                      ⚡ سيتم التحليل الحقيقي: Koyeb GPU + YOLOv8 + DeepSort + CASA + ResNet50 للـ{mediaType === 'video' ? 'فيديو' : 'صورة'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {analysisStatus === 'uploading' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full inline-block mb-4">
                    <Loader2 className="w-10 h-10 animate-spin text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">جاري رفع {mediaType === 'video' ? 'الفيديو' : 'الصورة'} إلى Koyeb GPU Cloud...</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    تحضير الوسائط للمعالجة الحقيقية بالذكاء الاصطناعي المتقدم
                  </p>
                </div>
                <div className="space-y-3">
                  <Progress value={uploadProgress} className="w-full h-3" />
                  <p className={`text-center font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {uploadProgress.toFixed(0)}% مكتمل • التحضير للتحليل الحقيقي بـ Koyeb GPU
                  </p>
                </div>
              </div>
            )}

            {analysisStatus === 'processing' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <Brain className="w-12 h-12 text-white animate-bounce" />
                    </div>
                    <div className="absolute -top-2 -right-2 p-2 bg-yellow-500 rounded-full">
                      <Sparkles className="w-4 h-4 text-white animate-spin" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    🤖 تحليل حقيقي بـ Koyeb GPU Cloud
                  </h3>
                  <p className={`mb-6 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    يتم الآن التحليل الحقيقي للـ{mediaType === 'video' ? 'فيديو' : 'صورة'} باستخدام NVIDIA RTX 4000 + YOLOv8
                  </p>
                  
                  {/* Real-time Processing Stage */}
                  {processingStage && (
                    <div className={`p-6 rounded-xl mb-6 ${darkMode ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700/30' : 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200'}`}>
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                        <p className={`font-bold text-lg ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                          {processingStage}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Koyeb Job ID */}
                  {koyebJobId && (
                    <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'}`}>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <p className={`text-sm font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          معرف مهمة Koyeb الحقيقية: {koyebJobId}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Real AI Processing Pipeline */}
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-600/10">
                      <Cpu className="w-6 h-6 text-blue-600" />
                      <span className="font-medium">معالجة حقيقية بـ OpenCV</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-600/10">
                      <Brain className="w-6 h-6 text-green-600" />
                      <span className="font-medium">كشف حقيقي بـ YOLOv8</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-600/10">
                      <Zap className="w-6 h-6 text-purple-600" />
                      <span className="font-medium">تتبع حقيقي بـ DeepSort</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-red-600/10">
                      <Microscope className="w-6 h-6 text-red-600" />
                      <span className="font-medium">تحليل CASA حقيقي</span>
                    </div>
                  </div>
                </div>
                
                <Alert className="border-yellow-500/30 bg-yellow-500/10">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <AlertDescription className="text-base">
                    <strong>التحليل الحقيقي جاري الآن على Koyeb GPU!</strong> يستخدم النظام NVIDIA RTX 4000 + YOLOv8 + DeepSort للحصول على نتائج دقيقة طبياً. 
                    المدة المتوقعة: {mediaType === 'video' ? '15-30 دقيقة حسب طول الفيديو' : '5-10 دقائق للصورة'}.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {analysisStatus === 'completed' && (
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 p-2 bg-yellow-500 rounded-full animate-bounce">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ✅ تم التحليل الحقيقي بنجاح!
                </h3>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  تم إنتاج التقرير الطبي الشامل للـ{mediaType === 'video' ? 'فيديو' : 'صورة'} باستخدام Koyeb GPU الحقيقي + YOLOv8
                </p>
                
                {koyebJobId && (
                  <div className={`p-6 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-700/30' : 'bg-green-50 border border-green-200'}`}>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-600 rounded-lg">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className={`text-sm font-bold ${darkMode ? 'text-green-300' : 'text-green-700'} mb-2`}>
                          🚀 <strong>معرف التحليل الحقيقي:</strong> {koyebJobId}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                          📊 <strong>تم إنتاج:</strong> تحليل دقيق • {mediaType === 'video' ? 'تقييم الحركة • قياس السرعة' : 'تحليل التشكل • التوزيع المكاني'} • تقرير طبي WHO 2010
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button onClick={resetUpload} variant="outline" className="text-lg px-8 py-3">
                  <Video className="w-5 h-5 mr-2" />
                  🔄 تحليل عينة جديدة
                </Button>
              </div>
            )}

            {analysisStatus === 'error' && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-red-800 dark:text-red-400">
                  ❌ حدث خطأ في التحليل الحقيقي
                </h3>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  نعتذر، حدث خطأ أثناء التحليل الحقيقي بـ Koyeb GPU. يرجى التأكد من جودة الوسائط والمحاولة مرة أخرى.
                </p>
                <Button onClick={resetUpload} variant="outline" className="text-lg px-8 py-3">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  🔄 محاولة أخرى
                </Button>
              </div>
            )}
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
