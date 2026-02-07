import React, { useState, useEffect } from "react";
import DecryptText from "./DecryptText";

const Hero = ({ description, avatar }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateClock() {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let session = "AM";

      if (hours === 0) hours = 12;
      if (hours > 12) {
        hours -= 12;
        session = "PM";
      }

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      const currentTime = `${hours}:${minutes}:${seconds} ${session}`;
      setTime(currentTime);
    }

    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* LEFT COLUMN: Text Content */}
        <div className="flex-1 text-center lg:text-left space-y-6 order-2 lg:order-1">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-2 pr-4 border-r border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">
                Live_System
              </span>
            </div>
            <div className="text-sm font-mono text-blue-400 tracking-wider text-[11px] md:text-sm">
              Based in Morocco : {time || "00:00:00 AM"}
            </div>
          </div>

          {/* Inside Hero.jsx */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            <DecryptText text="Hi, I'm" speed={50} />{" "}
            <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              <DecryptText text="Faouzi Haourigui" speed={30} />
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl text-slate-400 font-mono">
            Full-Stack Developer <span className="text-slate-600">&</span>{" "}
            Pentester
          </h2>

          <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-2xl group hover:border-blue-500/30 transition-all duration-500">
            <p className="text-lg text-slate-300 leading-relaxed font-light italic">
              {description || "Initializing bio from database..."}
            </p>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95">
              LOAD_PROJECTS
            </button>
            <button className="px-8 py-3 bg-slate-800/50 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all active:scale-95">
              CONTACT_ME
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Profile Image */}
        <div className="relative order-1 lg:order-2 group">
          {/* Animated Decorative Rings */}
          <div className="absolute -inset-4 border border-dashed border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute -inset-8 border border-dotted border-emerald-500/10 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>

          {/* The Image Container */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl border-2 border-slate-700 overflow-hidden bg-slate-900 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <img
              src={avatar || "https://via.placeholder.com/300"}
              alt="Profile"
              className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-700"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>

            {/* Image Scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent h-1/2 w-full animate-scanline pointer-events-none"></div>
          </div>

          {/* Corner Brackets */}
          <div className="absolute -top-4 -left-4 w-10 h-10 border-t-2 border-l-2 border-blue-500 rounded-tl-xl"></div>
          <div className="absolute -bottom-4 -right-4 w-10 h-10 border-b-2 border-r-2 border-emerald-500 rounded-br-xl"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-slate-600 opacity-50">
        <span className="text-[10px] font-mono uppercase tracking-widest">
          Scroll_Down
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
