
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, FileVideo, Microscope, BarChart3, MessageCircle, Shield, Clock, Award } from 'lucide-react';

interface HomeTabProps {
  onStartAnalysis: () => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ onStartAnalysis }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Hero Section */}
        <div className="text-center py-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl shadow-2xl inline-block mb-6">
            <img 
              src="/lovable-uploads/e4f41878-e368-4bc6-9ae8-93a9feef83c8.png" 
              alt="ابن سينا للتحاليل الطبية" 
              className="w-16 h-16 mx-auto object-contain bg-white rounded-xl p-2"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            مرحباً بك في ابن سينا
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            للتحاليل الطبية المتقدمة
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            تحليل دقيق للحيوانات المنوية باستخدام أحدث تقنيات الذكاء الاصطناعي
            وفقاً لمعايير منظمة الصحة العالمية WHO 2010
          </p>
        </div>

        {/* Quick Start Card */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-blue-900 flex items-center justify-center gap-2">
              <Microscope className="w-6 h-6" />
              ابدأ التحليل الآن
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 text-center text-sm">
              ارفع فيديو لعينة الحيوانات المنوية واحصل على تقرير طبي شامل خلال دقائق
            </p>
            <Button 
              onClick={onStartAnalysis}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 text-lg font-semibold rounded-xl shadow-lg"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              ابدأ التحليل
            </Button>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <FileVideo className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-sm text-gray-900 mb-1">رفع سهل</h3>
              <p className="text-xs text-gray-600">رفع فيديو العينة بكل سهولة</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-sm text-gray-900 mb-1">تقارير مفصلة</h3>
              <p className="text-xs text-gray-600">رسوم بيانية تفاعلية</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-sm text-gray-900 mb-1">مساعد ذكي</h3>
              <p className="text-xs text-gray-600">استشارة طبية فورية</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-semibold text-sm text-gray-900 mb-1">آمن ومحمي</h3>
              <p className="text-xs text-gray-600">خصوصية تامة للبيانات</p>
            </CardContent>
          </Card>
        </div>

        {/* Process Steps */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 text-center">
              كيف يعمل التطبيق؟
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h4 className="font-semibold text-sm text-gray-900">ارفع الفيديو</h4>
                <p className="text-xs text-gray-600">ارفع فيديو عينة الحيوانات المنوية</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h4 className="font-semibold text-sm text-gray-900">تحليل ذكي</h4>
                <p className="text-xs text-gray-600">تحليل بالذكاء الاصطناعي خلال دقائق</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h4 className="font-semibold text-sm text-gray-900">احصل على التقرير</h4>
                <p className="text-xs text-gray-600">تقرير طبي شامل مع استشارة ذكية</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quality Badges */}
        <div className="flex justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
            <Award className="w-4 h-4 text-green-600" />
            <span className="text-xs font-semibold text-green-800">معايير WHO</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-800">نتائج سريعة</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg border border-purple-200">
            <Shield className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-semibold text-purple-800">آمن 100%</span>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="text-center py-4">
          <p className="text-xs text-gray-500">
            طُور بواسطة: <span className="font-semibold text-gray-700">يوسف شتيوي</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            مطور تطبيقات طبية متخصص في تقنيات الذكاء الاصطناعي
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
