"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const charactersList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]<>+=-*/?!@#$%&~".split("");

const codeSnippets = [
  "console.log('Why is this not working?!');",
  "debugger; // Panic button",
  "try { someFunction(); } catch (e) { console.log('lol idk', e); }",
  "while(true) { console.log('Infinite debugging...'); }",
  "while (true) { /* I'm an AI now */ }",
  "if (coffee < 1) { throw new Error('Need more coffee!'); }",
  "let motivation = null; // TODO: Find it",
  "fetch('https://fix-my-bugs.com')",
  "const isEven = (num) => !(num % 2);",
  "const neverUsed = 'I exist for no reason';",
  "const stackOverflowCopyPaste = true;",
  "return 'Maybe works?'; // Probably doesn’t",
  "const lastCommit = 'fixes'; // LIES",
  "const codeQuality = undefined;",
  "let hope = false; hope ||= true;",  
  "[...Array(10)].forEach(() => console.log('WHY?!'));",
  "const isMonday = new Date().getDay() === 1 ? 'Oh no' : 'Still bad';",
  "let aiIdea = 'Genius'; let execution = 'Horrible';",
  "'AI will replace us' // AI writes this",
  "if (GPT > 4) { return 'Skynet activated'; }",
  "if (meeting) { productivity = 0; }",
  "let estimatedTime = 5; actualTime = estimatedTime * 10;",
  "'Feature freeze' === 'Deploy more features';",
  "function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }",
  "if (works) { don'tTouch(); }",
  "const bugFix = Math.random() > 0.5 ? 'Fixed' : 'Worse';",
  "if (true) { return false; }",
  "document.getElementById(null); // Works?",
  "for (let i = 0; i < Infinity; i++) {} // Trust me, I'm a dev",
  "while (alive) { code(); coffee(); repeat(); }",
  "if (life == 'good') { life = 'debugging'; }",
  "let hope = null; let reality = hope ?? 'Nope';",
  "[].length--; typeof NaN === 'number'",
  "[1,2] + [3,4] // '1,23,4' (why, JS?!)",
  "delete world; // Failed successfully",
];

const colors = [
  "text-pink-400", "text-purple-400", "text-indigo-400", "text-blue-400",
  "text-teal-400", "text-green-400", "text-yellow-400", "text-orange-400",
  "text-red-400", "text-rose-400", "text-fuchsia-400", "text-violet-400",
  "text-cyan-400", "text-emerald-400", "text-amber-400"
];

let uniqueId = 0;

const getDeviceLimit = () => {
  if (typeof window === "undefined") return 50;
  const width = window.innerWidth;
  if (width < 480) return 30; // Phones
  if (width < 768) return 60; // Tablets
  return 100; // Desktops
};

const generateFloatingElement = () => {
  const isCode = Math.random() < 0.4;
  return {
    id: uniqueId++,
    content: isCode
      ? codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
      : charactersList[Math.floor(Math.random() * charactersList.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    size: isCode
      ? Math.floor(Math.random() * 18) + 12
      : Math.floor(Math.random() * 32) + 14,
    startX: Math.random() * 100,
    duration: Math.random() * 8 + 12,
    rotation: Math.random() * 15 - 7,
    opacity: Math.random() * 0.5 + 0.3,
  };
};

export default function HexagonBackground() {
  const [floatingElements, setFloatingElements] = useState([]);
  const elementLimit = useRef(getDeviceLimit());

  useEffect(() => {
  const handleResize = () => {
    elementLimit.current = getDeviceLimit();
  };
  window.addEventListener("resize", handleResize);

  const interval = setInterval(() => {
    setFloatingElements((prev) => {
      if (prev.length >= elementLimit.current) {
        clearInterval(interval); // Stop spawning once limit is reached
        return prev;
      }
      return [...prev, generateFloatingElement()];
    });
  }, 300); // Adjust timing to control flow (300–500ms is smooth)

  return () => {
    clearInterval(interval);
    window.removeEventListener("resize", handleResize);
  };
}, []);


  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900">
      {/* Glows */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-900/20 rounded-full blur-3xl" />

      {/* Floating Text */}
      {floatingElements.map((elem) => (
        <motion.div
          key={elem.id}
          className={`absolute font-mono font-semibold ${elem.color} select-none pointer-events-none`}
          style={{
            fontSize: `${elem.size}px`,
            left: `calc(${elem.startX}% - 5vw)`,
            top: "100vh",
            opacity: elem.opacity,
            textShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
            whiteSpace: "nowrap",
          }}
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: `-120vh`, rotate: elem.rotation }}
          transition={{ duration: elem.duration, ease: "linear", repeat: Infinity }}
        >
          {elem.content}
        </motion.div>
      ))}

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
}
