import React, { useState, useEffect } from 'react';
import { ActivityConfig } from '../types';
import { generateTimeQuestion, TimeQuestion } from '../utils/timeGenerator';
import { ArrowRight, Trophy, RefreshCw, Check, MoveLeft, MoveRight } from 'lucide-react';

interface ClockGameProps {
  config: ActivityConfig;
  onComplete: (score: number) => void;
}

const ClockGame: React.FC<ClockGameProps> = ({ config, onComplete }) => {
  const [level, setLevel] = useState(1);
  const [target, setTarget] = useState<TimeQuestion | null>(null);
  
  // State for 'SET' mode (User manipulates these)
  const [currentHours, setCurrentHours] = useState(12);
  const [currentMinutes, setCurrentMinutes] = useState(0);

  // State for 'WRITE' mode (User types these)
  const [inputHours, setInputHours] = useState('');
  const [inputMinutes, setInputMinutes] = useState('');
  const [activeInput, setActiveInput] = useState<'H' | 'M'>('H'); // Which input is focused

  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
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
    const q = generateTimeQuestion(config.clockPrecision || 'HOUR', level);
    setTarget(q);
    
    // Reset User States
    setCurrentHours(12);
    setCurrentMinutes(0);
    setInputHours('');
    setInputMinutes('');
    setActiveInput('H');
    setFeedback(null);
  };

  // --- Handlers for SET mode ---
  const adjustTime = (type: 'H' | 'M', amount: number) => {
    if (type === 'H') {
      let newH = currentHours + amount;
      if (newH > 12) newH = 1;
      if (newH < 1) newH = 12;
      setCurrentHours(newH);
    } else {
      let newM = currentMinutes + amount;
      if (newM >= 60) newM = 0;
      if (newM < 0) newM = 45; // specific logic if -15 from 0
      // Rounding logic for simplicity if precision is minutes
      if (config.clockPrecision === 'MINUTE' && amount === 1 && newM < 0) newM = 59;
      setCurrentMinutes(newM);
    }
  };

  const checkSetTime = () => {
    if (!target) return;
    if (currentHours === target.hours && currentMinutes === target.minutes) {
        handleCorrect();
    } else {
        handleWrong();
    }
  };

  // --- Handlers for WRITE mode ---
  const handleKeypad = (val: string) => {
    if (val === 'ENTER') {
        const h = parseInt(inputHours);
        const m = parseInt(inputMinutes);
        if (!target) return;
        if (h === target.hours && m === target.minutes) {
            handleCorrect();
        } else {
            handleWrong();
        }
        return;
    }

    if (val === 'DEL') {
        if (activeInput === 'M') {
            if (inputMinutes.length > 0) setInputMinutes(prev => prev.slice(0, -1));
            else setActiveInput('H');
        } else {
            setInputHours(prev => prev.slice(0, -1));
        }
        return;
    }

    // Number input
    if (activeInput === 'H') {
        if (inputHours.length < 2) {
            const next = inputHours + val;
            if (parseInt(next) > 12 && next.length === 2) return; // Prevent invalid hours > 12 roughly
            setInputHours(next);
            if (next.length === 2 || parseInt(next) > 1) setActiveInput('M');
        }
    } else {
        if (inputMinutes.length < 2) {
            setInputMinutes(prev => prev + val);
        }
    }
  };

  const handleCorrect = () => {
    setFeedback('correct');
    setTimeout(() => {
        setLevel(prev => prev + 1);
    }, 1500);
  };

  const handleWrong = () => {
    setFeedback('wrong');
    setTimeout(() => {
        setFeedback(null);
        if (config.clockMode === 'WRITE') {
            setInputHours('');
            setInputMinutes('');
            setActiveInput('H');
        }
    }, 1000);
  };

  if (showWin) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center animate-bounce-in">
           <Trophy className="w-24 h-24 text-indigo-500 mb-6" />
           <h2 className="text-4xl font-bold text-gray-800 mb-2">Time Master!</h2>
           <p className="text-gray-500 mb-8">You finished all levels.</p>
           <button 
              onClick={() => { setLevel(1); setShowWin(false); }}
              className="px-8 py-3 bg-indigo-500 text-white rounded-full font-bold flex items-center gap-2 hover:bg-indigo-600"
           >
              <RefreshCw /> Play Again
           </button>
      </div>
    );
  }

  if (!target) return <div>Loading...</div>;

  // Determine what time to display on the clock face
  // If SET mode: show user's current adjustment
  // If WRITE mode: show the target time
  const displayHours = config.clockMode === 'SET' ? currentHours : target.hours;
  const displayMinutes = config.clockMode === 'SET' ? currentMinutes : target.minutes;

  // Calculate rotation
  const minuteRotation = displayMinutes * 6; // 360 / 60 = 6 deg per min
  const hourRotation = (displayHours % 12) * 30 + (displayMinutes * 0.5); // 30 deg per hour + 0.5 deg per min

  return (
    <div className="flex flex-col items-center h-full max-w-lg mx-auto">
      {/* Header Level */}
      <div className="w-full flex justify-between items-center mb-6 px-4">
         <span className="font-bold text-gray-400">Level {level}/10</span>
         <div className="flex gap-1">
             {Array.from({length: 10}).map((_, i) => (
                 <div key={i} className={`h-2 w-4 rounded-full ${i < level ? 'bg-indigo-500' : 'bg-gray-200'}`} />
             ))}
         </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        {config.clockMode === 'SET' ? `Make the clock read ${target.targetTimeStr}` : "What time is it?"}
      </h2>

      {/* CLOCK FACE */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-full shadow-2xl border-8 border-gray-800 flex items-center justify-center mb-8">
          {/* Numbers */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(num => {
              const angle = (num * 30 - 90) * (Math.PI / 180);
              const r = 40; // percentage radius roughly
              const x = 50 + r * Math.cos(angle);
              const y = 50 + r * Math.sin(angle);
              return (
                  <div key={num} className="absolute text-xl md:text-2xl font-bold text-gray-600" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
                      {num}
                  </div>
              );
          })}

          {/* Minute Ticks (simplified) */}
          {Array.from({length: 60}).map((_, i) => (
              <div 
                key={i} 
                className={`absolute w-0.5 bg-gray-300 ${i % 5 === 0 ? 'h-3 bg-gray-600' : 'h-1'} origin-bottom`}
                style={{ 
                    bottom: '50%', 
                    left: 'calc(50% - 1px)', 
                    height: '48%', 
                    transform: `rotate(${i * 6}deg) translateY(-100%)` 
                }} // Logic to push ticks to edge is simplified here by visual check
              /> 
          ))}
           {/* Better ticks rendering */}
           {Array.from({length: 12}).map((_, i) => (
               <div key={i} className="absolute w-1 h-3 bg-gray-400" style={{ transform: `rotate(${i*30}deg) translateY(-110px)` }} />
           ))}


          {/* Hands */}
          {/* Hour Hand */}
          <div 
            className="absolute w-2 h-20 md:h-24 bg-black rounded-full origin-bottom bottom-1/2 left-1/2 -translate-x-1/2 shadow-sm transition-transform duration-300 ease-out z-10"
            style={{ transform: `translateX(-50%) rotate(${hourRotation}deg)` }}
          />
          {/* Minute Hand */}
          <div 
            className="absolute w-1.5 h-28 md:h-32 bg-indigo-500 rounded-full origin-bottom bottom-1/2 left-1/2 -translate-x-1/2 shadow-sm transition-transform duration-300 ease-out z-10"
            style={{ transform: `translateX(-50%) rotate(${minuteRotation}deg)` }}
          />
          {/* Center Dot */}
          <div className="absolute w-4 h-4 bg-indigo-600 rounded-full z-20 border-2 border-white" />
      </div>

      {/* CONTROLS AREA */}
      <div className="w-full">
        {config.clockMode === 'SET' ? (
            <div className="flex flex-col gap-4 items-center">
                 <div className="flex gap-8">
                     <div className="flex flex-col items-center gap-2">
                         <span className="text-sm font-bold text-gray-400">HOURS</span>
                         <div className="flex gap-2">
                             <button onClick={() => adjustTime('H', -1)} className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200"><MoveLeft /></button>
                             <button onClick={() => adjustTime('H', 1)} className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200"><MoveRight /></button>
                         </div>
                     </div>
                     <div className="flex flex-col items-center gap-2">
                         <span className="text-sm font-bold text-gray-400">MINUTES</span>
                         <div className="flex gap-2">
                             <button onClick={() => adjustTime('M', config.clockPrecision === 'MINUTE' ? -1 : -15)} className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200"><MoveLeft /></button>
                             <button onClick={() => adjustTime('M', config.clockPrecision === 'MINUTE' ? 1 : 15)} className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200"><MoveRight /></button>
                         </div>
                     </div>
                 </div>

                 <button 
                    onClick={checkSetTime}
                    className="mt-4 px-10 py-4 bg-green-500 text-white rounded-2xl text-xl font-bold shadow-lg hover:bg-green-600 active:scale-95 transition-all"
                 >
                    Check Answer
                 </button>
            </div>
        ) : (
            // WRITE MODE
            <div className="flex flex-col items-center animate-fade-in">
                 <div className="flex items-center gap-2 text-4xl font-mono font-bold text-gray-800 mb-6 bg-gray-100 p-4 rounded-xl border-4 border-gray-200">
                      <div 
                        onClick={() => setActiveInput('H')}
                        className={`min-w-[60px] text-center p-2 rounded-lg cursor-pointer transition-colors ${activeInput === 'H' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400'}`}
                      >
                          {inputHours || '--'}
                      </div>
                      <span className="text-gray-400">:</span>
                      <div 
                        onClick={() => setActiveInput('M')}
                        className={`min-w-[60px] text-center p-2 rounded-lg cursor-pointer transition-colors ${activeInput === 'M' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400'}`}
                      >
                          {inputMinutes || '--'}
                      </div>
                 </div>

                 {/* Keypad */}
                 <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
                     {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                         <button key={n} onClick={() => handleKeypad(n.toString())} className="h-14 bg-white border border-gray-200 shadow-sm rounded-xl text-xl font-bold text-gray-700 hover:bg-gray-50 active:bg-gray-100">{n}</button>
                     ))}
                     <button onClick={() => handleKeypad('DEL')} className="h-14 bg-red-50 border border-red-100 shadow-sm rounded-xl text-lg font-bold text-red-500">DEL</button>
                     <button onClick={() => handleKeypad('0')} className="h-14 bg-white border border-gray-200 shadow-sm rounded-xl text-xl font-bold text-gray-700">0</button>
                     <button onClick={() => handleKeypad('ENTER')} className="h-14 bg-green-500 shadow-sm rounded-xl text-xl font-bold text-white flex items-center justify-center"><ArrowRight /></button>
                 </div>
            </div>
        )}
      </div>

       {/* Feedback Overlay */}
       {feedback === 'correct' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="bg-white/90 p-8 rounded-full shadow-2xl animate-bounce-in backdrop-blur-sm">
                  <Check className="w-24 h-24 text-green-500" strokeWidth={3} />
              </div>
          </div>
      )}
    </div>
  );
};

export default ClockGame;