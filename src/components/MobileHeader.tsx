
import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface MobileHeaderProps {
  onAuthClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onAuthClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-4 shadow-lg border-b border-blue-800 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* App Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl shadow-lg">
            <img 
              src="/lovable-uploads/c728e929-9651-4b8f-95a1-8b63f3308e6b.png" 
              alt="ابن سينا للتحاليل الطبية" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="text-right">
            <h1 className="text-lg font-bold text-white">ابن سينا</h1>
            <p className="text-xs text-blue-200">للتحاليل الطبية</p>
          </div>
        </div>

        {/* User Authentication Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onAuthClick}
          className="text-white hover:bg-white/10 p-2 rounded-lg"
        >
          <User className="w-5 h-5" />
        </Button>
      </div>
      
      {/* Developer Attribution */}
      <div className="mt-2 text-center">
        <p className="text-xs text-blue-300">
          طُور بواسطة: <span className="font-semibold text-blue-100">يوسف شتيوي</span>
        </p>
      </div>
    </header>
  );
};

export default MobileHeader;
