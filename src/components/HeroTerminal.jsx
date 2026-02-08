import React, { useState, useEffect } from "react";

const HeroTerminal = ({ bio }) => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (!bio) return;

    const fullText = [
      "> INITIALIZING_USER_SHELL...",
      "> LOADING_AUTH_KEYS... [SUCCESS]",
      "> ACCESSING_LOCAL_DATABASE...",
      `> PROFILE_DATA: "${bio}"`,
      "> SYSTEM_READY_"
    ];

    let currentLine = 0;
    setLines([]);

    const interval = setInterval(() => {
      if (currentLine < fullText.length) {
        setLines((prev) => [...prev, fullText[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [bio]);

  return (
    /* Changed h-48 to h-auto and min-h-[160px] to allow growth */
    <div className="bg-slate-950/80 backdrop-blur-xl border border-blue-500/30 p-4 rounded-lg shadow-2xl font-mono text-sm h-auto min-h-[160px] relative group hover:border-blue-500/60 transition-colors">
      <div className="flex gap-1.5 mb-3 border-b border-slate-800 pb-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        <span className="text-[10px] text-slate-500 ml-2 uppercase tracking-widest">zsh — 80x24</span>
      </div>
      
      <div className="space-y-2">
        {lines.map((line, i) => (
          <p 
            key={i} 
            /* Added break-words to handle long sentences correctly */
            className={`${line && line.includes('SUCCESS') ? "text-emerald-500" : "text-slate-300"} break-words leading-relaxed`}
          >
            {line}
          </p>
        ))}
        <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-1 align-middle" />
      </div>
    </div>
  );
};

export default HeroTerminal;