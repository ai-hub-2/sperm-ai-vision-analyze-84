
import React, { useState } from 'react';
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex items-center justify-center p-4">
        <div className="text-center max-w-sm w-full">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl shadow-2xl inline-block mb-6 animate-pulse">
            <div className="w-16 h-16 bg-white rounded-xl animate-bounce flex items-center justify-center p-2">
              <img 
                src="/lovable-uploads/c728e929-9651-4b8f-95a1-8b63f3308e6b.png" 
                alt="ابن سينا للتحاليل الطبية" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">ابن سينا للتحاليل الطبية</h2>
          <p className="text-gray-400 mb-6">جاري تحميل التطبيق...</p>
          <div className="w-full max-w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse rounded-full"></div>
          </div>
          <p className="text-xs text-gray-500 mt-4">طُور بواسطة: يوسف شتيوي</p>
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
    <div className="min-h-screen max-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex flex-col overflow-hidden">
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
