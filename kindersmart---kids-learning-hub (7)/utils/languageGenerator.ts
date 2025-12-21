import { QuizQuestion, MatchingPair, SentenceData, FillData } from '../types';

// --- GRAMMAR ---
export const generateGrammarQuiz = (topic: string): QuizQuestion => {
    switch(topic) {
        case 'ARTICLE':
            const articles = [
                { q: "___ apple", a: "An" }, { q: "___ cat", a: "A" }, 
                { q: "___ sun", a: "The" }, { q: "___ umbrella", a: "An" },
                { q: "___ dog", a: "A" }, { q: "___ moon", a: "The" }
            ];
            const artItem = articles[Math.floor(Math.random() * articles.length)];
            return {
                question: `Choose: ${artItem.q}`,
                correctAnswer: artItem.a,
                options: ["A", "An", "The", "None"].sort(() => Math.random() - 0.5)
            };
        case 'VERB':
            return {
                question: "Identify the Action Word (Verb)",
                correctAnswer: "Run",
                options: ["Run", "Table", "Blue", "Happy"].sort(() => Math.random() - 0.5)
            };
        case 'IS_AM_ARE':
            const iaa = [
                { q: "He ___ playing", a: "is" }, { q: "I ___ happy", a: "am" }, { q: "They ___ running", a: "are" }
            ];
            const iaaItem = iaa[Math.floor(Math.random() * iaa.length)];
            return { question: iaaItem.q, correctAnswer: iaaItem.a, options: ["is", "am", "are", "was"] };
        case 'PROPER_NOUN':
            return {
                question: "Which is a Proper Noun?",
                correctAnswer: "John",
                options: ["John", "boy", "city", "dog"].sort(() => Math.random() - 0.5)
            };
        case 'NOUN_VS_VERB':
             const nvv = Math.random() > 0.5 ? { q: "Find the Noun", a: "Car", o: ["Car", "Run", "Jump", "Eat"] } 
                                             : { q: "Find the Verb", a: "Sleep", o: ["Sleep", "Bed", "Pillow", "Room"] };
             return { question: nvv.q, correctAnswer: nvv.a, options: nvv.o.sort(() => Math.random() - 0.5) };
        default:
            return { question: "Select Correct", correctAnswer: "A", options: ["A", "B"] };
    }
};

export const generateSentence = (level: number): SentenceData => {
    const sentences = [
        "I like apples", "The cat runs", "Sun is hot", "Birds can fly",
        "I have a ball", "She loves to play", "The dog is big",
        "My car is red", "We go to school", "It is raining today"
    ];
    const sentence = sentences[Math.floor(Math.random() * Math.min(sentences.length, level + 3))];
    return {
        words: sentence.split(' ').sort(() => Math.random() - 0.5),
        correctSentence: sentence
    };
};

// --- VOCABULARY ---
export const generateVocabFill = (type: '3LETTER' | '4LETTER' | 'COMPLETE' | 'MISSING', level: number): FillData => {
    if (type === '3LETTER') {
        const words = ["CAT", "DOG", "BAT", "SUN", "RUN", "CAR", "BUS", "EGG"];
        const w = words[Math.floor(Math.random() * words.length)];
        // hide one letter
        const hideIdx = Math.floor(Math.random() * 3);
        const q = w.split('').map((char, i) => i === hideIdx ? '_' : char).join(' ');
        return { question: q, answer: w[hideIdx], fullWord: w };
    }
    if (type === '4LETTER') {
        const words = ["BALL", "BIRD", "FISH", "MILK", "BOOK", "TREE"];
        const w = words[Math.floor(Math.random() * words.length)];
        const hideIdx = Math.floor(Math.random() * 4);
        return { question: w.split('').map((c, i) => i === hideIdx ? '_' : c).join(' '), answer: w[hideIdx], fullWord: w };
    }
    return { question: "Ap_le", answer: "p", fullWord: "Apple" };
};

export const generateMatching = (topic: string): MatchingPair[] => {
    switch(topic) {
        case 'ANTONYMS':
            return [
                { id: '1', left: 'Hot', right: 'Cold' },
                { id: '2', left: 'Big', right: 'Small' },
                { id: '3', left: 'Up', right: 'Down' },
                { id: '4', left: 'Day', right: 'Night' }
            ].sort(() => Math.random() - 0.5).slice(0, 4);
        case 'SYNONYMS':
            return [
                { id: '1', left: 'Happy', right: 'Glad' },
                { id: '2', left: 'Big', right: 'Large' },
                { id: '3', left: 'Fast', right: 'Quick' },
                { id: '4', left: 'Start', right: 'Begin' }
            ].sort(() => Math.random() - 0.5).slice(0, 4);
        case 'ANIMALS_MOVE':
             return [
                { id: '1', left: 'Bird', right: 'Fly' },
                { id: '2', left: 'Fish', right: 'Swim' },
                { id: '3', left: 'Frog', right: 'Jump' },
                { id: '4', left: 'Snake', right: 'Crawl' }
            ];
        case 'SIMPLE_WORDS':
            // Picture to word matching conceptually, here text to text for simplicity or emoji
            return [
                { id: '1', left: '🍎', right: 'Apple' },
                { id: '2', left: '🚗', right: 'Car' },
                { id: '3', left: '🐶', right: 'Dog' },
                { id: '4', left: '☀️', right: 'Sun' }
            ].sort(() => Math.random() - 0.5);
        case 'VOWELS':
             return [
                 { id: '1', left: 'A', right: 'Apple' },
                 { id: '2', left: 'E', right: 'Egg' },
                 { id: '3', left: 'I', right: 'Ice' },
                 { id: '4', left: 'O', right: 'Owl' },
                 { id: '5', left: 'U', right: 'Umbrella' }
             ];
        default: return [];
    }
};

// --- LETTER / READING / SOUND ---
export const getReadingContent = (id: string): string => {
    const stories: Record<string, string> = {
        'reading-apple': "I see a red apple. It is on the tree. I like to eat apples. They are sweet and crunchy.",
        'reading-ant': "Look at the little ant. The ant works hard. It carries food. Go, little ant, go!",
        'reading-dog': "This is my dog. His name is Max. Max likes to run. He barks at the cat.",
        'reading-balloons': "I have three balloons. One is red. One is blue. One is yellow. They float up high.",
        'reading-frog': "The frog is green. It sits on a log. It can jump very high. Ribbit, ribbit!",
        'reading-ladybug': "I see a ladybug. It is red with black spots. It is very small. It crawls on a leaf.",
        'reading-rabbit': "The rabbit has long ears. It hops fast. It likes to eat carrots. It has a fluffy tail.",
        'reading-teddy': "This is my teddy bear. It is soft and brown. I hug my teddy. Goodnight, teddy.",
        'reading-sara': "Sara is my friend. We play together. We like to jump rope. Sara is fun.",
        'reading-routine': "I wake up. I brush my teeth. I eat breakfast. I go to school. I learn and play."
    };
    return stories[id] || "Story not found.";
};

export const generateSoundQuiz = (topic: string): QuizQuestion => {
    // Uses TTS in component, here just data
    if (topic === 'ANIMAL') {
        const animals = [{n:'Dog', s:'Woof'}, {n:'Cat', s:'Meow'}, {n:'Cow', s:'Moo'}, {n:'Duck', s:'Quack'}];
        const target = animals[Math.floor(Math.random() * animals.length)];
        return {
            question: `Who says "${target.s}"?`,
            correctAnswer: target.n,
            options: animals.map(a => a.n).sort(() => Math.random() - 0.5),
            audioText: target.s // For TTS if needed, or just visual text
        };
    }
    // Simple Words Dictation
    const words = ["Cat", "Bed", "Pig", "Box", "Sun", "Hat", "Pen"];
    const word = words[Math.floor(Math.random() * words.length)];
    return {
        question: "Listen and pick the word",
        correctAnswer: word,
        options: [word, ...words.filter(w => w !== word).slice(0, 3)].sort(() => Math.random() - 0.5),
        audioText: word
    };
};

export const generateScienceQuiz = (topic: string): QuizQuestion => {
    switch(topic) {
        case 'DOMESTIC_WILD':
            const isDomestic = Math.random() > 0.5;
            const dom = ["Dog", "Cat", "Cow", "Sheep"];
            const wild = ["Lion", "Tiger", "Bear", "Shark"];
            const target = isDomestic ? dom[Math.floor(Math.random() * dom.length)] : wild[Math.floor(Math.random() * wild.length)];
            return {
                question: isDomestic ? `Which is a Domestic Animal?` : `Which is a Wild Animal?`,
                correctAnswer: target,
                options: [target, ...(isDomestic ? wild.slice(0, 3) : dom.slice(0, 3))].sort(() => Math.random() - 0.5)
            };
        case 'PLANT_PARTS':
             const parts = ["Root", "Stem", "Leaf", "Flower"];
             return { question: "Which part is under the ground?", correctAnswer: "Root", options: parts };
        case 'SENSES':
             return { question: "We see with our...", correctAnswer: "Eyes", options: ["Eyes", "Ears", "Nose", "Hands"] };
        case 'HEALTHY_FOOD':
             const healthy = ["Apple", "Carrot", "Milk", "Banana"];
             const junk = ["Candy", "Burger", "Soda", "Chips"];
             const isH = Math.random() > 0.5;
             const tFood = isH ? healthy[Math.floor(Math.random()*healthy.length)] : junk[Math.floor(Math.random()*junk.length)];
             return {
                 question: isH ? "Which is Healthy?" : "Which is Unhealthy?",
                 correctAnswer: tFood,
                 options: [tFood, ...(isH ? junk.slice(0,3) : healthy.slice(0,3))].sort(() => Math.random() - 0.5)
             };
        default:
             return { question: "Science is fun!", correctAnswer: "Yes", options: ["Yes", "No"] };
    }
};