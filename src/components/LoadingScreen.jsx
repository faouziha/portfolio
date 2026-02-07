import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ progress }) => {
  const [bootLogs, setBootLogs] = useState([]);
  const logs = [
    "> INITIALIZING KERNEL...",
    "> ESTABLISHING SUPABASE_CONNECTION...",
    "> LOADING NEURAL_MODULES...",
    "> MOUNTING TECHNICAL_ARSENAL...",
    "> BYPASSING_LATENCY...",
    "> SYSTEM_READY."
  ];

  useEffect(() => {
    // Cycle through logs based on progress percentage
    const logIndex = Math.floor((progress / 100) * logs.length);
    setBootLogs(logs.slice(0, logIndex + 1));
  }, [progress]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        
        {/* Hacking Terminal Look */}
        <div className="font-mono text-xs md:text-sm space-y-2 mb-8 h-32 overflow-hidden">
          {bootLogs.map((log, i) => (
            <p key={i} className="text-emerald-500 opacity-80 animate-pulse">
              {log}
            </p>
          ))}
        </div>

        {/* Progress Display */}
        <div className="space-y-4">
          <div className="flex justify-between items-end font-mono">
            <span className="text-blue-400 text-xs tracking-widest uppercase">Booting_Sequence</span>
            <span className="text-white text-xl font-bold">{Math.round(progress)}%</span>
          </div>

          {/* Main Progress Bar */}
          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-400 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-10 text-center">
          <p className="text-slate-600 font-mono text-[10px] uppercase tracking-[0.3em]">
            Authorized Access Only // Faouzi_Haourigui
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;