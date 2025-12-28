import React, { useState } from 'react';
import { ACTIVITIES } from './constants';
import { ActivityConfig, ActivityType, CategoryType } from './types';
import GameShell from './components/GameShell';
import MemoryGame from './components/MemoryGame';
import QuizGame from './components/QuizGame';
import PatternGame from './components/PatternGame';
import SortingGame from './components/SortingGame';
import AiActivity from './components/AiActivity';
import MathGame from './components/MathGame';
import ClockGame from './components/ClockGame';
import PictureGame from './components/PictureGame';
import SudokuGame from './components/SudokuGame';
import MatchingGame from './components/MatchingGame';
import SentenceGame from './components/SentenceGame';
import FillGame from './components/FillGame';
import ReadingGame from './components/ReadingGame';

import { 
  Calculator, Clock, Gamepad2, ArrowLeft, Image, Grid3x3, FileText,
  PenTool, BookA, BookOpen, Volume2, FlaskConical, Pencil
} from 'lucide-react';

const App: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<CategoryType | null>(null);
  const [currentActivity, setCurrentActivity] = useState<ActivityConfig | null>(null);

  const handleCategorySelect = (category: CategoryType) => {
    setCurrentCategory(category);
  };

  const handleActivitySelect = (activity: ActivityConfig) => {
    setCurrentActivity(activity);
  };

  const handleBackToCategories = () => {
    setCurrentCategory(null);
  };

  const handleBackToActivityList = () => {
    setCurrentActivity(null);
  };

  const handleGameComplete = (points: number) => {
    // Score tracking logic
  };

  const renderActiveGame = () => {
    if (!currentActivity) return null;

    switch (currentActivity.type) {
      case ActivityType.MEMORY:
        return <MemoryGame config={currentActivity} onComplete={handleGameComplete} />;
      case ActivityType.QUIZ:
        return <QuizGame config={currentActivity} onComplete={handleGameComplete} />;
      case ActivityType.PATTERN:
        return <PatternGame config={currentActivity} onComplete={handleGameComplete} />;
      case ActivityType.SORTING:
        return <SortingGame config={currentActivity} onComplete={handleGameComplete} />;
      case ActivityType.AI_STORY:
      case ActivityType.AI_SCIENCE:
        return <AiActivity config={currentActivity} />;
      case ActivityType.MATH_GAME:
        return <MathGame config={currentActivity} onComplete={handleGameComplete} />;
      case ActivityType.CLOCK_GAME:
        return <ClockGame config={currentActivity} onComplete={handleGameComplete} />;
      case ActivityType.PICTURE_QUIZ:
        return <PictureGame config={currentActivity} onComplete={handleGameComplete} />;
      case ActivityType.SUDOKU_GAME:
        return <SudokuGame config={currentActivity} onComplete={handleGameComplete} />;
      case ActivityType.MATCHING_GAME:
        return <MatchingGame config={currentActivity} onComplete={handleGameComplete} />;
      case ActivityType.SENTENCE_GAME:
        return <SentenceGame config={currentActivity} onComplete={handleGameComplete} />;
      case ActivityType.FILL_GAME:
        return <FillGame config={currentActivity} onComplete={handleGameComplete} />;
      case ActivityType.READING_GAME:
        return <ReadingGame config={currentActivity} onComplete={handleGameComplete} />;
      default:
        return <div>Coming Soon!</div>;
    }
  };

  // Color mapping for grouped headers/buttons
  const colorMap: Record<string, { bg: string, text: string, btnBg: string, btnHover: string, btnText: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-800', btnBg: 'bg-blue-100', btnHover: 'hover:bg-blue-200', btnText: 'text-blue-800' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-800', btnBg: 'bg-indigo-100', btnHover: 'hover:bg-indigo-200', btnText: 'text-indigo-800' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-800', btnBg: 'bg-purple-100', btnHover: 'hover:bg-purple-200', btnText: 'text-purple-800' },
      pink: { bg: 'bg-pink-50', text: 'text-pink-800', btnBg: 'bg-pink-100', btnHover: 'hover:bg-pink-200', btnText: 'text-pink-800' },
      rose: { bg: 'bg-rose-50', text: 'text-rose-800', btnBg: 'bg-rose-100', btnHover: 'hover:bg-rose-200', btnText: 'text-rose-800' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-800', btnBg: 'bg-orange-100', btnHover: 'hover:bg-orange-200', btnText: 'text-orange-800' },
      amber: { bg: 'bg-amber-50', text: 'text-amber-800', btnBg: 'bg-amber-100', btnHover: 'hover:bg-amber-200', btnText: 'text-amber-800' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-800', btnBg: 'bg-yellow-100', btnHover: 'hover:bg-yellow-200', btnText: 'text-yellow-800' },
      lime: { bg: 'bg-lime-50', text: 'text-lime-800', btnBg: 'bg-lime-100', btnHover: 'hover:bg-lime-200', btnText: 'text-lime-800' },
      green: { bg: 'bg-green-50', text: 'text-green-800', btnBg: 'bg-green-100', btnHover: 'hover:bg-green-200', btnText: 'text-green-800' },
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-800', btnBg: 'bg-emerald-100', btnHover: 'hover:bg-emerald-200', btnText: 'text-emerald-800' },
      teal: { bg: 'bg-teal-50', text: 'text-teal-800', btnBg: 'bg-teal-100', btnHover: 'hover:bg-teal-200', btnText: 'text-teal-800' },
      cyan: { bg: 'bg-cyan-50', text: 'text-cyan-800', btnBg: 'bg-cyan-100', btnHover: 'hover:bg-cyan-200', btnText: 'text-cyan-800' },
      sky: { bg: 'bg-sky-50', text: 'text-sky-800', btnBg: 'bg-sky-100', btnHover: 'hover:bg-sky-200', btnText: 'text-sky-800' },
      violet: { bg: 'bg-violet-50', text: 'text-violet-800', btnBg: 'bg-violet-100', btnHover: 'hover:bg-violet-200', btnText: 'text-violet-800' },
      fuchsia: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-800', btnBg: 'bg-fuchsia-100', btnHover: 'hover:bg-fuchsia-200', btnText: 'text-fuchsia-800' },
      slate: { bg: 'bg-slate-50', text: 'text-slate-800', btnBg: 'bg-slate-100', btnHover: 'hover:bg-slate-200', btnText: 'text-slate-800' },
      red: { bg: 'bg-red-50', text: 'text-red-800', btnBg: 'bg-red-100', btnHover: 'hover:bg-red-200', btnText: 'text-red-800' },
      brown: { bg: 'bg-amber-50', text: 'text-amber-800', btnBg: 'bg-amber-200', btnHover: 'hover:bg-amber-300', btnText: 'text-amber-900' },
      gray: { bg: 'bg-gray-50', text: 'text-gray-800', btnBg: 'bg-gray-200', btnHover: 'hover:bg-gray-300', btnText: 'text-gray-900' },
  };

  // --- View: Active Game ---
  if (currentActivity) {
    return (
      <GameShell 
        title={currentActivity.title} 
        color={currentActivity.color} 
        onBack={handleBackToActivityList}
      >
        {renderActiveGame()}
      </GameShell>
    );
  }

  // --- View: Activity List (Sub-page) ---
  if (currentCategory) {
    const filteredActivities = ACTIVITIES.filter(a => a.category === currentCategory);
    
    // Group activities by subCategory
    const groupedActivities = filteredActivities.reduce((acc, activity) => {
        const group = activity.subCategory || 'Other';
        if (!acc[group]) acc[group] = [];
        acc[group].push(activity);
        return acc;
    }, {} as Record<string, ActivityConfig[]>);

    // Theme config for the category page header
    const catTheme: Record<string, { text: string, bg: string, icon: any, label: string }> = {
        MATHS: { text: 'text-blue-700', bg: 'bg-blue-50', icon: Calculator, label: 'Maths' },
        CLOCK: { text: 'text-indigo-700', bg: 'bg-indigo-50', icon: Clock, label: 'Clock' },
        GAME: { text: 'text-green-700', bg: 'bg-green-50', icon: Gamepad2, label: 'Games' },
        PICTURE: { text: 'text-pink-700', bg: 'bg-pink-50', icon: Image, label: 'Picture' },
        SUDOKU: { text: 'text-orange-700', bg: 'bg-orange-50', icon: Grid3x3, label: 'Sudoku' },
        WORD_SEARCH: { text: 'text-violet-700', bg: 'bg-violet-50', icon: FileText, label: 'Word Search' },
        GRAMMAR: { text: 'text-yellow-700', bg: 'bg-yellow-50', icon: PenTool, label: 'Grammar' },
        VOCABULARY: { text: 'text-teal-700', bg: 'bg-teal-50', icon: BookA, label: 'Vocabulary' },
        READING: { text: 'text-sky-700', bg: 'bg-sky-50', icon: BookOpen, label: 'Reading' },
        SOUND: { text: 'text-fuchsia-700', bg: 'bg-fuchsia-50', icon: Volume2, label: 'Sound' },
        SCIENCE: { text: 'text-emerald-700', bg: 'bg-emerald-50', icon: FlaskConical, label: 'Science' },
        LETTER: { text: 'text-slate-700', bg: 'bg-slate-50', icon: Pencil, label: 'Letter' },
    };

    const theme = catTheme[currentCategory] || catTheme.MATHS;

    return (
        <div className={`min-h-screen ${theme.bg} font-sans flex flex-col`}>
             <header className="px-6 py-6 md:px-10 flex items-center gap-4 bg-white/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
                <button 
                    onClick={handleBackToCategories}
                    className="p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className={`w-6 h-6 ${theme.text}`} />
                </button>
                <div className="flex items-center gap-3">
                     <theme.icon className={`w-8 h-8 ${theme.text}`} />
                     <h1 className={`text-3xl font-extrabold ${theme.text} tracking-tight`}>
                         {theme.label}
                     </h1>
                </div>
            </header>

            <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
                 {Object.keys(groupedActivities).length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-20 opacity-50">
                        <theme.icon className={`w-24 h-24 mb-4 ${theme.text}`} />
                        <h2 className="text-2xl font-bold text-gray-500">Activities coming soon!</h2>
                    </div>
                 ) : (
                    <div className="space-y-8">
                        {Object.entries(groupedActivities).map(([groupName, groupItems]) => {
                            // Use color of first item for the group
                            const baseColor = groupItems[0].color;
                            const groupTheme = colorMap[baseColor] || colorMap['blue'];

                            return (
                                <div key={groupName} className="bg-white rounded-3xl p-6 shadow-sm">
                                    <h3 className={`text-xl font-bold mb-4 ${groupTheme.text}`}>{groupName}</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {groupItems.map((activity) => (
                                            <button
                                                key={activity.id}
                                                onClick={() => handleActivitySelect(activity)}
                                                className={`
                                                    min-w-[5rem] h-14 px-4 rounded-xl font-bold text-lg shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0
                                                    ${groupTheme.btnBg} ${groupTheme.btnHover} ${groupTheme.btnText}
                                                    flex items-center justify-center
                                                `}
                                            >
                                                {activity.levelLabel || (
                                                    <activity.icon size={20} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                 )}
            </main>
        </div>
    );
  }

  // --- View: Home (Categories) ---
  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-12 font-sans flex flex-col">
      <header className="w-full mb-8 flex items-center justify-start text-left">
        <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">Kinder<span className="text-blue-500">Smart</span></h1>
            <p className="text-gray-500 mt-2 text-xl">What do you want to learn today?</p>
        </div>
      </header>

      <main className="flex-1 w-full flex items-start justify-start">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 w-full max-w-6xl">
            {/* Maths Category */}
            <button 
                onClick={() => handleCategorySelect('MATHS')}
                className="group relative overflow-hidden rounded-2xl bg-blue-100 hover:bg-blue-200 transition-all duration-300 w-full aspect-square flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-400/10"></div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Calculator className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-blue-700">Maths</h2>
                <p className="text-blue-600 text-xs font-semibold mt-0.5 opacity-90 group-hover:opacity-100">Numbers</p>
            </button>

            {/* Letter Category */}
            <button 
                onClick={() => handleCategorySelect('LETTER')}
                className="group relative overflow-hidden rounded-2xl bg-slate-100 hover:bg-slate-200 transition-all duration-300 w-full aspect-square flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1"
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-slate-400/0 to-slate-400/10"></div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Pencil className="w-5 h-5 text-slate-600" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-slate-700">Letter</h2>
                <p className="text-slate-600 text-xs font-semibold mt-0.5 opacity-90 group-hover:opacity-100">Writing</p>
            </button>

            {/* Clock Category */}
            <button 
                onClick={() => handleCategorySelect('CLOCK')}
                className="group relative overflow-hidden rounded-2xl bg-indigo-100 hover:bg-indigo-200 transition-all duration-300 w-full aspect-square flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1"
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/0 to-indigo-400/10"></div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-indigo-700">Clock</h2>
                <p className="text-indigo-600 text-xs font-semibold mt-0.5 opacity-90 group-hover:opacity-100">Time</p>
            </button>

            {/* Games Category */}
            <button 
                onClick={() => handleCategorySelect('GAME')}
                className="group relative overflow-hidden rounded-2xl bg-green-100 hover:bg-green-200 transition-all duration-300 w-full aspect-square flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1"
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-400/10"></div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Gamepad2 className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-green-700">Games</h2>
                <p className="text-green-600 text-xs font-semibold mt-0.5 opacity-90 group-hover:opacity-100">Play</p>
            </button>

            {/* Picture Category */}
            <button 
                onClick={() => handleCategorySelect('PICTURE')}
                className="group relative overflow-hidden rounded-2xl bg-pink-100 hover:bg-pink-200 transition-all duration-300 w-full aspect-square flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1"
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-pink-400/0 to-pink-400/10"></div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Image className="w-5 h-5 text-pink-600" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-pink-700">Picture</h2>
                <p className="text-pink-600 text-xs font-semibold mt-0.5 opacity-90 group-hover:opacity-100">Visuals</p>
            </button>

            {/* Sudoku Category */}
            <button 
                onClick={() => handleCategorySelect('SUDOKU')}
                className="group relative overflow-hidden rounded-2xl bg-orange-100 hover:bg-orange-200 transition-all duration-300 w-full aspect-square flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1"
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-orange-400/10"></div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Grid3x3 className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-orange-800">Sudoku</h2>
                <p className="text-orange-700 text-xs font-semibold mt-0.5 opacity-90 group-hover:opacity-100">Logic</p>
            </button>

            {/* Word Search Category */}
            <button 
                onClick={() => handleCategorySelect('WORD_SEARCH')}
                className="group relative overflow-hidden rounded-2xl bg-violet-100 hover:bg-violet-200 transition-all duration-300 w-full aspect-square flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1"
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-violet-400/0 to-violet-400/10"></div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-5 h-5 text-violet-600" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-violet-700">Word Search</h2>
                <p className="text-violet-600 text-xs font-semibold mt-0.5 opacity-90 group-hover:opacity-100">Words</p>
            </button>

             {/* Grammar Category */}
             <button 
                onClick={() => handleCategorySelect('GRAMMAR')}
                className="group relative overflow-hidden rounded-2xl bg-yellow-100 hover:bg-yellow-200 transition-all duration-300 w-full aspect-square flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1"
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-yellow-400/10"></div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <PenTool className="w-5 h-5 text-yellow-700" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-yellow-800">Grammar</h2>
                <p className="text-yellow-700 text-xs font-semibold mt-0.5 opacity-90 group-hover:opacity-100">Writing</p>
            </button>

            {/* Vocabulary Category */}
            <button 
                onClick={() => handleCategorySelect('VOCABULARY')}
                className="group relative overflow-hidden rounded-2xl bg-teal-100 hover:bg-teal-200 transition-all duration-300 w-full aspect-square flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1"
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-teal-400/0 to-teal-400/10"></div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <BookA className="w-5 h-5 text-teal-600" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-teal-700">Vocabulary</h2>
                <p className="text-teal-600 text-xs font-semibold mt-0.5 opacity-90 group-hover:opacity-100">Words</p>
            </button>

            {/* Reading Category */}
            <button 
                onClick={() => handleCategorySelect('READING')}
                className="group relative overflow-hidden rounded-2xl bg-sky-100 hover:bg-sky-200 transition-all duration-300 w-full aspect-square flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1"
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-sky-400/0 to-sky-400/10"></div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-5 h-5 text-sky-600" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-sky-700">Reading</h2>
                <p className="text-sky-600 text-xs font-semibold mt-0.5 opacity-90 group-hover:opacity-100">Stories</p>
            </button>

             {/* Sound Category */}
             <button 
                onClick={() => handleCategorySelect('SOUND')}
                className="group relative overflow-hidden rounded-2xl bg-fuchsia-100 hover:bg-fuchsia-200 transition-all duration-300 w-full aspect-square flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1"
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400/0 to-fuchsia-400/10"></div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Volume2 className="w-5 h-5 text-fuchsia-600" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-fuchsia-700">Sound</h2>
                <p className="text-fuchsia-600 text-xs font-semibold mt-0.5 opacity-90 group-hover:opacity-100">Phonics</p>
            </button>

            {/* Science Category */}
            <button 
                onClick={() => handleCategorySelect('SCIENCE')}
                className="group relative overflow-hidden rounded-2xl bg-emerald-100 hover:bg-emerald-200 transition-all duration-300 w-full aspect-square flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1"
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 to-emerald-400/10"></div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <FlaskConical className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-emerald-700">Science</h2>
                <p className="text-emerald-600 text-xs font-semibold mt-0.5 opacity-90 group-hover:opacity-100">Explore</p>
            </button>

        </div>
      </main>
      
      <footer className="mt-16 text-left text-gray-400 text-sm pb-6">
        <p>© 2026 KinderSmart Learning</p>
      </footer>
    </div>
  );
};

export default App;