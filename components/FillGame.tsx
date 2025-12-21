import React, { useState, useEffect } from 'react';
import { ActivityConfig, FillData } from '../types';
import { generateVocabFill } from '../utils/languageGenerator';
import { Check, ArrowRight } from 'lucide-react';

interface FillGameProps {
  config: ActivityConfig;
  onComplete: (score: number) => void;
}

const FillGame: React.FC<FillGameProps> = ({ config, onComplete }) => {
  const [level, setLevel] = useState(1);
  const [data, setData] = useState<FillData | null>(null);
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Determine type
    let type: any = '3LETTER';
    if (config.subCategory?.includes('Four')) type = '4LETTER';
    if (config.subCategory?.includes('Complete')) type = 'COMPLETE';
    
    setData(generateVocabFill(type, level));
    setInput('');
    setIsCorrect(false);
  }, [level, config.id]);

  const handleKey = (char: string) => {
      // Single char input logic usually for missing letter
      if (char === 'DEL') setInput('');
      else if (char === 'ENTER') check();
      else setInput(char); // Replace mode for single letter
  };

  const check = () => {
      if (!data) return;
      if (input.toLowerCase() === data.answer.toLowerCase()) {
          setIsCorrect(true);
          onComplete(100);
          setTimeout(() => setLevel(l => l + 1), 1500);
      } else {
          // error
          setInput('');
      }
  };

  if (!data) return <div>Loading...</div>;

  const keyboard = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  return (
    <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-gray-500 mb-8">Fill the missing letter</h2>

        <div className="text-6xl font-mono font-bold tracking-widest mb-12 text-gray-800">
            {data.question.replace('_', input || '_')}
        </div>

        {isCorrect && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 animate-fade-in">
                 <div className="flex flex-col items-center">
                    <Check className="w-24 h-24 text-green-500 mb-4" />
                    <div className="text-5xl font-bold text-green-600">{data.fullWord}</div>
                 </div>
            </div>
        )}

        {/* Keyboard */}
        <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
            {keyboard.map(k => (
                <button
                    key={k}
                    onClick={() => handleKey(k)}
                    className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-200 font-bold text-xl hover:bg-blue-50 active:bg-blue-100"
                >
                    {k}
                </button>
            ))}
            <button onClick={() => check()} className="px-6 h-12 bg-green-500 text-white rounded-lg font-bold flex items-center"><ArrowRight /></button>
        </div>
    </div>
  );
};

export default FillGame;