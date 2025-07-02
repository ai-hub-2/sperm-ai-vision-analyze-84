
import React, { useState, useRef, useCallback } from 'react';
import { Camera, RotateCcw, Flashlight, Focus, Video, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CameraPreview: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      setStream(mediaStream);
      setHasPermission(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasPermission(false);
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const toggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = () => {
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Auto-stop after 30 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && isRecording) {
          stopRecording();
        }
      }, 30000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const switchCamera = () => {
    stopCamera();
    setFacingMode(current => current === 'user' ? 'environment' : 'user');
  };

  React.useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  if (hasPermission === false) {
    return (
      <div className="aspect-video bg-gray-900 rounded-xl flex flex-col items-center justify-center p-6 text-center">
        <Camera className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-200 mb-2">
          إذن الكاميرا مطلوب
        </h3>
        <p className="text-gray-400 mb-4">
          نحتاج إلى إذن للوصول إلى الكاميرا لتسجيل عينة الفحص
        </p>
        <Button onClick={startCamera} className="bg-blue-600 hover:bg-blue-700">
          السماح بالوصول للكاميرا
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        
        {/* Grid overlay for microscope alignment */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-30">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border border-white/20"></div>
          ))}
        </div>
        
        {/* Recording indicator */}
        {isRecording && (
          <div className="absolute top-4 right-4 flex items-center bg-red-600/80 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
            <span className="text-white text-sm font-medium">تسجيل</span>
          </div>
        )}
        
        {/* Center focus circle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 border-2 border-blue-400/60 rounded-full"></div>
        </div>
      </div>
      
      {/* Recording controls */}
      <div className="flex justify-center">
        <Button
          onClick={toggleRecording}
          size="lg"
          className={`rounded-full w-20 h-20 ${
            isRecording 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
          }`}
        >
          {isRecording ? (
            <Square className="w-8 h-8 text-white" />
          ) : (
            <Video className="w-8 h-8 text-white" />
          )}
        </Button>
      </div>
      
      {/* Camera controls */}
      <div className="flex justify-center space-x-4 rtl:space-x-reverse">
        <Button
          variant="outline"
          size="sm"
          onClick={switchCamera}
          className="flex items-center gap-2 bg-gray-800/50 border-gray-600 text-gray-200 hover:bg-gray-700"
        >
          <RotateCcw className="w-4 h-4" />
          تبديل
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-gray-800/50 border-gray-600 text-gray-200 hover:bg-gray-700"
        >
          <Focus className="w-4 h-4" />
          تركيز
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-gray-800/50 border-gray-600 text-gray-200 hover:bg-gray-700"
        >
          <Flashlight className="w-4 h-4" />
          إضاءة
        </Button>
      </div>
      
      {/* Instructions */}
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
        <h4 className="font-semibold text-blue-200 mb-2">تعليمات التسجيل:</h4>
        <ul className="space-y-1 text-sm text-blue-100">
          <li>• استخدم عدسة المجهر 400x</li>
          <li>• حافظ على ثبات الكاميرا</li>
          <li>• سجل لمدة 15-30 ثانية</li>
          <li>• تأكد من وضوح الصورة</li>
        </ul>
      </div>
    </div>
  );
};

export default CameraPreview;
