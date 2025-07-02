
import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  message: string | React.ReactNode;
  isUser: boolean;
  timestamp?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
          : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      
      {/* Message bubble */}
      <div className={`flex flex-col max-w-[80%] ${
        isUser ? 'items-end' : 'items-start'
      }`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md' 
            : 'bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-md'
        }`}>
          {typeof message === 'string' ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
          ) : (
            <div className="text-sm">{message}</div>
          )}
        </div>
        
        {timestamp && (
          <span className="text-xs text-gray-500 mt-1 px-2">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
