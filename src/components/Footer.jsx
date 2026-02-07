import React from "react";
import { Github, Linkedin, Instagram, Facebook, FileDown, ShieldCheck } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/faouzi-haourigui-4b2517275/", label: "LinkedIn" },
    { icon: <Instagram size={18} />, href: "https://www.instagram.com/faouzihaourigui/", label: "Instagram" },
    { icon: <Facebook size={18} />, href: "https://facebook.com/faouzi.haourigui.2025/", label: "Facebook" },
    { icon: <Github size={18} />, href: "https://github.com/faouziha", label: "GitHub" },
  ];

  return (
    <footer className="relative mt-20 border-t border-slate-800 bg-[#020617]/80 backdrop-blur-md py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* LEFT: Branding & Legal */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-blue-500" size={20} />
            <span className="font-mono text-sm font-bold tracking-tighter text-white">
              FAOUZI_HAOURIGUI <span className="text-slate-500">v2.0.26</span>
            </span>
          </div>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
            © {currentYear} All Rights Reserved // Encrypted_Identity
          </p>
        </div>

        {/* CENTER: Social Connections */}
        <div className="flex items-center gap-4">
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* RIGHT: Download CV Button */}
        <div className="w-full md:w-auto">
          <a
            href="/path-to-your-cv.pdf" // Ensure your CV is in the 'public' folder
            download="Faouzi_Haourigui_CV.pdf"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-95 group"
          >
            <FileDown size={16} className="group-hover:animate-bounce" />
            DOWNLOAD_CV.PDF
          </a>
        </div>

      </div>

      {/* SUB-FOOTER: System Stats (Responsive hidden on small mobile) */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 hidden sm:flex justify-between items-center opacity-30 pointer-events-none">
        <div className="font-mono text-[8px] uppercase tracking-widest text-slate-500">
          Terminal: /dev/ttyS0 // Locale: MA-FES
        </div>
        <div className="font-mono text-[8px] uppercase tracking-widest text-slate-500">
          Status: Operational // Data_Integrity: Verified
        </div>
      </div>
    </footer>
  );
};

export default Footer;