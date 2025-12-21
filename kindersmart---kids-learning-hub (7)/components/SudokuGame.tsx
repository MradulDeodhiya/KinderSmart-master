import React, { useState, useEffect } from 'react';
import { ActivityConfig, SudokuData } from '../types';
import { generateSudoku4x4 } from '../utils/sudokuGenerator';
import { CheckCircle2, RefreshCw, Trophy } from 'lucide-react';

interface SudokuGameProps {
  config: ActivityConfig;
  onComplete: (score: number) => void;
}

const SudokuGame: React.FC<SudokuGameProps> = ({ config, onComplete }) => {
  const [level, setLevel] = useState(1);
  const [gameData, setGameData] = useState<SudokuData | null>(null);
  const [currentGrid, setCurrentGrid] = useState<(number | null)[]>([]);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);
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
    const mode = config.sudokuMode || 'NUMBER';
    const data = generateSudoku4x4(mode, level);
    setGameData(data);
    setCurrentGrid([...data.initialGrid]);
    setIsSolved(false);
    setSelectedCell(null);
  };

  const handleInput = (val: number) => {
    if (selectedCell === null || !gameData) return;
    // Cannot edit initial cells
    if (gameData.initialGrid[selectedCell] !== null) return;

    const newGrid = [...currentGrid];
    newGrid[selectedCell] = val;
    setCurrentGrid(newGrid);

    // Check if full and correct
    if (!newGrid.includes(null)) {
        const correct = newGrid.every((v, i) => v === gameData.solution[i]);
        if (correct) {
            setIsSolved(true);
            setTimeout(() => {
                setLevel(prev => prev + 1);
            }, 1500);
        }
    }
  };

  const renderCellContent = (val: number | null) => {
      if (val === null) return '';
      if (config.sudokuMode === 'IMAGE') {
          const icons = ['🍎', '🍌', '🍇', '🍊'];
          return icons[val - 1];
      }
      return val;
  };

  if (showWin) return (
      <div className="flex flex-col items-center justify-center h-full animate-bounce-in text-center">
          <Trophy className="w-24 h-24 text-yellow-500 mb-4" />
          <h2 className="text-3xl font-bold">Sudoku Master!</h2>
          <button onClick={() => { setLevel(1); setShowWin(false); }} className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full font-bold flex gap-2"><RefreshCw /> Play Again</button>
      </div>
  );

  if (!gameData) return <div>Loading...</div>;

  const isLinear = config.sudokuLinear; // If we wanted a linear view, but 4x4 is usually grid. Keeping grid for both for UX consistency in this MVP.

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-4 font-bold text-gray-500">Level {level} / 10</div>
      
      {/* GRID */}
      <div className="grid grid-cols-4 gap-1 bg-gray-800 p-2 rounded-lg shadow-xl mb-8 relative">
          {currentGrid.map((val, idx) => {
              // Create visual gaps for 2x2 blocks
              const isRightBorder = (idx + 1) % 2 === 0 && (idx + 1) % 4 !== 0;
              const isBottomBorder = idx >= 4 && idx < 8; // Hardcoded for 4x4 row 1 end
              // Actually gap-1 and CSS grid is easier. Let's rely on basic gap.
              
              // Special styling for 2x2 blocks if we want:
              const marginRight = (idx % 4 === 1) ? 'mr-1' : '';
              const marginBottom = (Math.floor(idx / 4) === 1) ? 'mb-1' : '';

              const isInitial = gameData.initialGrid[idx] !== null;
              const isSelected = selectedCell === idx;

              return (
                  <button
                    key={idx}
                    onClick={() => setSelectedCell(idx)}
                    disabled={isInitial}
                    className={`
                        w-12 h-12 md:w-16 md:h-16 bg-white flex items-center justify-center text-2xl md:text-3xl font-bold rounded-md transition-all
                        ${isInitial ? 'bg-gray-200 text-gray-800' : 'text-blue-600'}
                        ${isSelected ? 'ring-4 ring-blue-400 z-10' : ''}
                        ${marginRight} ${marginBottom}
                    `}
                  >
                      {renderCellContent(val)}
                  </button>
              );
          })}
          
          {isSolved && (
              <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center rounded-lg backdrop-blur-sm animate-bounce-in">
                  <CheckCircle2 className="w-24 h-24 text-green-600 bg-white rounded-full p-2" />
              </div>
          )}
      </div>

      {/* CONTROLS */}
      <div className="flex gap-4">
          {[1, 2, 3, 4].map(num => (
              <button
                key={num}
                onClick={() => handleInput(num)}
                className="w-16 h-16 bg-blue-100 hover:bg-blue-200 rounded-xl flex items-center justify-center text-3xl shadow-sm active:scale-95 transition-transform"
              >
                  {renderCellContent(num)}
              </button>
          ))}
          <button 
            onClick={() => {
                if(selectedCell !== null && gameData.initialGrid[selectedCell] === null) {
                    const newGrid = [...currentGrid];
                    newGrid[selectedCell] = null;
                    setCurrentGrid(newGrid);
                }
            }}
            className="w-16 h-16 bg-red-100 hover:bg-red-200 rounded-xl flex items-center justify-center text-red-500 font-bold shadow-sm"
          >
              X
          </button>
      </div>
    </div>
  );
};

export default SudokuGame;