import React, { useState, useEffect } from 'react';
import { ActivityConfig } from '../types';
import { Check, RefreshCw } from 'lucide-react';

interface PatternGameProps {
  config: ActivityConfig;
  onComplete: (score: number) => void;
}

const SYMBOLS = ['🍎', '🍌', '🍇', '🚗', '✈️', '🐱', '🐶', '⭐', '❤️'];

const PatternGame: React.FC<PatternGameProps> = ({ config, onComplete }) => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generatePattern = () => {
    setIsCorrect(null);
    const complexity = config.patternComplexity || 1;
    
    // Simple ABAB pattern or ABCABC
    const length = complexity === 1 ? 2 : 3;
    const patternBase = SYMBOLS.sort(() => Math.random() - 0.5).slice(0, length);
    
    // Build sequence: ABABA_
    let newSeq: string[] = [];
    for (let i = 0; i < 5; i++) {
        newSeq.push(patternBase[i % length]);
    }
    
    const correctAnswer = patternBase[5 % length];
    setAnswer(correctAnswer);
    setSequence(newSeq);

    // Generate options
    const wrongOptions = SYMBOLS.filter(s => s !== correctAnswer).sort(() => Math.random() - 0.5).slice(0, 3);
    setOptions([correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generatePattern();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.id]);

  const handleSelect = (opt: string) => {
    if (opt === answer) {
        setIsCorrect(true);
        onComplete(50); // Add score
    } else {
        setIsCorrect(false);
        setTimeout(() => setIsCorrect(null), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl text-gray-600 font-bold mb-8">What comes next?</h2>
      
      {/* Pattern Display */}
      <div className="flex items-center gap-2 md:gap-4 mb-12 bg-gray-100 p-6 rounded-3xl">
        {sequence.map((s, i) => (
            <div key={i} className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl flex items-center justify-center text-3xl md:text-4xl shadow-sm">
                {s}
            </div>
        ))}
        <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 border-2 border-dashed border-blue-400 rounded-xl flex items-center justify-center text-2xl font-bold text-blue-400">
            ?
        </div>
      </div>

      {/* Options */}
      {isCorrect ? (
          <div className="flex flex-col items-center animate-bounce-in">
             <h3 className="text-3xl font-bold text-green-500 mb-4 flex items-center gap-2"><Check /> Great Job!</h3>
             <button 
                onClick={generatePattern}
                className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold flex items-center gap-2"
             >
                <RefreshCw /> Next Pattern
             </button>
          </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
            {options.map((opt, i) => (
                <button
                    key={i}
                    onClick={() => handleSelect(opt)}
                    className="w-16 h-16 md:w-20 md:h-20 bg-white hover:bg-yellow-50 border-b-4 border-gray-200 active:border-b-0 active:mt-1 rounded-2xl text-4xl flex items-center justify-center transition-all"
                >
                    {opt}
                </button>
            ))}
        </div>
      )}
      {isCorrect === false && <p className="mt-4 text-red-500 font-bold animate-shake">Try again!</p>}
    </div>
  );
};

export default PatternGame;