import React, { useState, useEffect } from 'react';
import { ActivityConfig } from '../types';
import { CheckCircle, RefreshCw } from 'lucide-react';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'];

interface MemoryGameProps {
  config: ActivityConfig;
  onComplete: (score: number) => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ config, onComplete }) => {
  const [cards, setCards] = useState<{ id: number; emoji: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initializeGame = () => {
    const pairCount = (config.gridSize || 4) / 2;
    const gameEmojis = EMOJIS.slice(0, pairCount);
    const deck = [...gameEmojis, ...gameEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initializeGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.id]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        setCards((prev) =>
          prev.map((card, index) =>
            index === firstIndex || index === secondIndex
              ? { ...card, isMatched: true }
              : card
          )
        );
        setFlippedIndices([]);
      } else {
        const timer = setTimeout(() => {
          setCards((prev) =>
            prev.map((card, index) =>
              index === firstIndex || index === secondIndex
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedIndices([]);
        }, 1000);
        return () => clearTimeout(timer);
      }
      setMoves((m) => m + 1);
    }
  }, [flippedIndices, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setIsWon(true);
      onComplete(Math.max(100 - moves * 5, 10)); // Simple scoring
    }
  }, [cards, moves, onComplete]);

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.length >= 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    setCards((prev) =>
      prev.map((card, i) => (i === index ? { ...card, isFlipped: true } : card))
    );
    setFlippedIndices((prev) => [...prev, index]);
  };

  if (isWon) {
    return (
        <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-bounce-in">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-20 h-20 text-green-500" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800">You Did It!</h2>
            <p className="text-xl text-gray-600">Great memory!</p>
            <button 
                onClick={initializeGame}
                className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-2xl text-xl font-bold hover:bg-green-600 shadow-lg transition-transform active:scale-95"
            >
                <RefreshCw /> Play Again
            </button>
        </div>
    )
  }

  // Grid cols based on complexity
  let gridCols = 'grid-cols-2';
  if (config.gridSize && config.gridSize > 4) gridCols = 'grid-cols-3';
  if (config.gridSize && config.gridSize >= 12) gridCols = 'grid-cols-4';

  return (
    <div className="flex flex-col items-center h-full">
      <div className={`grid ${gridCols} gap-4 w-full max-w-md`}>
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`aspect-square rounded-xl text-4xl md:text-5xl flex items-center justify-center transition-all duration-500 transform shadow-md ${
              card.isFlipped || card.isMatched
                ? 'bg-white rotate-y-180 border-4 border-blue-400'
                : 'bg-blue-400 hover:bg-blue-500'
            }`}
            disabled={card.isMatched}
          >
            <span className={`${card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                {card.emoji}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-8 text-gray-500 font-semibold">Moves: {moves}</div>
    </div>
  );
};

export default MemoryGame;