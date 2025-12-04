
import React from 'react';
import { Message, Role, ParsedInsight, ChartJsData } from '../types';
import { INSIGHT_CONFIG } from '../constants';
import BotIcon from './icons/BotIcon';
import UserIcon from './icons/UserIcon';
import DataChart from './DataChart';

interface ChatMessageProps {
  message: Message;
}

// Helper to parse the AI's structured response, now with chart data support
const parseAIResponse = (content: string): {
  insights: ParsedInsight[] | null;
  chartData: ChartJsData | null;
  rawText: string;
} => {
  let textToParse = content;
  let chartData: ChartJsData | null = null;

  const chartRegex = /\[CHART_DATA\]([\s\S]*?)\[\/CHART_DATA\]/;
  const chartMatch = textToParse.match(chartRegex);

  if (chartMatch && chartMatch[1]) {
    try {
      const parsedJson = JSON.parse(chartMatch[1].trim());
      // Basic validation to ensure it looks like a chart object
      if (parsedJson.type && parsedJson.labels && parsedJson.datasets) {
         chartData = parsedJson;
      }
      textToParse = textToParse.replace(chartRegex, '').trim();
    } catch (e) {
      console.error("Failed to parse chart JSON:", e);
    }
  }

  const sections = textToParse.split('✔').map(s => s.trim()).filter(Boolean);
  
  if (sections.length === 0) {
    // No structured insights found, return raw text and any chart data
    return { insights: null, chartData, rawText: textToParse };
  }

  const insights = sections.map(section => {
    const lines = section.split('\n');
    const title = lines[0].trim();
    const contentText = lines.slice(1).join('\n').trim();
    return { title, content: contentText };
  });
  
  // If we have insights, we don't need to return the raw text
  return { insights, chartData, rawText: '' };
};


const StructuredResponse: React.FC<{ insights: ParsedInsight[] }> = ({ insights }) => {
  return (
    <div className="space-y-4">
      {insights.map((insight, index) => {
        const keyword = insight.title.toUpperCase().split(' ')[0].replace('STEP-BY-STEP', 'ACTION');
        const config = INSIGHT_CONFIG[keyword] || null;

        if (!config) {
            return (
                <div key={index} className="p-2 border-l-4 border-gray-500">
                    <h4 className="font-bold">{insight.title}</h4>
                    <p className="whitespace-pre-wrap text-gray-300">{insight.content}</p>
                </div>
            );
        }

        return (
          <div key={index} className={`p-4 border-l-4 ${config.color} bg-gray-800/50 rounded-r-lg`}>
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-green-400">{config.icon}</span>
              <h4 className="font-bold text-green-400 text-lg">{config.title}</h4>
            </div>
            <p className="whitespace-pre-wrap text-gray-200 ml-9">{insight.content}</p>
          </div>
        );
      })}
    </div>
  );
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAI = message.role === Role.AI;

  if (isAI) {
    const { insights, chartData, rawText } = parseAIResponse(message.content);
    return (
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-800 flex items-center justify-center">
          <BotIcon />
        </div>
        <div className="bg-gray-800 rounded-lg p-4 max-w-2xl w-full">
            <div className="space-y-4">
                {insights && <StructuredResponse insights={insights} />}
                {!insights && rawText && <p className="whitespace-pre-wrap">{rawText}</p>}
                {chartData && <DataChart chartData={chartData} />}
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-end space-x-4">
      <div className="bg-blue-600 rounded-lg p-4 max-w-2xl">
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center">
        <UserIcon />
      </div>
    </div>
  );
};

export default ChatMessage;