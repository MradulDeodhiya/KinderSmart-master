import React, { useState, useEffect } from 'react';
import { ActivityConfig } from '../types';
import { generateSentence } from '../utils/languageGenerator';
import { Check, RefreshCw } from 'lucide-react';

interface SentenceGameProps {
  config: ActivityConfig;
  onComplete: (score: number) => void;
}

const SentenceGame: React.FC<SentenceGameProps> = ({ config, onComplete }) => {
  const [level, setLevel] = useState(1);
  const [words, setWords] = useState<{id: number, text: string}[]>([]);
  const [correctOrder, setCorrectOrder] = useState('');
  const [placedWords, setPlacedWords] = useState<{id: number, text: string}[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    loadLevel();
  }, [level]);

  const loadLevel = () => {
    const data = generateSentence(level);
    setCorrectOrder(data.correctSentence);
    setWords(data.words.map((w, i) => ({ id: i, text: w })));
    setPlacedWords([]);
    setIsCorrect(false);
  };

  const handleWordClick = (wordObj: {id: number, text: string}) => {
    // Move from bank to placed
    setWords(prev => prev.filter(w => w.id !== wordObj.id));
    setPlacedWords(prev => [...prev, wordObj]);
  };

  const handlePlacedClick = (wordObj: {id: number, text: string}) => {
      // Move back to bank
      setPlacedWords(prev => prev.filter(w => w.id !== wordObj.id));
      setWords(prev => [...prev, wordObj]);
  };

  const checkSentence = () => {
      const constructed = placedWords.map(w => w.text).join(' ');
      if (constructed === correctOrder) {
          setIsCorrect(true);
          onComplete(100);
          setTimeout(() => setLevel(l => l + 1), 1500);
      } else {
          // Shake or reset?
          // For kindergarten, maybe auto-reset incorrect?
          // Just let them adjust
      }
  };

  if (isCorrect) {
      return (
          <div className="flex flex-col items-center justify-center h-full animate-bounce-in">
              <Check className="w-24 h-24 text-green-500" />
              <h2 className="text-2xl font-bold text-green-600 mt-4">{correctOrder}</h2>
              <p className="text-gray-400 mt-2">Great Job!</p>
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center h-full pt-10">
        <h2 className="text-xl font-bold text-gray-500 mb-8">Order the Sentence</h2>

        {/* Drop Zone */}
        <div className="w-full min-h-[100px] bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl p-4 flex flex-wrap gap-2 mb-8 items-center justify-center">
            {placedWords.length === 0 && <span className="text-gray-400 italic">Tap words to place here</span>}
            {placedWords.map(w => (
                <button 
                    key={w.id} 
                    onClick={() => handlePlacedClick(w)}
                    className="px-4 py-2 bg-white rounded-lg shadow-sm border border-blue-200 font-bold text-xl animate-fade-in"
                >
                    {w.text}
                </button>
            ))}
        </div>

        {/* Word Bank */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
            {words.map(w => (
                <button
                    key={w.id}
                    onClick={() => handleWordClick(w)}
                    className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg shadow-sm border border-yellow-200 font-bold text-xl"
                >
                    {w.text}
                </button>
            ))}
        </div>

        {placedWords.length > 0 && words.length === 0 && (
            <button 
                onClick={checkSentence}
                className="px-10 py-4 bg-green-500 text-white font-bold rounded-full text-xl shadow-lg hover:bg-green-600 active:scale-95 transition-transform"
            >
                Check
            </button>
        )}
    </div>
  );
};

export default SentenceGame;