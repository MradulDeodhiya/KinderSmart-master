import React, { useState, useEffect } from 'react';
import { ActivityConfig, MathLevelData } from '../types';
import { generateMathLevel } from '../utils/mathGenerator';
import { Check, X, ArrowRight, RefreshCw, Trophy } from 'lucide-react';

interface MathGameProps {
  config: ActivityConfig;
  onComplete: (score: number) => void;
}

const MathGame: React.FC<MathGameProps> = ({ config, onComplete }) => {
  const [level, setLevel] = useState(1);
  const [data, setData] = useState<MathLevelData | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showWin, setShowWin] = useState(false);

  useEffect(() => {
    loadLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, config.id]);

  const loadLevel = () => {
    if (level > 10) {
        setShowWin(true);
        onComplete(100);
        return;
    }
    const levelData = generateMathLevel(config.id, level);
    setData(levelData);
    setInputValue('');
    setFeedback(null);
  };

  const checkAnswer = (val: string) => {
    if (!data) return;
    
    // Normalize comparison
    if (val.trim().toLowerCase() === data.correctAnswer.toLowerCase()) {
        setFeedback('correct');
        setTimeout(() => {
            setLevel(prev => prev + 1);
        }, 1000);
    } else {
        setFeedback('wrong');
        setTimeout(() => {
            setFeedback(null);
            setInputValue('');
        }, 1000);
    }
  };

  const handleKeypadClick = (key: string) => {
    if (feedback) return;
    if (key === 'DEL') {
        setInputValue(prev => prev.slice(0, -1));
    } else if (key === 'ENTER') {
        checkAnswer(inputValue);
    } else {
        setInputValue(prev => prev + key);
    }
  };

  if (showWin) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center animate-bounce-in">
             <Trophy className="w-24 h-24 text-yellow-500 mb-6" />
             <h2 className="text-4xl font-bold text-gray-800 mb-2">Level Complete!</h2>
             <p className="text-gray-500 mb-8">You finished all 10 levels.</p>
             <button 
                onClick={() => { setLevel(1); setShowWin(false); }}
                className="px-8 py-3 bg-blue-500 text-white rounded-full font-bold flex items-center gap-2 hover:bg-blue-600"
             >
                <RefreshCw /> Play Again
             </button>
        </div>
      );
  }

  if (!data) return <div>Loading...</div>;

  const isKeypad = config.inputMode === 'KEYPAD';

  return (
    <div className="flex flex-col items-center h-full max-w-2xl mx-auto">
      {/* Level Indicator */}
      <div className="w-full flex justify-between items-center mb-4 px-4">
         <span className="font-bold text-gray-400">Level {level}/10</span>
         <div className="flex gap-1">
             {Array.from({length: 10}).map((_, i) => (
                 <div key={i} className={`h-2 w-4 rounded-full ${i < level ? 'bg-green-500' : 'bg-gray-200'}`} />
             ))}
         </div>
      </div>

      {/* Visual Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[200px]">
          {data.visual}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-6 mb-8 text-center">{data.question}</h2>
          
          {isKeypad && (
              <div className={`
                  min-w-[150px] h-16 border-b-4 border-gray-300 text-4xl text-center flex items-center justify-center font-mono font-bold
                  ${feedback === 'correct' ? 'text-green-500 border-green-500' : ''}
                  ${feedback === 'wrong' ? 'text-red-500 border-red-500 animate-shake' : 'text-gray-700'}
              `}>
                  {inputValue}
                  {!inputValue && <span className="animate-pulse opacity-20">|</span>}
              </div>
          )}
      </div>

      {/* Input Area */}
      <div className="w-full mt-auto pb-4">
          {isKeypad ? (
              // KEYPAD
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                      <button 
                        key={n} 
                        onClick={() => handleKeypadClick(n.toString())}
                        className="h-16 rounded-xl bg-white border-2 border-gray-200 text-gray-800 text-3xl font-bold shadow-sm hover:bg-blue-50 hover:border-blue-300 active:translate-y-1 transition-all"
                      >
                          {n}
                      </button>
                  ))}
                  <button onClick={() => handleKeypadClick('DEL')} className="h-16 rounded-xl bg-red-50 border-2 border-red-100 hover:bg-red-100 text-red-600 font-bold shadow-sm">DEL</button>
                  <button onClick={() => handleKeypadClick('0')} className="h-16 rounded-xl bg-white border-2 border-gray-200 text-gray-800 text-3xl font-bold shadow-sm hover:bg-blue-50 hover:border-blue-300 active:translate-y-1 transition-all">0</button>
                  <button onClick={() => handleKeypadClick('ENTER')} className="h-16 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold flex items-center justify-center shadow-md">
                      <ArrowRight />
                  </button>
              </div>
          ) : (
              // OPTIONS GRID
              <div className="grid grid-cols-2 gap-4 w-full">
                  {data.options?.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => checkAnswer(opt)}
                        disabled={feedback !== null}
                        className={`
                            p-6 rounded-2xl text-2xl md:text-3xl font-bold shadow-md transition-all transform hover:-translate-y-1 active:scale-95
                            ${feedback === 'correct' && opt === data.correctAnswer ? 'bg-green-500 text-white' : ''}
                            ${feedback === 'wrong' && opt !== data.correctAnswer ? 'opacity-50' : ''}
                            ${feedback === null ? 'bg-white text-blue-600 border-2 border-blue-50 hover:border-blue-200' : ''}
                        `}
                      >
                          {opt}
                      </button>
                  ))}
              </div>
          )}
      </div>
      
      {/* Feedback Overlay (Optional simple pop) */}
      {feedback === 'correct' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="bg-white/90 p-8 rounded-full shadow-2xl animate-bounce-in">
                  <Check className="w-24 h-24 text-green-500" strokeWidth={3} />
              </div>
          </div>
      )}
    </div>
  );
};

export default MathGame;