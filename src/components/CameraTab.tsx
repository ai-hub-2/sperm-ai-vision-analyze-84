
import React from 'react';
import CameraCapture from '@/components/CameraCapture';

interface CameraTabProps {
  onMediaCaptured: (file: File, type: 'photo' | 'video') => void;
}

const CameraTab: React.FC<CameraTabProps> = ({ onMediaCaptured }) => {
  return (
    <div className="px-4 py-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          📷 التقاط مباشر
        </h2>
        <p className="text-gray-400">
          التقط صور أو سجل فيديو مباشرة للعينة المجهرية
        </p>
      </div>
      
      <CameraCapture 
        onMediaCaptured={onMediaCaptured}
        onClose={() => {}}
        darkMode={true}
      />
    </div>
  );
};

export default CameraTab;
