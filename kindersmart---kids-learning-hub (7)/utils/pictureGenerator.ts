import React from 'react';
import { QuizQuestion } from '../types';

// --- Data Sets ---

const ANIMALS = [
    { name: 'Dog', icon: '🐶' }, { name: 'Cat', icon: '🐱' }, { name: 'Mouse', icon: '🐭' },
    { name: 'Hamster', icon: '🐹' }, { name: 'Rabbit', icon: '🐰' }, { name: 'Fox', icon: '🦊' },
    { name: 'Bear', icon: '🐻' }, { name: 'Panda', icon: '🐼' }, { name: 'Koala', icon: '🐨' },
    { name: 'Tiger', icon: '🐯' }, { name: 'Lion', icon: '🦁' }, { name: 'Cow', icon: '🐮' },
    { name: 'Pig', icon: '🐷' }, { name: 'Frog', icon: '🐸' }, { name: 'Monkey', icon: '🐵' },
    { name: 'Chicken', icon: '🐔' }, { name: 'Penguin', icon: '🐧' }, { name: 'Bird', icon: '🐦' },
    { name: 'Duck', icon: '🦆' }, { name: 'Owl', icon: '🦉' }, { name: 'Horse', icon: '🐴' },
    { name: 'Unicorn', icon: '🦄' }, { name: 'Bee', icon: '🐝' }, { name: 'Butterfly', icon: '🦋' }
];

const FRUITS = [
    { name: 'Apple', icon: '🍎' }, { name: 'Banana', icon: '🍌' }, { name: 'Grapes', icon: '🍇' },
    { name: 'Watermelon', icon: '🍉' }, { name: 'Lemon', icon: '🍋' }, { name: 'Orange', icon: '🍊' },
    { name: 'Strawberry', icon: '🍓' }, { name: 'Cherry', icon: '🍒' }, { name: 'Peach', icon: '🍑' },
    { name: 'Pineapple', icon: '🍍' }, { name: 'Coconut', icon: '🥥' }, { name: 'Kiwi', icon: '🥝' },
    { name: 'Pear', icon: '🍐' }, { name: 'Mango', icon: '🥭' }
];

const VEGETABLES = [
    { name: 'Carrot', icon: '🥕' }, { name: 'Corn', icon: '🌽' }, { name: 'Potato', icon: '🥔' },
    { name: 'Broccoli', icon: '🥦' }, { name: 'Mushroom', icon: '🍄' }, { name: 'Onion', icon: '🧅' },
    { name: 'Garlic', icon: '🧄' }, { name: 'Cucumber', icon: '🥒' }, { name: 'Salad', icon: '🥗' },
    { name: 'Pepper', icon: '🌶️' }, { name: 'Eggplant', icon: '🍆' }, { name: 'Avocado', icon: '🥑' }
];

const VEHICLES = [
    { name: 'Car', icon: '🚗' }, { name: 'Taxi', icon: '🚕' }, { name: 'Bus', icon: '🚌' },
    { name: 'Police Car', icon: '🚓' }, { name: 'Ambulance', icon: '🚑' }, { name: 'Fire Truck', icon: '🚒' },
    { name: 'Bicycle', icon: '🚲' }, { name: 'Motorcycle', icon: '🏍️' }, { name: 'Train', icon: '🚂' },
    { name: 'Airplane', icon: '✈️' }, { name: 'Rocket', icon: '🚀' }, { name: 'Ship', icon: '🚢' },
    { name: 'Boat', icon: '🚤' }, { name: 'Tractor', icon: '🚜' }, { name: 'Truck', icon: '🚚' }
];

const JOBS = [
    { name: 'Police Officer', icon: '👮' }, { name: 'Doctor', icon: '👩‍⚕️' }, { name: 'Farmer', icon: '🧑‍🌾' },
    { name: 'Cook', icon: '🧑‍🍳' }, { name: 'Teacher', icon: '🧑‍🏫' }, { name: 'Singer', icon: '🎤' },
    { name: 'Artist', icon: '🎨' }, { name: 'Astronaut', icon: '🧑‍🚀' }, { name: 'Firefighter', icon: '🧑‍🚒' },
    { name: 'Detective', icon: '🕵️' }, { name: 'Construction Worker', icon: '👷' }, { name: 'Scientist', icon: '🧑‍🔬' }
];

const KITCHEN = [
    { name: 'Spoon', icon: '🥄' }, { name: 'Fork & Knife', icon: '🍴' }, { name: 'Bowl', icon: '🥣' },
    { name: 'Cup', icon: '🥤' }, { name: 'Pan', icon: '🍳' }, { name: 'Pot', icon: '🍲' },
    { name: 'Chopsticks', icon: '🥢' }, { name: 'Salt', icon: '🧂' }, { name: 'Plate', icon: '🍽️' }
];

const COLORS = [
    { name: 'Red', icon: '🔴' }, { name: 'Blue', icon: '🔵' }, { name: 'Green', icon: '🟢' },
    { name: 'Yellow', icon: '🟡' }, { name: 'Orange', icon: '🟠' }, { name: 'Purple', icon: '🟣' },
    { name: 'Black', icon: '⚫' }, { name: 'White', icon: '⚪' }, { name: 'Brown', icon: '🟤' }
];

const PLANETS = [
    { name: 'Earth', icon: '🌍' }, { name: 'Mars', icon: '🔴' }, { name: 'Saturn', icon: '🪐' },
    { name: 'Moon', icon: '🌙' }, { name: 'Sun', icon: '☀️' }, { name: 'Star', icon: '⭐' },
    { name: 'Comet', icon: '☄️' }
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// --- Generator Function ---

export const generatePictureQuestion = (topic: string): QuizQuestion => {
    // Helper for Identification Questions
    const createIdQuestion = (dataSet: {name: string, icon: string}[]) => {
        const target = dataSet[Math.floor(Math.random() * dataSet.length)];
        const options = new Set<string>();
        options.add(target.name);
        while (options.size < 4) {
            options.add(dataSet[Math.floor(Math.random() * dataSet.length)].name);
        }
        
        return {
            question: "What is this?",
            correctAnswer: target.name,
            options: Array.from(options).sort(() => Math.random() - 0.5),
            visual: React.createElement('div', { className: "text-9xl animate-bounce-in" }, target.icon)
        };
    };

    switch (topic) {
        case 'DAYS': {
            const type = Math.random();
            if (type < 0.33) {
                // Sequence After
                const idx = Math.floor(Math.random() * 6); // 0-5
                return {
                    question: `What comes after ${DAYS[idx]}?`,
                    correctAnswer: DAYS[idx + 1],
                    options: [DAYS[idx+1], DAYS[(idx+2)%7], DAYS[(idx+3)%7], DAYS[(idx+4)%7]].sort(() => Math.random() - 0.5),
                    visual: React.createElement('div', { className: "text-8xl mb-4" }, "📅")
                };
            } else if (type < 0.66) {
                 // Sequence Before
                 const idx = Math.floor(Math.random() * 6) + 1; // 1-6
                 return {
                    question: `What comes before ${DAYS[idx]}?`,
                    correctAnswer: DAYS[idx - 1],
                    options: [DAYS[idx-1], DAYS[(idx+1)%7], DAYS[(idx+2)%7], DAYS[(idx+3)%7]].sort(() => Math.random() - 0.5),
                    visual: React.createElement('div', { className: "text-8xl mb-4" }, "📅")
                };
            } else {
                 return {
                    question: "How many days are in a week?",
                    correctAnswer: "7",
                    options: ["5", "7", "10", "12"],
                    visual: React.createElement('div', { className: "text-8xl mb-4" }, "🗓️")
                };
            }
        }
        case 'MONTHS': {
            const idx = Math.floor(Math.random() * 11); 
            return {
                question: `What comes after ${MONTHS[idx]}?`,
                correctAnswer: MONTHS[idx + 1],
                options: [MONTHS[idx+1], MONTHS[(idx+2)%12], MONTHS[(idx+3)%12], MONTHS[(idx+4)%12]].sort(() => Math.random() - 0.5),
                visual: React.createElement('div', { className: "text-8xl mb-4" }, "📆")
            };
        }
        case 'PLANETS':
             // Simple knowledge or ID
             if (Math.random() > 0.5) {
                 return createIdQuestion(PLANETS);
             } else {
                 const facts = [
                     { q: "Which planet has rings?", a: "Saturn", o: ["Saturn", "Mars", "Earth", "Sun"], v: "🪐" },
                     { q: "Which is the Red Planet?", a: "Mars", o: ["Mars", "Earth", "Moon", "Sun"], v: "🔴" },
                     { q: "Where do we live?", a: "Earth", o: ["Earth", "Mars", "Sun", "Moon"], v: "🌍" },
                     { q: "What gives us light?", a: "Sun", o: ["Sun", "Moon", "Earth", "Mars"], v: "☀️" },
                 ];
                 const f = facts[Math.floor(Math.random() * facts.length)];
                 return {
                     question: f.q,
                     correctAnswer: f.a,
                     options: f.o.sort(() => Math.random() - 0.5),
                     visual: React.createElement('div', { className: "text-9xl animate-bounce-in" }, f.v)
                 };
             }
        case 'ANIMALS': return createIdQuestion(ANIMALS);
        case 'FRUITS': return createIdQuestion(FRUITS);
        case 'VEGETABLES': return createIdQuestion(VEGETABLES);
        case 'VEHICLES': return createIdQuestion(VEHICLES);
        case 'JOBS': return createIdQuestion(JOBS);
        case 'KITCHEN': return createIdQuestion(KITCHEN);
        case 'COLORS': return createIdQuestion(COLORS);
        default:
            return createIdQuestion(ANIMALS);
    }
};