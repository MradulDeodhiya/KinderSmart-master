import React, { useState, useEffect, useCallback } from 'react';
import { ActivityConfig, QuizQuestion } from '../types';
import { generateMathQuestion } from '../services/geminiService';
import { Loader2, Check, X } from 'lucide-react';

interface QuizGameProps {
  config: ActivityConfig;
  onComplete: (score: number) => void;
}

const COLORS = [
    { name: 'Red', hex: 'bg-red-500' },
    { name: 'Blue', hex: 'bg-blue-500' },
    { name: 'Green', hex: 'bg-green-500' },
    { name: 'Yellow', hex: 'bg-yellow-400' },
    { name: 'Purple', hex: 'bg-purple-500' },
    { name: 'Orange', hex: 'bg-orange-500' },
];

const QuizGame: React.FC<QuizGameProps> = ({ config, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [streak, setStreak] = useState(0);

  const loadQuestion = useCallback(async () => {
    setLoading(true);
    setFeedback(null);

    try {
      if (config.quizType === 'MATH') {
        const data = await generateMathQuestion('EASY');
        if (data) {
          setCurrentQuestion({
            question: data.question,
            options: data.options,
            correctAnswer: data.answer
          });
        } else {
            // Fallback
            setCurrentQuestion({
                question: "1 + 1 = ?",
                options: ["1", "2", "3", "4"],
                correctAnswer: "2"
            });
        }
      } else if (config.quizType === 'COLOR') {
         const targetColor = COLORS[Math.floor(Math.random() * COLORS.length)];
         const options = COLORS.sort(() => Math.random() - 0.5).slice(0, 4).map(c => c.name);
         if(!options.includes(targetColor.name)) options[0] = targetColor.name; // ensure correct answer exists
         
         setCurrentQuestion({
            question: "Which color is this?",
            options: options.sort(() => Math.random() - 0.5),
            correctAnswer: targetColor.name,
            visual: <div className={`w-32 h-32 rounded-full ${targetColor.hex} shadow-inner mb-6`} />
         });
      } else if (config.quizType === 'SHAPE') {
         const shapes = ['Circle', 'Square', 'Triangle', 'Star'];
         const target = shapes[Math.floor(Math.random() * shapes.length)];
         setCurrentQuestion({
            question: `Which one is the ${target}?`,
            options: shapes, // In a real shape game, options would be visual components, simplified here to text for demo
            correctAnswer: target,
            visual: <div className="text-9xl mb-4">{target === 'Circle' ? '⭕' : target === 'Square' ? '🟥' : target === 'Triangle' ? '🔺' : '⭐'}</div>
         });
      } else if (config.quizType === 'CLOCK') {
         const hour = Math.floor(Math.random() * 12) + 1;
         setCurrentQuestion({
            question: "What time does the clock show?",
            options: [`${hour}:00`, `${hour === 12 ? 1 : hour + 1}:00`, `${hour === 1 ? 12 : hour - 1}:00`, "6:30"],
            correctAnswer: `${hour}:00`,
            visual: (
                <div className="relative w-40 h-40 border-4 border-gray-800 rounded-full flex items-center justify-center bg-white shadow-xl mb-6">
                    {/* Simple clock face */}
                    <div className="absolute top-2 text-xs font-bold">12</div>
                    <div className="absolute bottom-2 text-xs font-bold">6</div>
                    <div className="absolute right-2 text-xs font-bold">3</div>
                    <div className="absolute left-2 text-xs font-bold">9</div>
                    {/* Hands */}
                    <div className="w-1 h-12 bg-black absolute bottom-1/2 origin-bottom transform" style={{ transform: `rotate(${hour * 30}deg)`}}></div>
                    <div className="w-1 h-16 bg-gray-400 absolute bottom-1/2 origin-bottom transform rotate-0"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full absolute z-10"></div>
                </div>
            )
         });
      }
    } catch (err) {
        console.error(err);
    } finally {
      setLoading(false);
    }
  }, [config.quizType]);

  useEffect(() => {
    loadQuestion();
  }, [loadQuestion]);

  const handleAnswer = (answer: string) => {
    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      setFeedback('correct');
      setStreak(s => s + 1);
      onComplete(streak * 10 + 10); // Notify parent of score update
      setTimeout(() => {
        loadQuestion();
      }, 1500);
    } else {
      setFeedback('wrong');
      setStreak(0);
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="flex flex-col items-center justify-center max-w-lg mx-auto w-full h-full">
      {currentQuestion.visual}
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{currentQuestion.question}</h2>
      
      <div className="grid grid-cols-2 gap-4 w-full">
        {currentQuestion.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            disabled={feedback !== null}
            className={`
              p-6 rounded-2xl text-2xl font-bold shadow-md transition-all transform hover:scale-105
              ${feedback === 'correct' && opt === currentQuestion.correctAnswer ? 'bg-green-500 text-white' : ''}
              ${feedback === 'wrong' && opt !== currentQuestion.correctAnswer ? 'opacity-50' : ''}
              ${feedback === null ? 'bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-100' : ''}
            `}
          >
            {opt}
          </button>
        ))}
      </div>

      {feedback === 'correct' && (
        <div className="mt-6 animate-bounce">
            <div className="flex items-center gap-2 text-green-600 text-2xl font-bold">
                <Check className="w-8 h-8" /> Correct!
            </div>
        </div>
      )}
      {feedback === 'wrong' && (
        <div className="mt-6 animate-shake">
             <div className="flex items-center gap-2 text-red-500 text-xl font-bold">
                <X className="w-6 h-6" /> Try Again!
            </div>
        </div>
      )}
    </div>
  );
};

export default QuizGame;