
import React, { useState, useRef, useEffect } from 'react';
import { Message, Role, Coords, LocationStatus } from './types';
import { getAgroSafiResponse } from './services/geminiService';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import QuickSuggestions from './components/QuickSuggestions';
import LocationButton from './components/LocationButton';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: Role.AI,
      content: "Jambo! I am AgroSafi AI. For the best advice, please share your location. How can I help you with your farm today?",
    },
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [coords, setCoords] = useState<Coords | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setLocationStatus('fetching');
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationStatus('success');
      },
      (error) => {
        setLocationStatus('error');
        setLocationError(error.message);
        setCoords(null);
      }
    );
  };

  const handleSendMessage = async (promptOverride?: string) => {
    const messageToSend = promptOverride || userInput;
    if (messageToSend.trim() === '' || isLoading) return;
    
    let finalPrompt = messageToSend;
    if (coords) {
        finalPrompt = `My location is latitude: ${coords.latitude}, longitude: ${coords.longitude}. My question is: ${messageToSend}`;
    }

    const userMessage: Message = { role: Role.User, content: messageToSend };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await getAgroSafiResponse(finalPrompt);
      const aiMessage: Message = { role: Role.AI, content: aiResponse };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      const errorMessageObj: Message = { role: Role.AI, content: `Sorry, I encountered an error: ${errorMessage}` };
      setMessages(prevMessages => [...prevMessages, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800 shadow-lg p-4 z-10">
        <h1 className="text-2xl font-bold text-center text-green-400">🚜 AgroSafi AI</h1>
        <p className="text-center text-sm text-gray-400">Your Farming Intelligence Partner</p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <ChatHistory messages={messages} isLoading={isLoading} />
      </main>
      
      {(error || locationError) && (
        <div className="px-4 pb-2 text-red-400 text-center text-sm">
          {error && <p>Chat Error: {error}</p>}
          {locationError && <p>Location Error: {locationError}</p>}
        </div>
      )}

      <footer className="p-4 bg-gray-900 sticky bottom-0">
          {!isLoading && (
            <div className="w-full max-w-3xl mx-auto mb-4 flex flex-wrap justify-center items-center gap-2">
                 <QuickSuggestions onSuggestionClick={handleSendMessage} />
                 <LocationButton status={locationStatus} onClick={handleGetLocation} />
            </div>
          )}
          <ChatInput
            userInput={userInput}
            setUserInput={setUserInput}
            onSendMessage={() => handleSendMessage()}
            isLoading={isLoading}
          />
      </footer>
    </div>
  );
};

export default App;