import { GoogleGenAI, Type } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelId = "gemini-2.5-flash";

export const generateMathQuestion = async (difficulty: string): Promise<{ question: string; options: string[]; answer: string } | null> => {
  try {
    const prompt = `Generate a single kindergarten math question (simple addition or subtraction) for difficulty ${difficulty}. 
    Return JSON with format: { "question": "2 + 2 = ?", "options": ["3", "4", "5", "1"], "answer": "4" }`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            answer: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Math Error", error);
    return null;
  }
};

export const generateScienceFact = async (): Promise<{ topic: string, fact: string, question: string, options: string[], answer: string } | null> => {
  try {
    const prompt = `Tell a fun, very short science fact for a 5-year-old, then ask a simple question about it.
    JSON Format: { "topic": "Space", "fact": "The sun is a giant star that keeps us warm.", "question": "What keeps us warm?", "options": ["The Sun", "The Moon", "Ice"], "answer": "The Sun" }`;

    const response = await ai.models.generateContent({
        model: modelId,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    topic: { type: Type.STRING },
                    fact: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    answer: { type: Type.STRING }
                }
            }
        }
    });
    
    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const generateStory = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Write a very short, cute 3-sentence story for a kindergartener about: ${topic}. Use simple words.`,
    });
    return response.text || "Once upon a time...";
  } catch (error) {
    return "Sorry, I couldn't think of a story right now. Try again!";
  }
};