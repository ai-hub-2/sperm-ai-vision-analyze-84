
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from 'next-themes';

interface MobileHeaderProps {
  onAuthClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onAuthClick }) => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white p-4 shadow-xl border-b border-blue-600 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* App Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl shadow-lg">
            <img 
              src="/lovable-uploads/582701e6-7c4c-4cd6-863d-fa597ce94acf.png" 
              alt="ابن سينا للتحاليل الطبية" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <div className="text-right">
            <h1 className="text-xl font-bold text-white">ابن سينا</h1>
            <p className="text-sm text-blue-100">للتحاليل الطبية</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="text-white hover:bg-white/10 p-2 rounded-lg"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onAuthClick}
            className="text-white hover:bg-white/10 p-2 rounded-lg"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* Developer Attribution */}
      <div className="mt-3 text-center">
        <p className="text-xs text-blue-200">
          طُور بواسطة: <span className="font-semibold text-blue-100">يوسف شتيوي</span> • 
          <span className="text-blue-300"> خبرة ودقة تحدد الأمان</span>
        </p>
      </div>
    </header>
  );
};

export default MobileHeader;
