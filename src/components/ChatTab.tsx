
import React from 'react';
import EnhancedMedicalChat from '@/components/EnhancedMedicalChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Bot } from 'lucide-react';

interface ChatTabProps {
  analysisId?: string;
}

const ChatTab: React.FC<ChatTabProps> = ({ analysisId }) => {
  return (
    <div className="px-4 py-6 h-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Bot className="w-8 h-8 text-purple-400" />
          المساعد الطبي الذكي
        </h2>
        <p className="text-gray-400">
          احصل على استشارة طبية متخصصة حول نتائج التحليل
        </p>
      </div>
      
      {analysisId ? (
        <EnhancedMedicalChat analysisId={analysisId} />
      ) : (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-center text-white flex items-center justify-center gap-2">
              <MessageCircle className="w-6 h-6 text-orange-400" />
              لا توجد نتائج تحليل متاحة
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-400">
            <p className="mb-4">
              يرجى إجراء تحليل أولاً للحصول على استشارة طبية متخصصة
            </p>
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-200 mb-2">💡 نصائح:</h4>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• قم برفع فيديو للعينة المجهرية</li>
                <li>• انتظر انتهاء عملية التحليل بالذكاء الاصطناعي</li>
                <li>• ستتمكن من المحادثة مع المساعد الطبي</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChatTab;
