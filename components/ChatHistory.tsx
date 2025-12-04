
import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import ChatMessage from './ChatMessage';
import BotIcon from './icons/BotIcon';
import SpinnerIcon from './icons/SpinnerIcon';

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="space-y-6">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
      {isLoading && (
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-800 flex items-center justify-center">
            <BotIcon />
          </div>
          <div className="bg-gray-800 rounded-lg p-4 max-w-2xl flex items-center space-x-2">
            <SpinnerIcon />
            <span className="text-gray-400 animate-pulse">AgroSafi is thinking...</span>
          </div>
        </div>
      )}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatHistory;
