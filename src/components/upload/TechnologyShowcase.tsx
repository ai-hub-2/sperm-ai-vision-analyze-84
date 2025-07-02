
import React from 'react';
import { Brain, Zap, Cpu, Microscope, Sparkles } from 'lucide-react';

interface TechnologyShowcaseProps {
  darkMode: boolean;
}

const TechnologyShowcase: React.FC<TechnologyShowcaseProps> = ({ darkMode }) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-gray-800 via-blue-900/20 to-purple-900/20' : 'bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50'} border border-purple-200/30`}>
      <div className="flex flex-col items-center gap-3">
        <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div className="text-center">
          <span className="text-sm font-bold text-blue-600">YOLOv8</span>
          <p className="text-xs text-gray-500">كشف حقيقي</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="p-3 bg-gradient-to-r from-green-600 to-green-700 rounded-xl">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div className="text-center">
          <span className="text-sm font-bold text-green-600">DeepSort</span>
          <p className="text-xs text-gray-500">تتبع حقيقي</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="p-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl">
          <Cpu className="w-6 h-6 text-white" />
        </div>
        <div className="text-center">
          <span className="text-sm font-bold text-purple-600">OpenCV</span>
          <p className="text-xs text-gray-500">معالجة حقيقية</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl">
          <Microscope className="w-6 h-6 text-white" />
        </div>
        <div className="text-center">
          <span className="text-sm font-bold text-red-600">CASA</span>
          <p className="text-xs text-gray-500">WHO 2010</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="p-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="text-center">
          <span className="text-sm font-bold text-yellow-600">Koyeb</span>
          <p className="text-xs text-gray-500">GPU Cloud</p>
        </div>
      </div>
    </div>
  );
};

export default TechnologyShowcase;
