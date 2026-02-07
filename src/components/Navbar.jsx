import React, { useState, useEffect } from "react";
import DecryptText from "./DecryptText";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Certificates", href: "#certificates" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          /* KEY FIX: If isOpen is true, we make the nav background transparent 
             so it doesn't block the overlay's black glossy look */
          isOpen 
            ? "py-4 bg-transparent" 
            : scrolled
              ? "py-4 bg-[#020617]/90 backdrop-blur-xl border-b border-white/5"
              : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center gap-2 group cursor-pointer z-[110]">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white group-hover:bg-emerald-500 transition-colors">
              F
            </div>
            <span className="font-mono text-sm tracking-tighter text-slate-400 group-hover:text-white transition-colors">
              Faouzi Haourigui
            </span>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 hover:text-blue-400 transition-colors relative group"
              >
                <DecryptText text={link.name} speed={40} trigger={false} />
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-[110] p-2 text-slate-400 hover:text-white transition-colors"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
              ></span>
            </div>
          </button>

          {/* MOBILE MENU OVERLAY - Now truly full screen */}
          <div
            className={`fixed inset-0 transition-all duration-700 ease-in-out flex flex-col items-center justify-center md:hidden z-[105] ${
              isOpen
                ? "translate-x-0 opacity-100 bg-black/40 backdrop-blur-3xl shadow-[inset_0_0_150px_rgba(0,0,0,1)]"
                : "translate-x-full opacity-0 pointer-events-none"
            }`}
          >
            {/* Background Matrix/Data Stream effect inside menu */}
            <div className="absolute inset-0 opacity-10 pointer-events-none terminal-data-stream"></div>

            {/* Link Container: mt-100 left untouched as requested */}
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-mono uppercase tracking-[0.3em] text-slate-200 hover:text-emerald-500 transition-all drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  style={{
                    transitionDelay: isOpen ? `${i * 100}ms` : "0ms",
                  }}
                >
                  <DecryptText text={link.name} speed={60} trigger={isOpen} />
                </a>
              ))}
            </div>
          </div>

          {/* DESKTOP STATUS */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest">
              Connected
            </span>
          </div>
        </div>
      </nav>

      {/* Spacer for all screen sizes to separate nav from hero */}
      <div className="h-6" aria-hidden="true" />
    </>
  );
};

export default Navbar;