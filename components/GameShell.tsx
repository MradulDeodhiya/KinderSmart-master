import React from 'react';
import { ArrowLeft, Trophy } from 'lucide-react';

interface GameShellProps {
  title: string;
  color: string; // e.g., 'blue'
  onBack: () => void;
  score?: number;
  children: React.ReactNode;
}

const GameShell: React.FC<GameShellProps> = ({ title, color, onBack, score, children }) => {
  // Map color names to tailwind classes dynamically (needs safe-listing or explicit mapping in real prod, simplified here)
  const bgMap: Record<string, { bg: string; text: string; border: string; button: string }> = {
    red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', button: 'bg-red-500 hover:bg-red-600' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', button: 'bg-blue-500 hover:bg-blue-600' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', button: 'bg-green-500 hover:bg-green-600' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', button: 'bg-yellow-500 hover:bg-yellow-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', button: 'bg-purple-500 hover:bg-purple-600' },
    pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200', button: 'bg-pink-500 hover:bg-pink-600' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', button: 'bg-indigo-500 hover:bg-indigo-600' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', button: 'bg-orange-500 hover:bg-orange-600' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', button: 'bg-teal-500 hover:bg-teal-600' },
    cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', button: 'bg-cyan-500 hover:bg-cyan-600' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', button: 'bg-emerald-500 hover:bg-emerald-600' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', button: 'bg-amber-500 hover:bg-amber-600' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', button: 'bg-violet-500 hover:bg-violet-600' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', button: 'bg-rose-500 hover:bg-rose-600' },
    lime: { bg: 'bg-lime-50', text: 'text-lime-600', border: 'border-lime-200', button: 'bg-lime-500 hover:bg-lime-600' },
    fuchsia: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-600', border: 'border-fuchsia-200', button: 'bg-fuchsia-500 hover:bg-fuchsia-600' },
    slate: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', button: 'bg-slate-500 hover:bg-slate-600' },
  };

  const styles = bgMap[color] || bgMap['blue'];

  return (
    <div className={`min-h-screen flex flex-col ${styles.bg}`}>
      <header className={`px-6 py-4 bg-white shadow-sm flex items-center justify-between sticky top-0 z-10`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors`}
          >
            <ArrowLeft className={`w-8 h-8 ${styles.text}`} />
          </button>
          <h1 className={`text-2xl md:text-3xl font-bold ${styles.text}`}>{title}</h1>
        </div>
        {score !== undefined && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${styles.text} bg-opacity-20 bg-gray-200 font-bold text-xl`}>
                <Trophy className="w-6 h-6 fill-current" />
                <span>{score}</span>
            </div>
        )}
      </header>
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 min-h-[500px]">
            {children}
        </div>
      </main>
    </div>
  );
};

export default GameShell;