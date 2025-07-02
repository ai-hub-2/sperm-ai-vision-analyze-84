
import React from 'react';
import { Upload, Video, Image, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadAreaProps {
  dragActive: boolean;
  darkMode: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCameraClick: () => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  dragActive,
  darkMode,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileInput,
  onCameraClick
}) => {
  return (
    <>
      <div className="flex justify-center gap-4 mb-6">
        <Button
          onClick={onCameraClick}
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
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
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
          onChange={onFileInput}
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
                <Video className="w-5 h-5 text-white" />
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
  );
};

export default UploadArea;
