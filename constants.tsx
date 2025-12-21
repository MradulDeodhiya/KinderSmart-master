import { ActivityConfig, ActivityType } from './types';
import { 
  ListOrdered, Grip, ArrowLeftRight, ArrowRight, ArrowLeft, 
  Coins, Plus, Minus, Hash, TrendingUp, TrendingDown, 
  PieChart, Shapes, Image, Type, Table,
  Search, Maximize2, Minimize2, CheckSquare, Clock,
  Palette, Brain, Sparkles, SortAsc,
  Calendar, Sun, Cat, Apple, Briefcase, Car, Utensils, Carrot,
  Grid3x3, FileText, PenTool, BookA, BookOpen, Volume2, FlaskConical, Pencil,
  Move, Mic, Ear, Rocket
} from 'lucide-react';

// --- MATHS ACTIVITIES (Existing) ---
const MATHS_ACTIVITIES: ActivityConfig[] = [
  // Count Dominos
  {
      id: 'math-dominos',
      title: 'Count Dominos',
      subCategory: 'Count Dominos',
      levelLabel: 'Play',
      icon: Grip,
      color: 'blue',
      category: 'MATHS',
      type: ActivityType.MATH_GAME,
      inputMode: 'KEYPAD'
  },
  // Find the Number 1-6
  ...[1, 2, 3, 4, 5, 6].map(n => ({
      id: `math-find-num-${n}`,
      title: `Find Number ${n}`,
      subCategory: 'Find the Number',
      levelLabel: n.toString(),
      icon: Search,
      color: 'indigo',
      category: 'MATHS' as const,
      type: ActivityType.MATH_GAME,
      inputMode: 'CHOICE' as const
  })),
  // Construct Abacus 1-2
  ...[1, 2].map(n => ({
      id: `math-abacus-${n}`,
      title: `Abacus ${n}`,
      subCategory: 'Construct the Abacus',
      levelLabel: n.toString(),
      icon: ListOrdered,
      color: 'amber',
      category: 'MATHS' as const,
      type: ActivityType.MATH_GAME,
      inputMode: 'KEYPAD' as const
  })),
  // Compare Numbers
  {
      id: 'math-compare',
      title: 'Compare Numbers',
      subCategory: 'Compare Numbers',
      levelLabel: 'Play',
      icon: ArrowLeftRight,
      color: 'teal',
      category: 'MATHS',
      type: ActivityType.MATH_GAME,
      inputMode: 'CHOICE'
  },
  // After Number
  {
      id: 'math-after',
      title: 'After Number',
      subCategory: 'After Number',
      levelLabel: 'Play',
      icon: ArrowRight,
      color: 'purple',
      category: 'MATHS',
      type: ActivityType.MATH_GAME,
      inputMode: 'KEYPAD'
  },
  // Before Number
  {
      id: 'math-before',
      title: 'Before Number',
      subCategory: 'Before Number',
      levelLabel: 'Play',
      icon: ArrowLeft,
      color: 'purple',
      category: 'MATHS',
      type: ActivityType.MATH_GAME,
      inputMode: 'KEYPAD'
  },
  // Count Arithmetic 1-3
  ...[1, 2, 3].map(n => ({
      id: `math-count-arith-${n}`,
      title: `Count Arithmetic ${n}`,
      subCategory: 'Count Arithmetic',
      levelLabel: n.toString(),
      icon: Plus,
      color: 'lime',
      category: 'MATHS' as const,
      type: ActivityType.MATH_GAME,
      inputMode: 'KEYPAD' as const
  })),
  // Calculate total Money 1-7
  ...[1, 2, 3, 4, 5, 6, 7].map(n => ({
      id: `math-money-${n}`,
      title: `Count Money ${n}`,
      subCategory: 'Calculate the Total Money',
      levelLabel: n.toString(),
      icon: Coins,
      color: 'yellow',
      category: 'MATHS' as const,
      type: ActivityType.MATH_GAME,
      inputMode: 'KEYPAD' as const
  })),
  // Addition 1-4
  ...[1, 2, 3, 4].map(n => ({
      id: `math-add-${n}`,
      title: `Addition ${n}`,
      subCategory: 'Addition',
      levelLabel: n.toString(),
      icon: Plus,
      color: 'green',
      category: 'MATHS' as const,
      type: ActivityType.MATH_GAME,
      inputMode: 'KEYPAD' as const
  })),
  // Subtraction 1-4
  ...[1, 2, 3, 4].map(n => ({
      id: `math-sub-${n}`,
      title: `Subtraction ${n}`,
      subCategory: 'Subtraction',
      levelLabel: n.toString(),
      icon: Minus,
      color: 'red',
      category: 'MATHS' as const,
      type: ActivityType.MATH_GAME,
      inputMode: 'KEYPAD' as const
  })),
  // Find Value (10-100)
  {
      id: 'math-find-val-100',
      title: 'Find Value (10-100)',
      subCategory: 'Find Value (10-100)',
      levelLabel: 'Play',
      icon: Hash,
      color: 'fuchsia',
      category: 'MATHS',
      type: ActivityType.MATH_GAME,
      inputMode: 'KEYPAD'
  },
  // Biggest Number 1-4
  ...[1, 2, 3, 4].map(n => ({
      id: `math-biggest-${n}`,
      title: `Biggest Num ${n}`,
      subCategory: 'Biggest Number',
      levelLabel: n.toString(),
      icon: Maximize2,
      color: 'cyan',
      category: 'MATHS' as const,
      type: ActivityType.MATH_GAME,
      inputMode: 'CHOICE' as const
  })),
  // Smallest Number 1-4
  ...[1, 2, 3, 4].map(n => ({
      id: `math-smallest-${n}`,
      title: `Smallest Num ${n}`,
      subCategory: 'Smallest Number',
      levelLabel: n.toString(),
      icon: Minimize2,
      color: 'rose',
      category: 'MATHS' as const,
      type: ActivityType.MATH_GAME,
      inputMode: 'CHOICE' as const
  })),
  // Ascending Order 1-4
  ...[1, 2, 3, 4].map(n => ({
      id: `math-asc-${n}`,
      title: `Ascending ${n}`,
      subCategory: 'Ascending Order',
      levelLabel: n.toString(),
      icon: TrendingUp,
      color: 'sky',
      category: 'MATHS' as const,
      type: ActivityType.SORTING,
      inputMode: 'CHOICE' as const
  })),
   // Descending Order 1-4
   ...[1, 2, 3, 4].map(n => ({
      id: `math-desc-${n}`,
      title: `Descending ${n}`,
      subCategory: 'Descending Order',
      levelLabel: n.toString(),
      icon: TrendingDown,
      color: 'sky',
      category: 'MATHS' as const,
      type: ActivityType.SORTING,
      inputMode: 'CHOICE' as const
  })),
  // Fraction
  {
      id: 'math-fraction',
      title: 'Fraction',
      subCategory: 'Fraction',
      levelLabel: 'Play',
      icon: PieChart,
      color: 'orange',
      category: 'MATHS',
      type: ActivityType.MATH_GAME,
      inputMode: 'CHOICE'
  },
  // Read Fraction
  {
      id: 'math-read-fraction',
      title: 'Read Fraction',
      subCategory: 'Read Fraction',
      levelLabel: 'Play',
      icon: PieChart,
      color: 'orange',
      category: 'MATHS',
      type: ActivityType.MATH_GAME,
      inputMode: 'CHOICE'
  },
  // Find the Value 1-4
  ...[1, 2, 3, 4].map(n => ({
      id: `math-find-value-${n}`,
      title: `Find Value ${n}`,
      subCategory: 'Find the Value',
      levelLabel: n.toString(),
      icon: Search,
      color: 'emerald',
      category: 'MATHS' as const,
      type: ActivityType.MATH_GAME,
      inputMode: 'KEYPAD' as const
  })),
  // Complete the Problem 1-5
   ...[1, 2, 3, 4, 5].map(n => ({
      id: `math-complete-prob-${n}`,
      title: `Complete Prob ${n}`,
      subCategory: 'Complete the Problem',
      levelLabel: n.toString(),
      icon: CheckSquare,
      color: 'violet',
      category: 'MATHS' as const,
      type: ActivityType.MATH_GAME,
      inputMode: 'KEYPAD' as const
  })),
  // Word Problems
  {
      id: 'math-word',
      title: 'Word Problems',
      subCategory: 'Word Problems',
      levelLabel: 'Play',
      icon: Type,
      color: 'pink',
      category: 'MATHS',
      type: ActivityType.MATH_GAME,
      inputMode: 'CHOICE'
  },
  // Geometry 1-4
  ...[1, 2, 3, 4].map(n => ({
      id: `math-geo-${n}`,
      title: `Geometry ${n}`,
      subCategory: 'Geometry',
      levelLabel: n.toString(),
      icon: Shapes,
      color: 'blue',
      category: 'MATHS' as const,
      type: ActivityType.MATH_GAME,
      inputMode: 'CHOICE' as const
  })),
  // Pictographs 1-3
  ...[1, 2, 3].map(n => ({
      id: `math-picto-${n}`,
      title: `Pictographs ${n}`,
      subCategory: 'Pictographs',
      levelLabel: n.toString(),
      icon: Image,
      color: 'teal',
      category: 'MATHS' as const,
      type: ActivityType.MATH_GAME,
      inputMode: 'KEYPAD' as const
  })),
  // Number Names
  {
      id: 'math-num-names',
      title: 'Number Names',
      subCategory: 'Number Names',
      levelLabel: 'Play',
      icon: Type,
      color: 'indigo',
      category: 'MATHS',
      type: ActivityType.MATH_GAME,
      inputMode: 'CHOICE'
  },
  // Tables 2-5
  ...[2, 3, 4, 5].map(n => ({
      id: `math-table-${n}`,
      title: `Table of ${n}`,
      subCategory: 'Tables',
      levelLabel: n.toString(),
      icon: Table,
      color: 'slate',
      category: 'MATHS' as const,
      type: ActivityType.MATH_GAME,
      inputMode: 'KEYPAD' as const
  })),
];

// --- CLOCK CATEGORY (Existing) ---
const CLOCK_ACTIVITIES: ActivityConfig[] = [
  {
    id: 'clock-set-hours',
    title: 'Set Time - Hours',
    subCategory: 'Set Time',
    levelLabel: 'Hours',
    icon: Clock,
    color: 'blue',
    category: 'CLOCK',
    type: ActivityType.CLOCK_GAME,
    clockMode: 'SET',
    clockPrecision: 'HOUR'
  },
  {
    id: 'clock-set-quarters',
    title: 'Set Time - Quarters',
    subCategory: 'Set Time',
    levelLabel: 'Quarters',
    icon: Clock,
    color: 'indigo',
    category: 'CLOCK',
    type: ActivityType.CLOCK_GAME,
    clockMode: 'SET',
    clockPrecision: 'QUARTER'
  },
  {
    id: 'clock-set-minutes',
    title: 'Set Time - Minutes',
    subCategory: 'Set Time',
    levelLabel: 'Minutes',
    icon: Clock,
    color: 'violet',
    category: 'CLOCK',
    type: ActivityType.CLOCK_GAME,
    clockMode: 'SET',
    clockPrecision: 'MINUTE'
  },
  {
    id: 'clock-write-hours',
    title: 'Write Time - Hours',
    subCategory: 'Write Time',
    levelLabel: 'Hours',
    icon: Clock,
    color: 'emerald',
    category: 'CLOCK',
    type: ActivityType.CLOCK_GAME,
    clockMode: 'WRITE',
    clockPrecision: 'HOUR'
  },
  {
    id: 'clock-write-quarters',
    title: 'Write Time - Quarters',
    subCategory: 'Write Time',
    levelLabel: 'Quarters',
    icon: Clock,
    color: 'teal',
    category: 'CLOCK',
    type: ActivityType.CLOCK_GAME,
    clockMode: 'WRITE',
    clockPrecision: 'QUARTER'
  },
  {
    id: 'clock-write-minutes',
    title: 'Write Time - Minutes',
    subCategory: 'Write Time',
    levelLabel: 'Minutes',
    icon: Clock,
    color: 'cyan',
    category: 'CLOCK',
    type: ActivityType.CLOCK_GAME,
    clockMode: 'WRITE',
    clockPrecision: 'MINUTE'
  },
];

// --- GAMES CATEGORY (Existing) ---
const GAME_ACTIVITIES: ActivityConfig[] = [
  // Find Pairs (1, 2)
  {
    id: 'game-pairs-1',
    title: 'Find Pairs 1',
    subCategory: 'Find Pairs',
    levelLabel: '1',
    icon: Brain,
    color: 'pink',
    category: 'GAME',
    type: ActivityType.MEMORY,
    gridSize: 4 // 2x2
  },
  {
    id: 'game-pairs-2',
    title: 'Find Pairs 2',
    subCategory: 'Find Pairs',
    levelLabel: '2',
    icon: Brain,
    color: 'pink',
    category: 'GAME',
    type: ActivityType.MEMORY,
    gridSize: 6 // 3x2
  },
  // Find Pairs More (1, 2)
  {
    id: 'game-pairs-more-1',
    title: 'Find Pairs More 1',
    subCategory: 'Find Pairs (More)',
    levelLabel: '1',
    icon: Brain,
    color: 'rose',
    category: 'GAME',
    type: ActivityType.MEMORY,
    gridSize: 12 // 4x3
  },
  {
    id: 'game-pairs-more-2',
    title: 'Find Pairs More 2',
    subCategory: 'Find Pairs (More)',
    levelLabel: '2',
    icon: Brain,
    color: 'rose',
    category: 'GAME',
    type: ActivityType.MEMORY,
    gridSize: 16 // 4x4
  },
  // Four Color Game (1, 2)
  {
    id: 'game-color-1',
    title: 'Four Color Game 1',
    subCategory: 'Four Color Game',
    levelLabel: '1',
    icon: Palette,
    color: 'orange',
    category: 'GAME',
    type: ActivityType.QUIZ,
    quizType: 'COLOR'
  },
  {
    id: 'game-color-2',
    title: 'Four Color Game 2',
    subCategory: 'Four Color Game',
    levelLabel: '2',
    icon: Palette,
    color: 'orange',
    category: 'GAME',
    type: ActivityType.QUIZ,
    quizType: 'COLOR'
  },
  // Four Shapes Game
  {
    id: 'game-shapes',
    title: 'Four Shapes Game',
    subCategory: 'Four Shapes Game',
    levelLabel: 'Play',
    icon: Shapes,
    color: 'yellow',
    category: 'GAME',
    type: ActivityType.QUIZ,
    quizType: 'SHAPE'
  },
  // Pattern
  {
    id: 'game-pattern-1',
    title: 'Pattern',
    subCategory: 'Pattern',
    levelLabel: 'Play',
    icon: Sparkles,
    color: 'teal',
    category: 'GAME',
    type: ActivityType.PATTERN,
    patternComplexity: 1
  },
  {
    id: 'game-pattern-adv',
    title: 'Pattern Advanced',
    subCategory: 'Pattern',
    levelLabel: 'Advanced',
    icon: Sparkles,
    color: 'teal',
    category: 'GAME',
    type: ActivityType.PATTERN,
    patternComplexity: 2
  },
  // Remember Shape & Color
  {
    id: 'game-remember-shape',
    title: 'Remember Shape',
    subCategory: 'Remember Shape & Color',
    levelLabel: 'Play',
    icon: Brain,
    color: 'cyan',
    category: 'GAME',
    type: ActivityType.QUIZ,
    quizType: 'SHAPE' 
  },
  // Find the Order (1, 2)
  {
    id: 'game-order-1',
    title: 'Find the Order 1',
    subCategory: 'Find the Order',
    levelLabel: '1',
    icon: SortAsc,
    color: 'green',
    category: 'GAME',
    type: ActivityType.SORTING
  },
  {
    id: 'game-order-2',
    title: 'Find the Order 2',
    subCategory: 'Find the Order',
    levelLabel: '2',
    icon: SortAsc,
    color: 'green',
    category: 'GAME',
    type: ActivityType.SORTING
  },
];

// --- WORD SEARCH (Formerly Picture) ---
const WORD_SEARCH_ACTIVITIES: ActivityConfig[] = [
  { id: 'word-days', title: 'Days', subCategory: 'Days of the Week', levelLabel: 'Play', icon: Calendar, color: 'blue', category: 'WORD_SEARCH', type: ActivityType.PICTURE_QUIZ, pictureTopic: 'DAYS' },
  { id: 'word-months', title: 'Months', subCategory: 'Months of the Year', levelLabel: 'Play', icon: Calendar, color: 'indigo', category: 'WORD_SEARCH', type: ActivityType.PICTURE_QUIZ, pictureTopic: 'MONTHS' },
  { id: 'word-planets', title: 'Planets', subCategory: 'Planets', levelLabel: 'Play', icon: Sun, color: 'violet', category: 'WORD_SEARCH', type: ActivityType.PICTURE_QUIZ, pictureTopic: 'PLANETS' },
  { id: 'word-animals', title: 'Animals', subCategory: 'Animals', levelLabel: 'Play', icon: Cat, color: 'green', category: 'WORD_SEARCH', type: ActivityType.PICTURE_QUIZ, pictureTopic: 'ANIMALS' },
  { id: 'word-fruits', title: 'Fruits', subCategory: 'Fruits', levelLabel: 'Play', icon: Apple, color: 'red', category: 'WORD_SEARCH', type: ActivityType.PICTURE_QUIZ, pictureTopic: 'FRUITS' },
  { id: 'word-jobs', title: 'Jobs', subCategory: 'People and Jobs', levelLabel: 'Play', icon: Briefcase, color: 'amber', category: 'WORD_SEARCH', type: ActivityType.PICTURE_QUIZ, pictureTopic: 'JOBS' },
  { id: 'word-colors', title: 'Colors', subCategory: 'Colors', levelLabel: 'Play', icon: Palette, color: 'cyan', category: 'WORD_SEARCH', type: ActivityType.PICTURE_QUIZ, pictureTopic: 'COLORS' },
  { id: 'word-vehicles', title: 'Vehicles', subCategory: 'Vehicles', levelLabel: 'Play', icon: Car, color: 'sky', category: 'WORD_SEARCH', type: ActivityType.PICTURE_QUIZ, pictureTopic: 'VEHICLES' },
  { id: 'word-kitchen', title: 'Kitchen', subCategory: 'Kitchen', levelLabel: 'Play', icon: Utensils, color: 'slate', category: 'WORD_SEARCH', type: ActivityType.PICTURE_QUIZ, pictureTopic: 'KITCHEN' },
  { id: 'word-veg', title: 'Vegetables', subCategory: 'Vegetables', levelLabel: 'Play', icon: Carrot, color: 'emerald', category: 'WORD_SEARCH', type: ActivityType.PICTURE_QUIZ, pictureTopic: 'VEGETABLES' },
];

// --- LETTER CATEGORY ---
const LETTER_ACTIVITIES: ActivityConfig[] = [
    { id: 'letter-caps', title: 'Capital Letters', subCategory: 'Capital Letters', levelLabel: 'Play', icon: Type, color: 'blue', category: 'LETTER', type: ActivityType.QUIZ, quizType: 'LETTER', letterMode: 'CAPITAL' },
    { id: 'letter-small', title: 'Small Letters', subCategory: 'Small Letters', levelLabel: 'Play', icon: Type, color: 'indigo', category: 'LETTER', type: ActivityType.QUIZ, quizType: 'LETTER', letterMode: 'SMALL' },
    { id: 'letter-nums', title: 'Numbers', subCategory: 'Numbers', levelLabel: 'Play', icon: Hash, color: 'green', category: 'LETTER', type: ActivityType.QUIZ, quizType: 'LETTER', letterMode: 'NUMBER' },
    { id: 'letter-cursive', title: 'Cursive Letters', subCategory: 'Cursive Letters', levelLabel: 'Play', icon: Pencil, color: 'pink', category: 'LETTER', type: ActivityType.QUIZ, quizType: 'LETTER', letterMode: 'CURSIVE' },
    { id: 'letter-cursive-caps', title: 'Capital Cursive', subCategory: 'Capital Cursive Letters', levelLabel: 'Play', icon: Pencil, color: 'rose', category: 'LETTER', type: ActivityType.QUIZ, quizType: 'LETTER', letterMode: 'CURSIVE' },
    
    ...[1, 2, 3].map(n => ({
        id: `letter-sound-${n}`, title: `Listen ${n}`, subCategory: 'Listen to Sound and Identify Letters', levelLabel: n.toString(), icon: Ear, color: 'teal', category: 'LETTER' as const, type: ActivityType.QUIZ, quizType: 'SOUND' as const, letterMode: 'SOUND' as const
    })),
    
    ...[1, 2, 3, 4].map(n => ({
        id: `letter-vowel-${n}`, title: `Vowels ${n}`, subCategory: 'Connect the Vowels', levelLabel: n.toString(), icon: Move, color: 'orange', category: 'LETTER' as const, type: ActivityType.MATCHING_GAME, letterMode: 'VOWEL' as const
    }))
];

// --- PICTURES CATEGORY (New Content) ---
const PICTURE_ACTIVITIES: ActivityConfig[] = [
    ...[1, 2, 3, 4].map(n => ({
        id: `pic-drag-${n}`, title: `Words ${n}`, subCategory: 'Drag & Drop: Simple Words', levelLabel: n.toString(), icon: Move, color: 'blue', category: 'PICTURE' as const, type: ActivityType.MATCHING_GAME
    })),
    ...[1, 2, 3, 4, 5].map(n => ({
        id: `pic-drag2-${n}`, title: `Words II ${n}`, subCategory: 'Drag & Drop: Simple Words 2', levelLabel: n.toString(), icon: Move, color: 'indigo', category: 'PICTURE' as const, type: ActivityType.MATCHING_GAME
    })),
    ...[1, 2, 3].map(n => ({
        id: `pic-fill-${n}`, title: `Fill ${n}`, subCategory: 'Fill up: Simple Words', levelLabel: n.toString(), icon: PenTool, color: 'green', category: 'PICTURE' as const, type: ActivityType.FILL_GAME
    })),
    ...[1, 2, 3].map(n => ({
        id: `pic-fill2-${n}`, title: `Fill II ${n}`, subCategory: 'Fill up: Simple Words 2', levelLabel: n.toString(), icon: PenTool, color: 'teal', category: 'PICTURE' as const, type: ActivityType.FILL_GAME
    })),
    ...[1, 2, 3, 4, 5].map(n => ({
        id: `pic-match-${n}`, title: `Match ${n}`, subCategory: 'Match: Simple Words', levelLabel: n.toString(), icon: ArrowLeftRight, color: 'orange', category: 'PICTURE' as const, type: ActivityType.MATCHING_GAME
    })),
    ...[1, 2, 3, 4, 5, 6].map(n => ({
        id: `pic-match2-${n}`, title: `Match II ${n}`, subCategory: 'Match: Simple Words 2', levelLabel: n.toString(), icon: ArrowLeftRight, color: 'red', category: 'PICTURE' as const, type: ActivityType.MATCHING_GAME
    })),
];

// --- SUDOKU CATEGORY ---
const SUDOKU_ACTIVITIES: ActivityConfig[] = [
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => ({
        id: `sudoku-linear-${n}`, title: `Linear ${n}`, subCategory: 'Sudoku (4 x 4) - Linear', levelLabel: n.toString(), icon: Grid3x3, color: 'blue', category: 'SUDOKU' as const, type: ActivityType.SUDOKU_GAME, sudokuMode: 'NUMBER' as const, sudokuLinear: true
    })),
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => ({
        id: `sudoku-grid-${n}`, title: `Sudoku ${n}`, subCategory: 'Sudoku (4 x 4)', levelLabel: n.toString(), icon: Grid3x3, color: 'indigo', category: 'SUDOKU' as const, type: ActivityType.SUDOKU_GAME, sudokuMode: 'NUMBER' as const
    })),
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => ({
        id: `sudoku-img-${n}`, title: `Image ${n}`, subCategory: 'Sudoku (4 x 4) with Images', levelLabel: n.toString(), icon: Image, color: 'pink', category: 'SUDOKU' as const, type: ActivityType.SUDOKU_GAME, sudokuMode: 'IMAGE' as const
    })),
];

// --- GRAMMAR CATEGORY ---
const GRAMMAR_ACTIVITIES: ActivityConfig[] = [
    { id: 'gram-art-pick', title: 'Pick Article', subCategory: 'Pick the Right Article', levelLabel: 'Play', icon: CheckSquare, color: 'yellow', category: 'GRAMMAR', type: ActivityType.QUIZ, quizType: 'GRAMMAR', grammarTopic: 'ARTICLE' },
    
    ...[1, 2, 3, 4, 5].map(n => ({
        id: `gram-order-${n}`, title: `Order ${n}`, subCategory: 'Order Sentence', levelLabel: n.toString(), icon: ListOrdered, color: 'blue', category: 'GRAMMAR' as const, type: ActivityType.SENTENCE_GAME
    })),

    { id: 'gram-verb', title: 'Identify Verb', subCategory: 'Identify action word (Verb)', levelLabel: 'Play', icon: Search, color: 'green', category: 'GRAMMAR', type: ActivityType.QUIZ, quizType: 'GRAMMAR', grammarTopic: 'VERB' },
    { id: 'gram-is-am', title: 'is / am / are', subCategory: 'is / am / are', levelLabel: 'Play', icon: CheckSquare, color: 'orange', category: 'GRAMMAR', type: ActivityType.QUIZ, quizType: 'GRAMMAR', grammarTopic: 'IS_AM_ARE' },
    { id: 'gram-was-were', title: 'was / were', subCategory: 'was / were', levelLabel: 'Play', icon: CheckSquare, color: 'orange', category: 'GRAMMAR', type: ActivityType.QUIZ, quizType: 'GRAMMAR', grammarTopic: 'WAS_WERE' },
    { id: 'gram-proper', title: 'Proper Noun', subCategory: 'Identify Proper Noun', levelLabel: 'Play', icon: Search, color: 'purple', category: 'GRAMMAR', type: ActivityType.QUIZ, quizType: 'GRAMMAR', grammarTopic: 'PROPER_NOUN' },
    { id: 'gram-article', title: 'Article', subCategory: 'Article', levelLabel: 'Play', icon: PenTool, color: 'teal', category: 'GRAMMAR', type: ActivityType.QUIZ, quizType: 'GRAMMAR', grammarTopic: 'ARTICLE' },
    { id: 'gram-choose', title: 'Choose Word', subCategory: 'Choose Appropriate Word', levelLabel: 'Play', icon: CheckSquare, color: 'cyan', category: 'GRAMMAR', type: ActivityType.QUIZ, quizType: 'GRAMMAR', grammarTopic: 'CHOOSE' },
    { id: 'gram-noun-verb', title: 'Noun vs Verb', subCategory: 'Noun vs Verb', levelLabel: 'Play', icon: ArrowLeftRight, color: 'rose', category: 'GRAMMAR', type: ActivityType.QUIZ, quizType: 'GRAMMAR', grammarTopic: 'NOUN_VS_VERB' },
    { id: 'gram-sentence', title: 'Sentence Type', subCategory: 'Sentence Type', levelLabel: 'Play', icon: Type, color: 'slate', category: 'GRAMMAR', type: ActivityType.QUIZ, quizType: 'GRAMMAR', grammarTopic: 'SENTENCE_TYPE' },

    ...[1, 2, 3, 4].map(n => ({
        id: `gram-match-${n}`, title: `Match ${n}`, subCategory: 'Match Words', levelLabel: n.toString(), icon: ArrowLeftRight, color: 'lime', category: 'GRAMMAR' as const, type: ActivityType.MATCHING_GAME
    })),
];

// --- VOCABULARY CATEGORY ---
const VOCAB_ACTIVITIES: ActivityConfig[] = [
    ...[1, 2, 3, 4, 5, 6].map(n => ({
        id: `voc-pick-${n}`, title: `Pick ${n}`, subCategory: 'Pick the right option', levelLabel: n.toString(), icon: CheckSquare, color: 'blue', category: 'VOCABULARY' as const, type: ActivityType.QUIZ, quizType: 'VOCAB' as const
    })),
    ...[1, 2, 3, 4].map(n => ({
        id: `voc-3let-${n}`, title: `3 Letter ${n}`, subCategory: 'Three Letter Words', levelLabel: n.toString(), icon: Type, color: 'green', category: 'VOCABULARY' as const, type: ActivityType.FILL_GAME
    })),
    ...[1, 2, 3, 4].map(n => ({
        id: `voc-4let-${n}`, title: `4 Letter ${n}`, subCategory: 'Four Letter Words', levelLabel: n.toString(), icon: Type, color: 'teal', category: 'VOCABULARY' as const, type: ActivityType.FILL_GAME
    })),
    ...[1, 2, 3].map(n => ({
        id: `voc-plural-${n}`, title: `Plural ${n}`, subCategory: 'Plural Form', levelLabel: n.toString(), icon: ArrowRight, color: 'purple', category: 'VOCABULARY' as const, type: ActivityType.QUIZ, quizType: 'VOCAB' as const
    })),
    ...[1, 2, 3].map(n => ({
        id: `voc-complete-${n}`, title: `Complete ${n}`, subCategory: 'Complete Word - Hint', levelLabel: n.toString(), icon: PenTool, color: 'orange', category: 'VOCABULARY' as const, type: ActivityType.FILL_GAME
    })),
    ...[1, 2, 3].map(n => ({
        id: `voc-spell-${n}`, title: `Spelling ${n}`, subCategory: 'Pick Correct Spelling', levelLabel: n.toString(), icon: CheckSquare, color: 'red', category: 'VOCABULARY' as const, type: ActivityType.QUIZ, quizType: 'VOCAB' as const
    })),
    ...[1, 2, 3].map(n => ({
        id: `voc-rhyme-${n}`, title: `Rhyme ${n}`, subCategory: 'Rhyming Words', levelLabel: n.toString(), icon: Volume2, color: 'pink', category: 'VOCABULARY' as const, type: ActivityType.MATCHING_GAME
    })),
    ...[1, 2, 3].map(n => ({
        id: `voc-ant-${n}`, title: `Antonyms ${n}`, subCategory: 'Match Antonyms', levelLabel: n.toString(), icon: ArrowLeftRight, color: 'indigo', category: 'VOCABULARY' as const, type: ActivityType.MATCHING_GAME
    })),
    ...[1, 2, 3].map(n => ({
        id: `voc-syn-${n}`, title: `Synonyms ${n}`, subCategory: 'Match Synonyms', levelLabel: n.toString(), icon: ArrowLeftRight, color: 'cyan', category: 'VOCABULARY' as const, type: ActivityType.MATCHING_GAME
    })),
    ...[1, 2].map(n => ({
        id: `voc-anim-${n}`, title: `Animals ${n}`, subCategory: 'Animals and Movements', levelLabel: n.toString(), icon: Cat, color: 'amber', category: 'VOCABULARY' as const, type: ActivityType.MATCHING_GAME
    })),
    ...[1, 2, 3].map(n => ({
        id: `voc-confuse-${n}`, title: `Confusing ${n}`, subCategory: 'Confusing Words', levelLabel: n.toString(), icon: Brain, color: 'slate', category: 'VOCABULARY' as const, type: ActivityType.QUIZ, quizType: 'VOCAB' as const
    })),
];

// --- READING CATEGORY ---
const READING_ACTIVITIES: ActivityConfig[] = [
    { id: 'reading-apple', title: 'Apple', subCategory: 'Stories', levelLabel: 'Read', icon: Apple, color: 'red', category: 'READING', type: ActivityType.READING_GAME },
    { id: 'reading-ant', title: 'Ant', subCategory: 'Stories', levelLabel: 'Read', icon: Bug, color: 'orange', category: 'READING', type: ActivityType.READING_GAME },
    { id: 'reading-dog', title: 'Dog', subCategory: 'Stories', levelLabel: 'Read', icon: Cat, color: 'blue', category: 'READING', type: ActivityType.READING_GAME },
    { id: 'reading-balloons', title: 'Balloons', subCategory: 'Stories', levelLabel: 'Read', icon: Sparkles, color: 'pink', category: 'READING', type: ActivityType.READING_GAME },
    { id: 'reading-frog', title: 'Frog', subCategory: 'Stories', levelLabel: 'Read', icon: Smile, color: 'green', category: 'READING', type: ActivityType.READING_GAME },
    { id: 'reading-ladybug', title: 'Ladybug', subCategory: 'Stories', levelLabel: 'Read', icon: Bug, color: 'red', category: 'READING', type: ActivityType.READING_GAME },
    { id: 'reading-rabbit', title: 'Rabbit', subCategory: 'Stories', levelLabel: 'Read', icon: Cat, color: 'gray', category: 'READING', type: ActivityType.READING_GAME },
    { id: 'reading-teddy', title: 'Teddy', subCategory: 'Stories', levelLabel: 'Read', icon: Heart, color: 'brown', category: 'READING', type: ActivityType.READING_GAME },
    { id: 'reading-sara', title: 'My Friend Sara', subCategory: 'Stories', levelLabel: 'Read', icon: User, color: 'purple', category: 'READING', type: ActivityType.READING_GAME },
    { id: 'reading-routine', title: 'Daily Routine', subCategory: 'Stories', levelLabel: 'Read', icon: Clock, color: 'teal', category: 'READING', type: ActivityType.READING_GAME },
];

// --- SOUND CATEGORY ---
const SOUND_ACTIVITIES: ActivityConfig[] = [
    ...[1, 2, 3].map(n => ({ id: `sound-simple-${n}`, title: `Simple ${n}`, subCategory: 'Simple Words', levelLabel: n.toString(), icon: Mic, color: 'blue', category: 'SOUND' as const, type: ActivityType.QUIZ, quizType: 'SOUND' as const })),
    ...[1, 2, 3].map(n => ({ id: `sound-simple2-${n}`, title: `Simple II ${n}`, subCategory: 'Simple Words 2', levelLabel: n.toString(), icon: Mic, color: 'indigo', category: 'SOUND' as const, type: ActivityType.QUIZ, quizType: 'SOUND' as const })),
    ...[1, 2, 3].map(n => ({ id: `sound-sel-${n}`, title: `Select ${n}`, subCategory: 'Select: Simple Words', levelLabel: n.toString(), icon: CheckSquare, color: 'green', category: 'SOUND' as const, type: ActivityType.QUIZ, quizType: 'SOUND' as const })),
    ...[1, 2, 3].map(n => ({ id: `sound-sel2-${n}`, title: `Select II ${n}`, subCategory: 'Select: Simple Words 2', levelLabel: n.toString(), icon: CheckSquare, color: 'teal', category: 'SOUND' as const, type: ActivityType.QUIZ, quizType: 'SOUND' as const })),
];

// --- SCIENCE CATEGORY ---
const SCIENCE_ACTIVITIES: ActivityConfig[] = [
    ...[1, 2].map(n => ({ id: `sci-anim-${n}`, title: `Animals ${n}`, subCategory: 'Animal Sounds', levelLabel: n.toString(), icon: Volume2, color: 'orange', category: 'SCIENCE' as const, type: ActivityType.QUIZ, quizType: 'SOUND' as const })),
    ...[1, 2].map(n => ({ id: `sci-id-${n}`, title: `Identify ${n}`, subCategory: 'Identify Animal Sound', levelLabel: n.toString(), icon: Ear, color: 'amber', category: 'SCIENCE' as const, type: ActivityType.QUIZ, quizType: 'SOUND' as const })),
    
    { id: 'sci-dom', title: 'Domestic/Wild', subCategory: 'Domestic vs Wild Animals', levelLabel: 'Play', icon: Cat, color: 'green', category: 'SCIENCE', type: ActivityType.QUIZ, quizType: 'SCIENCE', scienceTopic: 'DOMESTIC_WILD' },
    { id: 'sci-plant', title: 'Plant Parts', subCategory: 'Parts of Plant', levelLabel: 'Play', icon: FlaskConical, color: 'emerald', category: 'SCIENCE', type: ActivityType.QUIZ, quizType: 'SCIENCE', scienceTopic: 'PLANT_PARTS' },
    { id: 'sci-dog', title: 'Dog Parts', subCategory: 'Parts of Dog', levelLabel: 'Play', icon: Cat, color: 'amber', category: 'SCIENCE', type: ActivityType.QUIZ, quizType: 'SCIENCE', scienceTopic: 'DOG_PARTS' },
    { id: 'sci-face', title: 'Face Parts', subCategory: 'Parts of Face', levelLabel: 'Play', icon: User, color: 'pink', category: 'SCIENCE', type: ActivityType.QUIZ, quizType: 'SCIENCE', scienceTopic: 'FACE_PARTS' },
    { id: 'sci-human', title: 'Human Parts', subCategory: 'Parts of Human', levelLabel: 'Play', icon: User, color: 'rose', category: 'SCIENCE', type: ActivityType.QUIZ, quizType: 'SCIENCE', scienceTopic: 'HUMAN_PARTS' },
    { id: 'sci-comp', title: 'Computer', subCategory: 'Parts of Computer', levelLabel: 'Play', icon: Tv, color: 'slate', category: 'SCIENCE', type: ActivityType.QUIZ, quizType: 'SCIENCE', scienceTopic: 'COMPUTER_PARTS' },
    { id: 'sci-tree', title: 'Tree Parts', subCategory: 'Parts of Tree', levelLabel: 'Play', icon: TreeDeciduous, color: 'green', category: 'SCIENCE', type: ActivityType.QUIZ, quizType: 'SCIENCE', scienceTopic: 'TREE_PARTS' },
    { id: 'sci-rain', title: 'Rainbow', subCategory: 'Rainbow', levelLabel: 'Play', icon: Palette, color: 'purple', category: 'SCIENCE', type: ActivityType.QUIZ, quizType: 'SCIENCE', scienceTopic: 'RAINBOW' },
    { id: 'sci-fish', title: 'Fish Parts', subCategory: 'Parts of a Fish', levelLabel: 'Play', icon: Fish, color: 'blue', category: 'SCIENCE', type: ActivityType.QUIZ, quizType: 'SCIENCE', scienceTopic: 'FISH_PARTS' },
    { id: 'sci-light', title: 'Light/Heavy', subCategory: 'Lighter vs Heavier', levelLabel: 'Play', icon: Scale, color: 'gray', category: 'SCIENCE', type: ActivityType.QUIZ, quizType: 'SCIENCE', scienceTopic: 'WEIGHT' },
    { id: 'sci-planet', title: 'Planets', subCategory: 'Planets', levelLabel: 'Play', icon: Rocket, color: 'indigo', category: 'SCIENCE', type: ActivityType.QUIZ, quizType: 'SCIENCE', scienceTopic: 'PLANETS' },
    
    ...[1, 2].map(n => ({ id: `sci-food-${n}`, title: `Food ${n}`, subCategory: 'Healthy vs Unhealthy Foods', levelLabel: n.toString(), icon: Apple, color: 'red', category: 'SCIENCE' as const, type: ActivityType.QUIZ, quizType: 'SCIENCE' as const, scienceTopic: 'HEALTHY_FOOD' })),
    
    { id: 'sci-habit', title: 'Habits', subCategory: 'Healthy Food Habits', levelLabel: 'Play', icon: Heart, color: 'red', category: 'SCIENCE', type: ActivityType.QUIZ, quizType: 'SCIENCE', scienceTopic: 'HABITS' },
    
    ...[1, 2].map(n => ({ id: `sci-drag-${n}`, title: `Drag ${n}`, subCategory: 'Drag and Drop', levelLabel: n.toString(), icon: Move, color: 'blue', category: 'SCIENCE' as const, type: ActivityType.MATCHING_GAME })),
];

// Temporary Icon Imports not in top list to fix compile (adding here)
import { Bug, Smile, User, Tv, TreeDeciduous, Fish, Scale, Heart } from 'lucide-react';

export const ACTIVITIES: ActivityConfig[] = [
    ...MATHS_ACTIVITIES,
    ...CLOCK_ACTIVITIES,
    ...GAME_ACTIVITIES,
    ...WORD_SEARCH_ACTIVITIES,
    ...LETTER_ACTIVITIES,
    ...PICTURE_ACTIVITIES,
    ...SUDOKU_ACTIVITIES,
    ...GRAMMAR_ACTIVITIES,
    ...VOCAB_ACTIVITIES,
    ...READING_ACTIVITIES,
    ...SOUND_ACTIVITIES,
    ...SCIENCE_ACTIVITIES
];