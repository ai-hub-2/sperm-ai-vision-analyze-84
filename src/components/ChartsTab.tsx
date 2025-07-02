
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Activity, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface ChartsTabProps {
  analysisData?: any;
}

const ChartsTab: React.FC<ChartsTabProps> = ({ analysisData }) => {
  // Sample data for demonstration
  const motilityData = [
    { name: 'متحرك تقدمي', value: analysisData?.motility?.progressive || 45, color: '#10B981' },
    { name: 'متحرك غير تقدمي', value: analysisData?.motility?.non_progressive || 25, color: '#F59E0B' },
    { name: 'غير متحرك', value: analysisData?.motility?.immotile || 30, color: '#EF4444' }
  ];

  const morphologyData = [
    { name: 'طبيعي', value: analysisData?.morphology?.normal || 35, color: '#10B981' },
    { name: 'غير طبيعي', value: analysisData?.morphology?.abnormal || 65, color: '#EF4444' }
  ];

  const concentrationHistory = [
    { month: 'يناير', concentration: 20 },
    { month: 'فبراير', concentration: 25 },
    { month: 'مارس', concentration: 30 },
    { month: 'أبريل', concentration: analysisData?.concentration || 28 }
  ];

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <BarChart3 className="w-8 h-8 text-pink-400" />
          الرسوم البيانية والإحصائيات
        </h2>
        <p className="text-gray-400">
          تحليل بصري شامل لنتائج الفحص المجهري
        </p>
      </div>

      {!analysisData ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">لا توجد بيانات متاحة</h3>
            <p className="text-gray-400 mb-6">قم بإجراء تحليل أولاً لرؤية الرسوم البيانية</p>
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
              <p className="text-blue-200 text-sm">
                💡 ستظهر هنا الرسوم البيانية التفاعلية بعد إجراء التحليل
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Motility Chart */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                حركة الحيوانات المنوية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={motilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {motilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {motilityData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-300">{item.name}</span>
                    </div>
                    <span className="text-white font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Morphology Chart */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                شكل الحيوانات المنوية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={morphologyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => `${value}%`} 
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Concentration Trend */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                اتجاه التركيز (مليون/مل)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={concentrationHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [`${value} مليون/مل`, 'التركيز']} 
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  />
                  <Line type="monotone" dataKey="concentration" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">الإحصائيات الرئيسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 text-center">
                  <p className="text-blue-200 text-sm">العدد الكلي</p>
                  <p className="text-white text-xl font-bold">{analysisData?.sperm_count || 150}M</p>
                </div>
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3 text-center">
                  <p className="text-green-200 text-sm">التركيز</p>
                  <p className="text-white text-xl font-bold">{analysisData?.concentration || 28}M/ml</p>
                </div>
                <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3 text-center">
                  <p className="text-purple-200 text-sm">الحيوية</p>
                  <p className="text-white text-xl font-bold">{analysisData?.vitality || 75}%</p>
                </div>
                <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-3 text-center">
                  <p className="text-orange-200 text-sm">السرعة المتوسطة</p>
                  <p className="text-white text-xl font-bold">{analysisData?.speed_avg || 25}μm/s</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChartsTab;
