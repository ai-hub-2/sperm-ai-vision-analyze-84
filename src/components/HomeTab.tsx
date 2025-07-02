
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Microscope, Zap, BarChart3, Bot, Shield, Clock, Sparkles } from 'lucide-react';

interface HomeTabProps {
  onStartAnalysis: () => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ onStartAnalysis }) => {
  const features = [
    {
      icon: Zap,
      title: 'تحليل فوري بالذكاء الاصطناعي',
      description: 'نتائج دقيقة في دقائق معدودة'
    },
    {
      icon: BarChart3,
      title: 'تقارير مفصلة ورسوم بيانية',
      description: 'تصور واضح للبيانات والإحصائيات'
    },
    {
      icon: Bot,
      title: 'مساعد طبي ذكي متخصص',
      description: 'استشارات فورية وتوضيحات مهنية'
    },
    {
      icon: Shield,
      title: 'خصوصية وأمان تام',
      description: 'بياناتك محمية بأعلى معايير الأمان'
    }
  ];

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-3xl shadow-2xl inline-block">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
            <img 
              src="/lovable-uploads/401db8f5-2cde-408d-8dfb-eda0c70dbc6e.png" 
              alt="SpermAI Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            SpermAI
          </h1>
          <p className="text-xl text-gray-300 font-medium">
            منصة التحليل الذكي للعينات المجهرية
          </p>
          <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
            تحليل شامل ودقيق للعينات باستخدام أحدث تقنيات الذكاء الاصطناعي والتعلم العميق
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Button 
          onClick={onStartAnalysis}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Sparkles className="w-6 h-6 ml-2" />
          ابدأ التحليل الآن
        </Button>
        <p className="text-sm text-green-400 mt-2">
          🚀 تحليل مجاني وفوري
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <Card className="bg-gradient-to-r from-purple-800/20 to-blue-800/20 border-purple-600/30">
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-400">99.2%</div>
              <div className="text-xs text-gray-400">دقة التحليل</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">2-5</div>
              <div className="text-xs text-gray-400">دقائق</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">10K+</div>
              <div className="text-xs text-gray-400">تحليل مكتمل</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process Steps */}
      <Card className="bg-gray-800/30 border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-white flex items-center justify-center gap-2">
            <Clock className="w-5 h-5" />
            كيف يعمل التحليل؟
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
            <div className="flex-1">
              <p className="text-white font-medium">رفع فيديو العينة</p>
              <p className="text-gray-400 text-sm">قم بتصوير العينة تحت المجهر لمدة 30-60 ثانية</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
            <div className="flex-1">
              <p className="text-white font-medium">معالجة بالذكاء الاصطناعي</p>
              <p className="text-gray-400 text-sm">تحليل تلقائي للحركة والعدد والتشكل</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
            <div className="flex-1">
              <p className="text-white font-medium">تقرير شامل مع مساعد ذكي</p>
              <p className="text-gray-400 text-sm">نتائج مفصلة مع رسوم بيانية ومساعد طبي</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Disclaimer */}
      <Card className="bg-orange-900/20 border-orange-600/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-orange-300 font-medium mb-1">⚕️ إخلاء مسؤولية طبية</p>
              <p className="text-orange-200 text-xs leading-relaxed">
                هذا التطبيق للأغراض التعليمية والإرشادية فقط. يُرجى استشارة طبيب مختص للحصول على تشخيص دقيق وخطة علاجية مناسبة.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeTab;
