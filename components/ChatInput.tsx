
import React from 'react';
import SendIcon from './icons/SendIcon';
import SpinnerIcon from './icons/SpinnerIcon';

interface ChatInputProps {
  userInput: string;
  setUserInput: (input: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ userInput, setUserInput, onSendMessage, isLoading }) => {
    
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-2">
      <div className="relative flex items-center">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about crops, weather, or market prices..."
          disabled={isLoading}
          rows={1}
          className="w-full p-4 pr-16 rounded-full bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none placeholder-gray-500 disabled:opacity-50 transition-all duration-200"
          style={{ minHeight: '56px', paddingTop: '16px' }}
        />
        <button
          onClick={onSendMessage}
          disabled={isLoading || !userInput.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
        >
          {isLoading ? <SpinnerIcon /> : <SendIcon />}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
