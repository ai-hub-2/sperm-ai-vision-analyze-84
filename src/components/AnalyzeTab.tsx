
import React from 'react';
import VideoUpload from '@/components/VideoUpload';

interface AnalyzeTabProps {
  onAnalysisComplete: (data: any) => void;
}

const AnalyzeTab: React.FC<AnalyzeTabProps> = ({ onAnalysisComplete }) => {
  return (
    <div className="px-4 py-6">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🔬 تحليل الحيوانات المنوية الحقيقي بالذكاء الاصطناعي
        </h2>
        <p className="text-gray-300 text-lg mb-4">
          نظام متطور حقيقي يستخدم Koyeb GPU Cloud، YOLOv8، DeepSort، وOpenCV للتحليل الطبي الدقيق
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-medium text-sm">
              نظام حقيقي • Koyeb GPU • NVIDIA RTX 4000
            </span>
          </div>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-medium text-sm">
              YOLOv8 + DeepSort + CASA حقيقي
            </span>
          </div>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-purple-400 font-medium text-sm">
              WHO 2010 • تقارير طبية دقيقة
            </span>
          </div>
        </div>
        <div className={`mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-purple-700/30`}>
          <p className={`text-sm text-blue-300 leading-relaxed`}>
            <strong>🚀 ميزات التحليل الحقيقي:</strong><br/>
            • دعم الفيديو والصور المجهرية<br/>
            • كشف وتتبع حقيقي بالذكاء الاصطناعي<br/>
            • تحليل CASA متوافق مع WHO 2010<br/>
            • تقييم الحركة والسرعة والتشكل<br/>
            • معالجة GPU سحابية عبر Koyeb<br/>
            • تقارير طبية شاملة ودقيقة
          </p>
        </div>
      </div>
      
      <VideoUpload onAnalysisComplete={onAnalysisComplete} />
    </div>
  );
};

export default AnalyzeTab;
