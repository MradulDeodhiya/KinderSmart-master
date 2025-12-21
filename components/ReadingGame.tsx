import React from 'react';
import { ActivityConfig } from '../types';
import { getReadingContent } from '../utils/languageGenerator';
import { BookOpen, Star } from 'lucide-react';

interface ReadingGameProps {
  config: ActivityConfig;
  onComplete: (score: number) => void; // Simple complete on read
}

const ReadingGame: React.FC<ReadingGameProps> = ({ config, onComplete }) => {
  const text = getReadingContent(config.id);

  const handleFinish = () => {
      onComplete(100);
  };

  return (
    <div className="flex flex-col items-center h-full max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="w-12 h-12 text-sky-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">{config.title}</h2>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-left w-full mb-8">
            <p className="text-2xl leading-relaxed font-medium text-gray-700">
                {text}
            </p>
        </div>

        <button 
            onClick={handleFinish}
            className="px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-full font-bold text-xl flex items-center gap-2 shadow-lg transform transition hover:scale-105"
        >
            <Star className="fill-current" /> I Read It!
        </button>
    </div>
  );
};

export default ReadingGame;