import React, { useState, useEffect } from 'react';
import { ActivityConfig, MatchingPair } from '../types';
import { generateMatching } from '../utils/languageGenerator';
import { Check, RefreshCw, ArrowDown } from 'lucide-react';

interface MatchingGameProps {
  config: ActivityConfig;
  onComplete: (score: number) => void;
}

const MatchingGame: React.FC<MatchingGameProps> = ({ config, onComplete }) => {
  const [pairs, setPairs] = useState<MatchingPair[]>([]);
  const [leftSide, setLeftSide] = useState<MatchingPair[]>([]);
  const [rightSide, setRightSide] = useState<MatchingPair[]>([]);
  
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]); // IDs that are matched
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    initGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.id]);

  const initGame = () => {
    // Determine topic from subcategory or ID
    let topic = 'SIMPLE_WORDS';
    if (config.subCategory?.includes('Antonyms')) topic = 'ANTONYMS';
    if (config.subCategory?.includes('Synonyms')) topic = 'SYNONYMS';
    if (config.subCategory?.includes('Movements')) topic = 'ANIMALS_MOVE';
    if (config.subCategory?.includes('Vowels')) topic = 'VOWELS';

    const data = generateMatching(topic);
    setPairs(data);
    setLeftSide([...data].sort(() => Math.random() - 0.5));
    setRightSide([...data].sort(() => Math.random() - 0.5));
    setMatchedIds([]);
    setSelectedLeft(null);
    setIsComplete(false);
  };

  const handleLeftClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedLeft(id);
  };

  const handleRightClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    if (!selectedLeft) return;

    if (selectedLeft === id) {
        // Match!
        const newMatched = [...matchedIds, id];
        setMatchedIds(newMatched);
        setSelectedLeft(null);
        if (newMatched.length === pairs.length) {
            setIsComplete(true);
            onComplete(100);
        }
    } else {
        // Wrong
        setSelectedLeft(null);
        // Optional: feedback shake
    }
  };

  if (isComplete) {
      return (
          <div className="flex flex-col items-center justify-center h-full animate-bounce-in">
              <Check className="w-24 h-24 text-green-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-800">All Matched!</h2>
              <button onClick={initGame} className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full flex gap-2 font-bold"><RefreshCw /> Play Again</button>
          </div>
      )
  }

  return (
    <div className="flex flex-col h-full">
        <h2 className="text-center text-xl text-gray-500 font-bold mb-6">Tap left, then tap matching right</h2>
        <div className="flex-1 flex justify-between gap-8 max-w-2xl mx-auto w-full">
            {/* LEFT COL */}
            <div className="flex flex-col gap-4 flex-1">
                {leftSide.map(item => {
                    const isMatched = matchedIds.includes(item.id);
                    const isSelected = selectedLeft === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleLeftClick(item.id)}
                            disabled={isMatched}
                            className={`
                                h-20 rounded-xl shadow-sm border-2 flex items-center justify-center text-2xl font-bold transition-all
                                ${isMatched ? 'bg-green-100 border-green-300 text-green-700 opacity-80 scale-95' : 'bg-white hover:bg-blue-50'}
                                ${isSelected ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-100'}
                            `}
                        >
                            {item.left}
                        </button>
                    );
                })}
            </div>

            {/* RIGHT COL */}
            <div className="flex flex-col gap-4 flex-1">
                {rightSide.map(item => {
                    const isMatched = matchedIds.includes(item.id);
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleRightClick(item.id)}
                            disabled={isMatched}
                            className={`
                                h-20 rounded-xl shadow-sm border-2 flex items-center justify-center text-2xl font-bold transition-all
                                ${isMatched ? 'bg-green-100 border-green-300 text-green-700 opacity-80 scale-95' : 'bg-white hover:bg-orange-50 border-gray-100'}
                            `}
                        >
                            {item.right}
                        </button>
                    );
                })}
            </div>
        </div>
    </div>
  );
};

export default MatchingGame;