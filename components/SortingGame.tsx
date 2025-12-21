import React, { useState, useEffect } from 'react';
import { ActivityConfig } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface SortingGameProps {
  config: ActivityConfig;
  onComplete: (score: number) => void;
}

const SortingGame: React.FC<SortingGameProps> = ({ config, onComplete }) => {
  const [items, setItems] = useState<{id: number, val: string | number, display: React.ReactNode}[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);

  const initGame = () => {
    setSuccess(false);
    if (config.id.includes('2')) {
        // Alphabetical
        const letters = ['A', 'B', 'C', 'D', 'E'].sort(() => Math.random() - 0.5);
        setItems(letters.map((l, i) => ({ id: i, val: l, display: <span className="text-4xl font-bold text-purple-600">{l}</span> })));
    } else {
        // Size/Number (Visual representation of size)
        const sizes = [1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);
        setItems(sizes.map((s, i) => ({ 
            id: i, 
            val: s, 
            display: <div className="bg-cyan-400 rounded-full shadow-md" style={{ width: s * 15 + 20, height: s * 15 + 20 }}></div> 
        })));
    }
  };

  useEffect(() => {
    initGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.id]);

  const handleItemClick = (index: number) => {
    if (selectedId === null) {
        setSelectedId(index);
    } else {
        // Swap
        const newItems = [...items];
        const temp = newItems[selectedId];
        newItems[selectedId] = newItems[index];
        newItems[index] = temp;
        setItems(newItems);
        setSelectedId(null);
        checkOrder(newItems);
    }
  };

  const checkOrder = (currentItems: typeof items) => {
      const isSorted = currentItems.every((item, i, arr) => !i || item.val >= arr[i-1].val);
      if (isSorted) {
          setSuccess(true);
          onComplete(100);
      }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold text-gray-700 mb-2">
        {config.id.includes('2') ? "Put letters in ABC order" : "Order from Smallest to Biggest"}
      </h2>
      <p className="text-gray-400 mb-10">Tap two items to swap them</p>

      {success ? (
          <div className="text-center animate-bounce">
              <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-green-600">Correct Order!</h3>
              <button onClick={initGame} className="mt-8 px-6 py-2 bg-white border-2 border-cyan-400 text-cyan-600 font-bold rounded-full hover:bg-cyan-50">Play Again</button>
          </div>
      ) : (
        <div className="flex items-end gap-4 h-40">
            {items.map((item, index) => (
                <button 
                    key={item.id}
                    onClick={() => handleItemClick(index)}
                    className={`
                        flex items-center justify-center p-2 rounded-xl transition-all
                        ${selectedId === index ? 'ring-4 ring-yellow-400 transform -translate-y-4' : 'hover:bg-gray-50'}
                    `}
                >
                    {item.display}
                </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default SortingGame;