
import React from 'react';
import { Home, Camera, MessageCircle, BarChart3, User, Upload } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasResults: boolean;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange, hasResults }) => {
  const navItems = [
    { 
      id: 'home', 
      icon: Home, 
      label: 'الرئيسية',
      color: 'text-blue-400'
    },
    { 
      id: 'analyze', 
      icon: Upload, 
      label: 'التحليل',
      color: 'text-green-400'
    },
    { 
      id: 'camera', 
      icon: Camera, 
      label: 'الكاميرا',
      color: 'text-purple-400'
    },
    { 
      id: 'chat', 
      icon: MessageCircle, 
      label: 'المساعد',
      color: 'text-orange-400'
    },
    { 
      id: 'charts', 
      icon: BarChart3, 
      label: 'الإحصائيات',
      color: 'text-pink-400',
      disabled: !hasResults
    },
    { 
      id: 'profile', 
      icon: User, 
      label: 'الملف الشخصي',
      color: 'text-cyan-400'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-700 z-50 mobile-safe-area">
      <div className="flex justify-around items-center py-2 px-1">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          const isDisabled = item.disabled;
          
          return (
            <button
              key={item.id}
              onClick={() => !isDisabled && onTabChange(item.id)}
              disabled={isDisabled}
              className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg transition-all duration-200 min-w-[50px] ${
                isActive 
                  ? `${item.color} bg-gray-800 scale-105` 
                  : isDisabled
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              <IconComponent className={`w-5 h-5 mb-1 ${isActive ? 'animate-pulse' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
