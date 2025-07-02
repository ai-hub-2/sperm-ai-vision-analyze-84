
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthDialog from '@/components/AuthDialog';
import MobileHeader from '@/components/MobileHeader';
import BottomNavigation from '@/components/BottomNavigation';
import HomeTab from '@/components/HomeTab';
import AnalyzeTab from '@/components/AnalyzeTab';
import CameraTab from '@/components/CameraTab';
import ChatTab from '@/components/ChatTab';
import ChartsTab from '@/components/ChartsTab';
import ProfileTab from '@/components/ProfileTab';

const Index = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const { loading } = useAuth();

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleAnalysisComplete = (data: any) => {
    setAnalysisData(data);
    setActiveTab('charts');
  };

  const handleStartAnalysis = () => {
    setActiveTab('analyze');
  };

  const handleMediaCaptured = (file: File, type: 'photo' | 'video') => {
    console.log('Media captured:', { file, type });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="text-center max-w-sm w-full">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-3xl shadow-2xl inline-block mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
            <div className="w-20 h-20 bg-white rounded-2xl animate-bounce flex items-center justify-center p-3 relative z-10">
              <img 
                src="/lovable-uploads/582701e6-7c4c-4cd6-863d-fa597ce94acf.png" 
                alt="ابن سينا للتحاليل الطبية" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">ابن سينا للتحاليل الطبية</h2>
          <p className="text-blue-200 mb-6 text-lg">جاري تحميل النظام المتطور...</p>
          <div className="w-full max-w-64 h-3 bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse rounded-full"></div>
          </div>
          <p className="text-xs text-blue-300 mt-6">
            طُور بواسطة: <span className="font-semibold">يوسف شتيوي</span>
          </p>
          <p className="text-xs text-blue-400 mt-1">خبرة ودقة تحدد الأمان</p>
        </div>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab onStartAnalysis={handleStartAnalysis} />;
      case 'analyze':
        return <AnalyzeTab onAnalysisComplete={handleAnalysisComplete} />;
      case 'camera':
        return <CameraTab onMediaCaptured={handleMediaCaptured} />;
      case 'chat':
        return <ChatTab analysisId={analysisData?.id} />;
      case 'charts':
        return <ChartsTab analysisData={analysisData} />;
      case 'profile':
        return <ProfileTab onAuthClick={() => setIsAuthOpen(true)} />;
      default:
        return <HomeTab onStartAnalysis={handleStartAnalysis} />;
    }
  };

  return (
    <div className="min-h-screen max-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 flex flex-col overflow-hidden transition-colors duration-300">
      <MobileHeader onAuthClick={() => setIsAuthOpen(true)} />
      
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="h-full">
          {renderActiveTab()}
        </div>
      </main>

      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        hasResults={!!analysisData}
      />

      <AuthDialog 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
};

export default Index;
