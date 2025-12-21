import { LucideIcon } from 'lucide-react';

export enum ActivityType {
  MEMORY = 'MEMORY',
  QUIZ = 'QUIZ', // Generic Quiz
  PATTERN = 'PATTERN',
  SORTING = 'SORTING',
  AI_STORY = 'AI_STORY',
  AI_SCIENCE = 'AI_SCIENCE',
  MATH_GAME = 'MATH_GAME',
  CLOCK_GAME = 'CLOCK_GAME',
  PICTURE_QUIZ = 'PICTURE_QUIZ',
  SUDOKU_GAME = 'SUDOKU_GAME',
  MATCHING_GAME = 'MATCHING_GAME',
  SENTENCE_GAME = 'SENTENCE_GAME',
  FILL_GAME = 'FILL_GAME',
  READING_GAME = 'READING_GAME'
}

export type CategoryType = 
  | 'MATHS' 
  | 'CLOCK' 
  | 'GAME' 
  | 'PICTURE' 
  | 'SUDOKU' 
  | 'WORD_SEARCH'
  | 'GRAMMAR'
  | 'VOCABULARY'
  | 'READING'
  | 'SOUND'
  | 'SCIENCE'
  | 'LETTER';

export type InputMode = 'CHOICE' | 'KEYPAD';

export interface ActivityConfig {
  id: string;
  title: string;
  subCategory?: string; // Grouping header (e.g. "Addition")
  levelLabel?: string;  // Button text (e.g. "1", "2")
  icon: LucideIcon;
  color: string; // Tailwind color class base
  type: ActivityType;
  category: CategoryType;
  description?: string;
  inputMode?: InputMode; // CHOICE is default
  // specific configs
  gridSize?: number; 
  quizType?: 'MATH' | 'COLOR' | 'SHAPE' | 'CLOCK' | 'GRAMMAR' | 'VOCAB' | 'SCIENCE' | 'LETTER' | 'SOUND';
  patternComplexity?: number;
  // Clock specific
  clockMode?: 'SET' | 'WRITE';
  clockPrecision?: 'HOUR' | 'QUARTER' | 'MINUTE';
  // Picture specific
  pictureTopic?: string;
  // Sudoku specific
  sudokuMode?: 'NUMBER' | 'IMAGE';
  sudokuGrid?: '4x4';
  sudokuLinear?: boolean; // If true, presented linearly? (Prompt said "Linear")
  // Language specific
  grammarTopic?: string;
  vocabTopic?: string;
  scienceTopic?: string;
  letterMode?: 'CAPITAL' | 'SMALL' | 'CURSIVE' | 'NUMBER' | 'SOUND' | 'VOWEL';
  readingId?: string;
}

export interface MemoryCard {
  id: string;
  content: string; 
  isFlipped: boolean;
  isMatched: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  visual?: React.ReactNode; 
  audioText?: string; // Text to speak for sound games
}

export interface MathLevelData {
  question: string;
  correctAnswer: string;
  options?: string[]; // Only if inputMode is CHOICE
  visual?: React.ReactNode;
}

export interface SudokuData {
    initialGrid: (number | null)[];
    solution: number[];
    type: 'NUMBER' | 'IMAGE';
}

export interface MatchingPair {
    id: string;
    left: string;
    right: string;
    leftType?: 'text' | 'image';
    rightType?: 'text' | 'image';
}

export interface SentenceData {
    words: string[]; // Scrambled
    correctSentence: string;
}

export interface FillData {
    question: string; // e.g. "C _ T" or "The cat is ___"
    answer: string; // The missing part
    options?: string[]; // Optional choice
    fullWord?: string; // For context
}