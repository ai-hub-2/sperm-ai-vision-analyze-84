
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, FileVideo, Microscope, BarChart3, MessageCircle, Shield, Clock, Award, Zap, Brain } from 'lucide-react';

interface HomeTabProps {
  onStartAnalysis: () => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ onStartAnalysis }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 p-4 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Hero Section */}
        <div className="text-center py-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-3xl shadow-2xl inline-block mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
            <img 
              src="/lovable-uploads/582701e6-7c4c-4cd6-863d-fa597ce94acf.png" 
              alt="ابن سينا للتحاليل الطبية" 
              className="w-20 h-20 mx-auto object-contain relative z-10"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            مرحباً بك في ابن سينا
          </h1>
          <p className="text-xl text-blue-600 dark:text-blue-400 mb-4 font-semibold">
            للتحاليل الطبية المتقدمة
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed px-4">
            تحليل دقيق للحيوانات المنوية باستخدام أحدث تقنيات الذكاء الاصطناعي الحقيقي
            وفقاً لمعايير منظمة الصحة العالمية WHO 2010
          </p>
        </div>

        {/* Real AI Technology Showcase */}
        <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 card-hover">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-blue-900 dark:text-blue-100 flex items-center justify-center gap-3">
              <Brain className="w-6 h-6 text-blue-600 animate-pulse" />
              تحليل حقيقي بالذكاء الاصطناعي
              <Zap className="w-6 h-6 text-yellow-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Microscope className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-blue-800 dark:text-blue-200">YOLOv8</span>
              </div>
              <div className="text-center p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Brain className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-green-800 dark:text-green-200">DeepSort</span>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 text-center text-sm mb-4">
              🚀 نظام متطور حقيقي يستخدم Koyeb GPU Cloud + OpenCV + CASA المعتمد طبياً
            </p>
            
            <Button 
              onClick={onStartAnalysis}
              className="w-full btn-primary py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              size="lg"
            >
              <Play className="w-6 h-6 mr-3" />
              🔬 ابدأ التحليل الحقيقي الآن
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="dark-card card-hover border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileVideo className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">رفع متطور</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">فيديو وصور مع معالجة ذكية</p>
            </CardContent>
          </Card>

          <Card className="dark-card card-hover border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">تقارير شاملة</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">رسوم بيانية تفاعلية دقيقة</p>
            </CardContent>
          </Card>

          <Card className="dark-card card-hover border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">مساعد طبي ذكي</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">استشارة متخصصة فورية</p>
            </CardContent>
          </Card>

          <Card className="dark-card card-hover border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">حماية متقدمة</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">خصوصية تامة وأمان عالي</p>
            </CardContent>
          </Card>
        </div>

        {/* Process Steps */}
        <Card className="dark-card border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 dark:text-white text-center">
              🚀 كيف يعمل النظام الحقيقي؟
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white">رفع الوسائط</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">ارفع فيديو أو صورة العينة المجهرية</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white">تحليل ذكي حقيقي</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">معالجة بـ Koyeb GPU + YOLOv8 + DeepSort</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white">تقرير طبي معتمد</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">نتائج دقيقة مع استشارة طبية متخصصة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quality Badges */}
        <div className="flex justify-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-xl border border-green-200 dark:border-green-800">
            <Award className="w-4 h-4 text-green-600" />
            <span className="text-xs font-semibold text-green-800 dark:text-green-200">معايير WHO</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-xl border border-blue-200 dark:border-blue-800">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-800 dark:text-blue-200">Koyeb GPU</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-xl border border-purple-200 dark:border-purple-800">
            <Shield className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-semibold text-purple-800 dark:text-purple-200">آمن 100%</span>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="text-center py-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
              طُور بواسطة: <span className="text-blue-600 dark:text-blue-400">يوسف شتيوي</span>
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              مطور تطبيقات طبية متخصص في تقنيات الذكاء الاصطناعي المتقدمة
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">
              🏆 خبرة ودقة تحدد الأمان
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
