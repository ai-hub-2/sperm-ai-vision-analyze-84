
import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface MobileHeaderProps {
  onAuthClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onAuthClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-gray-900 border-b border-gray-700 px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 rtl:gap-3 min-w-0 flex-shrink-0">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl shadow-lg overflow-hidden bg-white p-1.5 flex-shrink-0">
            <img 
              src="/lovable-uploads/e4f41878-e368-4bc6-9ae8-93a9feef83c8.png" 
              alt="سينا للتحاليل الطبية" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold text-white truncate">سينا للتحاليل</h1>
            <p className="text-xs text-blue-400 truncate">التحاليل الطبية المتقدمة</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 rtl:gap-2 flex-shrink-0">
          {user ? (
            <>
              <Button variant="ghost" size="sm" className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 flex-shrink-0">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 flex-shrink-0">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">{user.email?.[0]?.toUpperCase()}</span>
              </div>
            </>
          ) : (
            <Button 
              onClick={onAuthClick}
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-full shadow-lg flex-shrink-0 whitespace-nowrap"
            >
              دخول
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
