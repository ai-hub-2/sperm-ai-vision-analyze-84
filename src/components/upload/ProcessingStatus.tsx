
import React from 'react';
import { Loader2, Brain, Sparkles, CheckCircle, AlertCircle, Video, Cpu, Zap, Microscope } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ProcessingStatusProps {
  analysisStatus: 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
  uploadProgress: number;
  processingStage: string;
  koyebJobId: string | null;
  mediaType: 'photo' | 'video' | null;
  darkMode: boolean;
  onReset: () => void;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  analysisStatus,
  uploadProgress,
  processingStage,
  koyebJobId,
  mediaType,
  darkMode,
  onReset
}) => {
  if (analysisStatus === 'uploading') {
    return (
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
    );
  }

  if (analysisStatus === 'processing') {
    return (
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
    );
  }

  if (analysisStatus === 'completed') {
    return (
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
        
        <Button onClick={onReset} variant="outline" className="text-lg px-8 py-3">
          <Video className="w-5 h-5 mr-2" />
          🔄 تحليل عينة جديدة
        </Button>
      </div>
    );
  }

  if (analysisStatus === 'error') {
    return (
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
        <Button onClick={onReset} variant="outline" className="text-lg px-8 py-3">
          <AlertCircle className="w-5 h-5 mr-2" />
          🔄 محاولة أخرى
        </Button>
      </div>
    );
  }

  return null;
};

export default ProcessingStatus;
