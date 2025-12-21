import React, { useState, useEffect } from 'react';
import { ActivityConfig, QuizQuestion } from '../types';
import { generatePictureQuestion } from '../utils/pictureGenerator';
import { Check, X, ArrowRight } from 'lucide-react';

interface PictureGameProps {
  config: ActivityConfig;
  onComplete: (score: number) => void;
}

const PictureGame: React.FC<PictureGameProps> = ({ config, onComplete }) => {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadNewQuestion();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.id]);

  const loadNewQuestion = () => {
    const q = generatePictureQuestion(config.pictureTopic || 'ANIMALS');
    setQuestion(q);
    setFeedback(null);
  };

  const handleAnswer = (ans: string) => {
    if (!question) return;
    if (ans === question.correctAnswer) {
        setFeedback('correct');
        setStreak(s => s + 1);
        onComplete(streak * 10 + 10);
        setTimeout(loadNewQuestion, 1500);
    } else {
        setFeedback('wrong');
        setStreak(0);
        setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto w-full">
      
      {/* Visual Container */}
      <div className="flex-1 flex flex-col items-center justify-center mb-8">
          {question.visual}
          <h2 className="text-3xl font-bold text-gray-800 mt-4 text-center">{question.question}</h2>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {question.options.map((opt, i) => (
            <button
                key={i}
                onClick={() => handleAnswer(opt)}
                disabled={feedback !== null}
                className={`
                    p-6 rounded-2xl text-xl md:text-2xl font-bold shadow-md transition-all transform hover:-translate-y-1 active:scale-95
                    ${feedback === 'correct' && opt === question.correctAnswer ? 'bg-green-500 text-white ring-4 ring-green-200' : ''}
                    ${feedback === 'wrong' && opt !== question.correctAnswer ? 'opacity-50' : ''}
                    ${feedback === 'wrong' && opt === question.correctAnswer ? 'bg-green-100 text-green-700 ring-2 ring-green-500' : ''}
                    ${feedback === null ? 'bg-white text-gray-700 border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50' : ''}
                `}
            >
                {opt}
            </button>
        ))}
      </div>

      {/* Feedback Overlay */}
      {feedback === 'correct' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="bg-white/90 p-8 rounded-full shadow-2xl animate-bounce-in">
                  <Check className="w-24 h-24 text-green-500" strokeWidth={3} />
              </div>
          </div>
      )}
      {feedback === 'wrong' && (
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
               <div className="bg-white/90 p-8 rounded-full shadow-2xl animate-shake">
                   <X className="w-24 h-24 text-red-500" strokeWidth={3} />
               </div>
           </div>
      )}
    </div>
  );
};

export default PictureGame;