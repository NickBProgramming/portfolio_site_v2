"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const charactersList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]<>+=-*/?!@#$%&~".split("");

const codeSnippets = [
  // Debugging nightmares
  "console.log('Why is this not working?!');",
  "debugger; // Panic button",
  "try { someFunction(); } catch (e) { console.log('lol idk', e); }",
  "while(true) { console.log('Infinite debugging...'); }",

  // Classic memes
  "while (true) { /* I'm an AI now */ }",
  "if (coffee < 1) { throw new Error('Need more coffee!'); }",
  "let motivation = null; // TODO: Find it",
  "fetch('https://fix-my-bugs.com')",

  // Over-engineering at its best
  "const isEven = (num) => !(num % 2);",
  "const neverUsed = 'I exist for no reason';",
  "const stackOverflowCopyPaste = true;",
  "return 'Maybe works?'; // Probably doesn’t",

  // Dev Chaos
  "const lastCommit = 'fixes'; // LIES",
  "const codeQuality = undefined;",
  "let hope = false; hope ||= true;",  
  "[...Array(10)].forEach(() => console.log('WHY?!'));",
  "const isMonday = new Date().getDay() === 1 ? 'Oh no' : 'Still bad';",

  // AI Jokes
  "let aiIdea = 'Genius'; let execution = 'Horrible';",
  "'AI will replace us' // AI writes this",
  "if (GPT > 4) { return 'Skynet activated'; }",
  
  // Corporate Life
  "if (meeting) { productivity = 0; }",
  "let estimatedTime = 5; actualTime = estimatedTime * 10;",
  "'Feature freeze' === 'Deploy more features';",

  // Infinite wisdom
  "function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }",
  "if (works) { don'tTouch(); }",
  "const bugFix = Math.random() > 0.5 ? 'Fixed' : 'Worse';",

  // Absurd Logic
  "if (true) { return false; }",
  "document.getElementById(null); // Works?",
  "for (let i = 0; i < Infinity; i++) {} // Trust me, I'm a dev",
  
  // Emotional Damage
  "while (alive) { code(); coffee(); repeat(); }",
  "if (life == 'good') { life = 'debugging'; }",
  "let hope = null; let reality = hope ?? 'Nope';",
  
  // Weird Stuff
  "[].length--;", 
  "typeof NaN === 'number' // What?!",
  "[1,2] + [3,4] // '1,23,4' (why, JS?!)",
  "delete world; // Failed successfully",
];

const colors = [
  "text-pink-400", "text-purple-400", "text-indigo-400", "text-blue-400",
  "text-teal-400", "text-green-400", "text-yellow-400", "text-orange-400",
  "text-red-400", "text-rose-400", "text-fuchsia-400", "text-violet-400",
  "text-cyan-400", "text-emerald-400", "text-amber-400"
];

let uniqueId = 0; // Ensures unique keys

const generateFloatingElement = () => {
  const isCode = Math.random() < 0.5; // 50% chance to be a code snippet
  return {
    id: uniqueId++,
    content: isCode 
      ? codeSnippets[Math.floor(Math.random() * codeSnippets.length)] 
      : charactersList[Math.floor(Math.random() * charactersList.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    size: isCode ? Math.floor(Math.random() * 22) + 12 : Math.floor(Math.random() * 40) + 20,
    startX: Math.random() * 100,
    startY: 100, // Start from the bottom
    duration: Math.random() * 12 + 15,
    rotation: Math.random() * 20 - 10, // Small rotation for readability
    opacity: Math.random() * 0.6 + 0.2,
  };
};

export default function HexagonBackground() {
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingElements((prev) => {
        const newElement = generateFloatingElement();
        return [...prev.slice(-99), newElement]; // Keep last 100 floating elements
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900">
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-900/20 rounded-full blur-3xl" />

      {floatingElements.map((elem) => (
        <motion.div
          key={elem.id}
          className={`absolute font-mono font-bold ${elem.color} select-none pointer-events-none`}
          style={{
            fontSize: `${elem.size}px`,
            left: `${elem.startX}%`,
            top: `100vh`,
            opacity: elem.opacity,
            textShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
            whiteSpace: "nowrap", // Prevents snippets from breaking lines
          }}
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: `-120vh`, rotate: elem.rotation }}
          transition={{ duration: elem.duration, ease: "linear", repeat: Infinity }}
        >
          {elem.content}
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
}
