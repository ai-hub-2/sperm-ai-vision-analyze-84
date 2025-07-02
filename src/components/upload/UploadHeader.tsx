
import React from 'react';
import { Microscope, Sparkles, Sun, Moon } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface UploadHeaderProps {
  darkMode: boolean;
  setDarkMode: (isDark: boolean) => void;
}

const UploadHeader: React.FC<UploadHeaderProps> = ({ darkMode, setDarkMode }) => {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <Microscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              تحليل حقيقي متطور بالذكاء الاصطناعي
            </span>
            <div className="flex items-center gap-2 mt-1">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                نظام حقيقي • Koyeb GPU • YOLOv8 + DeepSort
              </span>
            </div>
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4" />
          <Switch 
            checked={darkMode} 
            onCheckedChange={setDarkMode}
            className="data-[state=checked]:bg-purple-600"
          />
          <Moon className="w-4 h-4" />
        </div>
      </div>
      <CardDescription className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-base`}>
        🚀 نظام متطور حقيقي يستخدم Koyeb GPU Cloud، YOLOv8، DeepSort، OpenCV، والتعلم العميق للتحليل الطبي الدقيق
      </CardDescription>
    </CardHeader>
  );
};

export default UploadHeader;
