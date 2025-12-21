import React from 'react';
import { MathLevelData } from '../types';

// Helper to generate random int
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateMathLevel = (id: string, level: number): MathLevelData => {
  // Difficulty scaling: Level 1 is easiest, Level 10 is hardest
  
  // --- Biggest Number ---
  if (id.startsWith('math-biggest')) {
      const range = (level + 1) * 10;
      const opts: number[] = [];
      // Generate 4 distinct numbers
      while(opts.length < 4) {
          const n = randomInt(1, range);
          if(!opts.includes(n)) opts.push(n);
      }
      const max = Math.max(...opts);
      return {
          question: "Which is the Biggest?",
          correctAnswer: max.toString(),
          options: opts.map(n => n.toString()) // Order is already random from generation
      };
  }

  // --- Smallest Number ---
  if (id.startsWith('math-smallest')) {
      const range = (level + 1) * 10;
      const opts: number[] = [];
      while(opts.length < 4) {
          const n = randomInt(1, range);
          if(!opts.includes(n)) opts.push(n);
      }
      const min = Math.min(...opts);
      return {
          question: "Which is the Smallest?",
          correctAnswer: min.toString(),
          options: opts.map(n => n.toString())
      };
  }

  // --- Fractions ---
  if (id.includes('fraction')) {
      const fractions = [
          { num: 1, den: 2, label: '1/2' },
          { num: 1, den: 3, label: '1/3' },
          { num: 1, den: 4, label: '1/4' },
          { num: 2, den: 4, label: '2/4' },
          { num: 3, den: 4, label: '3/4' },
          { num: 2, den: 3, label: '2/3' },
          { num: 1, den: 1, label: '1/1' },
      ];
      
      // Filter difficulty slightly? Or just pick random.
      const target = fractions[randomInt(0, fractions.length - 1)];
      const percent = (target.num / target.den) * 100;
      
      // Generate distinct wrong options
      const optionsSet = new Set<string>();
      optionsSet.add(target.label);
      while(optionsSet.size < 4) {
          const rand = fractions[randomInt(0, fractions.length - 1)];
          optionsSet.add(rand.label);
      }

      return {
          question: "What fraction is blue?",
          correctAnswer: target.label,
          options: Array.from(optionsSet).sort(() => Math.random() - 0.5),
          visual: React.createElement('div', { 
              className: "w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-gray-800 bg-white relative shadow-lg transition-all",
              style: { 
                  background: `conic-gradient(#3b82f6 0% ${percent}%, #ffffff ${percent}% 100%)` 
              }
          })
      };
  }

  // --- Find Value (Place Value) ---
  // Supports 'math-find-val-100' and 'math-find-value-{n}'
  if (id.includes('find-val') || id.includes('find-value')) {
      const tens = randomInt(1, level + 2);
      const ones = randomInt(0, 9);
      const total = (tens * 10) + ones;
      
      // Visual: Blocks
      // Tens: Tall bars, Ones: Small squares
      const visual = React.createElement('div', { className: "flex gap-4 items-end justify-center mb-4" },
          React.createElement('div', { className: "flex gap-1" }, 
             Array.from({length: tens}).map((_, i) => 
                 React.createElement('div', { key: `t-${i}`, className: "w-6 h-24 bg-blue-500 border border-blue-700 rounded-sm flex flex-col justify-between py-1" },
                     Array.from({length: 9}).map((__, j) => React.createElement('div', { key: j, className: "w-full h-px bg-blue-400/50" }))
                 )
             )
          ),
          React.createElement('div', { className: "grid grid-cols-2 gap-1" },
             Array.from({length: ones}).map((_, i) => 
                 React.createElement('div', { key: `o-${i}`, className: "w-6 h-6 bg-yellow-400 border border-yellow-600 rounded-sm" })
             )
          )
      );

      return {
          question: "What number is shown?",
          correctAnswer: total.toString(),
          visual
      };
  }

  // --- Addition ---
  if (id.startsWith('math-add')) {
    const range = parseInt(id.split('-').pop() || '1') * 5; // Ranges: 5, 10, 15, 20
    const maxNum = range + (level * 2); 
    const a = randomInt(1, maxNum);
    const b = randomInt(1, maxNum);
    return {
      question: `${a} + ${b} = ?`,
      correctAnswer: (a + b).toString(),
    };
  }

  // --- Subtraction ---
  if (id.startsWith('math-sub')) {
    const range = parseInt(id.split('-').pop() || '1') * 5;
    const maxNum = range + (level * 3);
    const a = randomInt(Math.floor(maxNum/2), maxNum);
    const b = randomInt(1, a); // Ensure result is positive
    return {
      question: `${a} - ${b} = ?`,
      correctAnswer: (a - b).toString(),
    };
  }

  // --- Tables ---
  if (id.startsWith('math-table')) {
    const tableNum = parseInt(id.split('-').pop() || '2');
    // Level 1: x1, Level 10: x10 (or mixed)
    const multiplier = level <= 10 ? level : randomInt(1, 12);
    return {
        question: `${tableNum} × ${multiplier} = ?`,
        correctAnswer: (tableNum * multiplier).toString()
    };
  }

  // --- Count Dominos ---
  if (id === 'math-dominos') {
    const top = randomInt(0, 6);
    const bottom = randomInt(0, 6);
    return {
        question: "Count the dots",
        correctAnswer: (top + bottom).toString(),
        visual: React.createElement('div', { className: "flex flex-col items-center bg-white border-4 border-gray-800 rounded-lg w-32 shadow-xl" }, 
            React.createElement('div', { className: "h-24 w-full flex items-center justify-center p-4 border-b-4 border-gray-800" }, 
                // Render dots dynamically
                React.createElement('div', { className: "grid grid-cols-3 gap-2" }, 
                    Array.from({ length: top }).map((_, i) => React.createElement('div', { key: i, className: "w-4 h-4 bg-black rounded-full" }))
                )
            ),
            React.createElement('div', { className: "h-24 w-full flex items-center justify-center p-4" }, 
                React.createElement('div', { className: "grid grid-cols-3 gap-2" }, 
                    Array.from({ length: bottom }).map((_, i) => React.createElement('div', { key: i, className: "w-4 h-4 bg-black rounded-full" }))
                )
            )
        )
    };
  }

  // --- Money ---
  if (id.startsWith('math-money')) {
     // Generate random coins
     const coins = [];
     let total = 0;
     const count = randomInt(2, 2 + level);
     for(let i=0; i<count; i++) {
         const coinType = Math.random() > 0.5 ? 10 : 1; // 10 or 1
         total += coinType;
         coins.push(coinType);
     }
     return {
         question: "How much money?",
         correctAnswer: total.toString(),
         visual: React.createElement('div', { className: "flex flex-wrap gap-4 justify-center" },
            coins.map((c, i) => React.createElement('div', { 
                key: i, 
                className: `rounded-full flex items-center justify-center border-4 border-yellow-600 shadow-md font-bold text-yellow-800 ${c === 10 ? 'w-16 h-16 bg-yellow-400 text-xl' : 'w-12 h-12 bg-yellow-200'}`
            }, c === 10 ? '10' : '1'))
         )
     };
  }

  // --- Find Number ---
  if (id.startsWith('math-find-num')) {
      const target = randomInt(1, 9 * parseInt(id.split('-').pop() || '1'));
      const correct = target.toString();
      // Generate unique options
      const opts = new Set<string>();
      opts.add(correct);
      while(opts.size < 4) opts.add(randomInt(1, 20 + level * 5).toString());
      
      return {
          question: `Find number ${correct}`,
          correctAnswer: correct,
          options: Array.from(opts).sort(() => Math.random() - 0.5)
      };
  }

  // --- Compare Numbers ---
  if (id === 'math-compare') {
      const a = randomInt(1, 10 + level * 2);
      const b = randomInt(1, 10 + level * 2);
      const correct = a > b ? '>' : a < b ? '<' : '=';
      return {
          question: "Compare",
          correctAnswer: correct,
          visual: React.createElement('div', { className: "flex items-center gap-8 text-6xl font-bold text-gray-700 my-8" },
             React.createElement('div', {}, a),
             React.createElement('div', { className: "w-16 h-16 bg-gray-100 rounded-lg border-2 border-gray-300" }),
             React.createElement('div', {}, b),
          ),
          options: ['>', '<', '=']
      };
  }

  // --- Before/After Number ---
  if (id === 'math-after' || id === 'math-before') {
      const isAfter = id === 'math-after';
      const n = randomInt(5, 5 + level * 5);
      return {
          question: isAfter ? `What comes after ${n}?` : `What comes before ${n}?`,
          correctAnswer: (isAfter ? n + 1 : n - 1).toString()
      };
  }
  
  // --- Geometry / Shapes ---
  if (id.startsWith('math-geo')) {
      const shapes = [
          { name: 'Circle', icon: '⭕' },
          { name: 'Square', icon: '🟥' },
          { name: 'Triangle', icon: '🔺' },
          { name: 'Star', icon: '⭐' },
          { name: 'Heart', icon: '❤️' },
          { name: 'Diamond', icon: '🔶' }
      ];
      const target = shapes[randomInt(0, Math.min(level + 2, shapes.length - 1))];
      return {
          question: `Find the ${target.name}`,
          correctAnswer: target.icon,
          options: shapes.slice(0, 4).map(s => s.icon).sort(() => Math.random() - 0.5)
      };
  }
  
  // --- Construct Abacus (Simple counting lines) ---
  if (id.startsWith('math-abacus')) {
      const val = randomInt(1, 9 + level);
      const lines = Math.ceil(val / 10); 
      // Simply ask to count total beads shown
      return {
          question: "Count the beads",
          correctAnswer: val.toString(),
          visual: React.createElement('div', { className: "flex gap-8 bg-gray-800 p-4 rounded-lg" },
               Array.from({length: 2}).map((_, colIdx) => {
                   const beads = colIdx === 0 ? Math.floor(val / 10) : val % 10;
                   return React.createElement('div', { key: colIdx, className: "w-2 h-32 bg-gray-400 relative flex flex-col-reverse items-center" },
                        Array.from({length: beads}).map((__, bIdx) => 
                            React.createElement('div', { key: bIdx, className: "w-8 h-4 bg-red-500 rounded-full mb-1 border border-red-800" })
                        )
                   );
               })
          )
      };
  }

  // --- Count Arithmetic (Visual Addition) ---
  if (id.startsWith('math-count-arith')) {
      const a = randomInt(1, 5);
      const b = randomInt(1, 5);
      return {
          question: "Count All",
          correctAnswer: (a + b).toString(),
          visual: React.createElement('div', { className: "flex gap-4 items-center text-4xl" },
              React.createElement('div', { className: "flex gap-1" }, Array.from({length: a}).map((_, i) => React.createElement('span', { key: i }, "🍎"))),
              React.createElement('span', {}, "+"),
              React.createElement('div', { className: "flex gap-1" }, Array.from({length: b}).map((_, i) => React.createElement('span', { key: i }, "🍎"))),
          )
      };
  }

  // --- Default Fallback (Arithmetic) ---
  const a = randomInt(1, 10);
  const b = randomInt(1, 10);
  return {
    question: `${a} + ${b} = ?`,
    correctAnswer: (a + b).toString(),
  };
};