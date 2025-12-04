
import React from 'react';

interface QuickSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  'Crop suitability for maize',
  'Common pests for kale',
  'Price trends for tomatoes',
];

const QuickSuggestions: React.FC<QuickSuggestionsProps> = ({ onSuggestionClick }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {suggestions.map((text, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(text)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300 hover:bg-gray-700 hover:border-green-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default QuickSuggestions;