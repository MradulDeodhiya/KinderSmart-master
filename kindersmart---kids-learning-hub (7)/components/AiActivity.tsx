import React, { useState } from 'react';
import { ActivityConfig, ActivityType } from '../types';
import { generateScienceFact, generateStory } from '../services/geminiService';
import { Loader2, BookOpen, Sparkles, Lightbulb } from 'lucide-react';

interface AiActivityProps {
  config: ActivityConfig;
}

const AiActivity: React.FC<AiActivityProps> = ({ config }) => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    if (config.type === ActivityType.AI_SCIENCE) {
        const data = await generateScienceFact();
        setContent({ type: 'science', data });
    } else {
        // Story
        const topic = userInput || "a magical unicorn";
        const story = await generateStory(topic);
        setContent({ type: 'story', text: story });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center h-full max-w-lg mx-auto text-center">
        <div className={`p-4 rounded-full mb-6 ${config.color === 'pink' ? 'bg-pink-100 text-pink-500' : 'bg-teal-100 text-teal-500'}`}>
            {config.type === ActivityType.AI_STORY ? <BookOpen size={48} /> : <Lightbulb size={48} />}
        </div>
        
        <h2 className="text-2xl font-bold mb-4">
            {config.type === ActivityType.AI_STORY ? "Let's Read a Story!" : "Did You Know?"}
        </h2>

        {!content && !loading && (
            <div className="w-full space-y-4">
                {config.type === ActivityType.AI_STORY && (
                    <div>
                        <p className="mb-2 text-gray-600">What should the story be about?</p>
                        <div className="flex gap-2 mb-4">
                            {['🐶 Dog', '🚀 Space', '👸 Princess', '🦖 Dino'].map(t => (
                                <button key={t} onClick={() => setUserInput(t)} className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">
                                    {t}
                                </button>
                            ))}
                        </div>
                        <input 
                            type="text" 
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="e.g. A cat who loves pizza"
                            className="w-full p-4 border-2 border-gray-200 rounded-xl mb-4 focus:outline-none focus:border-pink-400"
                        />
                    </div>
                )}
                <button 
                    onClick={handleGenerate}
                    className={`w-full py-4 rounded-2xl text-white font-bold text-xl shadow-lg transform transition hover:scale-105 active:scale-95 flex items-center justify-center gap-2
                        ${config.color === 'pink' ? 'bg-pink-500' : 'bg-teal-500'}
                    `}
                >
                    <Sparkles /> {config.type === ActivityType.AI_STORY ? "Write Magic Story" : "Tell me a Fact"}
                </button>
            </div>
        )}

        {loading && (
            <div className="flex flex-col items-center py-10">
                <Loader2 className="w-12 h-12 animate-spin text-gray-400 mb-4" />
                <p className="text-gray-500 animate-pulse">Thinking...</p>
            </div>
        )}

        {content && !loading && (
            <div className="text-left bg-gray-50 p-6 rounded-2xl w-full animate-fade-in">
                {content.type === 'story' ? (
                    <p className="text-xl leading-relaxed text-gray-700 font-medium">
                        {content.text}
                    </p>
                ) : (
                    content.data && (
                        <div>
                            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mb-3">{content.data.topic}</span>
                            <p className="text-xl font-bold text-gray-800 mb-6">{content.data.fact}</p>
                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                                <p className="font-bold text-gray-600 mb-2">Q: {content.data.question}</p>
                                <p className="text-green-600 font-bold">A: {content.data.answer}</p>
                            </div>
                        </div>
                    )
                )}
                <button 
                    onClick={() => { setContent(null); setUserInput(''); }}
                    className="mt-6 text-gray-400 font-bold hover:text-gray-600 underline"
                >
                    Start Over
                </button>
            </div>
        )}
    </div>
  );
};

export default AiActivity;