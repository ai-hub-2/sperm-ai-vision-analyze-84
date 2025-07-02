
import React from 'react';
import { Video, Image, X, Sparkles, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilePreviewProps {
  selectedFile: File;
  mediaType: 'photo' | 'video' | null;
  darkMode: boolean;
  onRemove: () => void;
  onStartAnalysis: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  selectedFile,
  mediaType,
  darkMode,
  onRemove,
  onStartAnalysis
}) => {
  return (
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
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      <Button 
        onClick={onStartAnalysis}
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
  );
};

export default FilePreview;
