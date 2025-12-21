import { SudokuData } from '../types';

// 4x4 Sudoku Generator
// 4x4 Grid:
// 0  1 | 2  3
// 4  5 | 6  7
// -----------
// 8  9 | 10 11
// 12 13| 14 15

// Simple 4x4 solution generator
const isValid4x4 = (grid: number[], num: number, pos: number): boolean => {
  const row = Math.floor(pos / 4);
  const col = pos % 4;
  const blockRow = Math.floor(row / 2) * 2;
  const blockCol = Math.floor(col / 2) * 2;

  // Check row
  for (let i = 0; i < 4; i++) {
    if (grid[row * 4 + i] === num) return false;
  }
  // Check col
  for (let i = 0; i < 4; i++) {
    if (grid[i * 4 + col] === num) return false;
  }
  // Check 2x2 block
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      if (grid[(blockRow + i) * 4 + (blockCol + j)] === num) return false;
    }
  }
  return true;
};

const solve4x4 = (grid: number[]): boolean => {
  for (let i = 0; i < 16; i++) {
    if (grid[i] === 0) {
      const nums = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
      for (let num of nums) {
        if (isValid4x4(grid, num, i)) {
          grid[i] = num;
          if (solve4x4(grid)) return true;
          grid[i] = 0;
        }
      }
      return false;
    }
  }
  return true;
};

export const generateSudoku4x4 = (type: 'NUMBER' | 'IMAGE', difficulty: number): SudokuData => {
  const grid = Array(16).fill(0);
  solve4x4(grid); // Fill full grid
  const solution = [...grid];

  // Remove cells based on difficulty (Level 1 = remove few, Level 10 = remove more)
  // 4x4 is small, so we can't remove too many.
  // Level 1: 4 holes. Level 10: 10 holes.
  const holes = Math.min(10, 3 + Math.ceil(difficulty / 1.5));
  
  const puzzle = [...solution];
  let removed = 0;
  while (removed < holes) {
    const idx = Math.floor(Math.random() * 16);
    if (puzzle[idx] !== 0) {
      puzzle[idx] = 0; // 0 represents empty
      removed++;
    }
  }

  return {
    initialGrid: puzzle.map(n => n === 0 ? null : n),
    solution,
    type
  };
};