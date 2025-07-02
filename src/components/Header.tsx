
import React from 'react';
import { Menu, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-4 rtl:gap-4 min-w-0">
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md overflow-hidden p-1 flex-shrink-0">
              <img 
                src="/lovable-uploads/e4f41878-e368-4bc6-9ae8-93a9feef83c8.png" 
                alt="سينا للتحاليل الطبية" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg font-bold text-gray-900 truncate">سينا للتحاليل الطبية</span>
              <span className="text-xs text-gray-500 -mt-1 truncate">خبرة ودقة تمنحك الأمان</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 rtl:gap-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium whitespace-nowrap">
              المميزات
            </a>
            <a href="#analysis" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium whitespace-nowrap">
              التحليل
            </a>
            <a href="#results" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium whitespace-nowrap">
              النتائج
            </a>
            <a href="#support" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium whitespace-nowrap">
              الدعم
            </a>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-4 rtl:gap-4 flex-shrink-0">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 rtl:gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden sm:inline text-gray-700 truncate max-w-32">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    الملف الشخصي
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={onAuthClick}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap"
              >
                تسجيل الدخول
              </Button>
            )}
            
            {/* Mobile Menu */}
            <Button variant="ghost" size="sm" className="md:hidden flex-shrink-0">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
