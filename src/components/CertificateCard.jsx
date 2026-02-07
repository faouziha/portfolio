import React from 'react';

const CertificateCard = ({ cert }) => {
  return (
    <div className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl p-5 transition-all duration-500 hover:border-blue-500/50 hover:-translate-y-2 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Certificate Image/Icon */}
        <div className="relative w-20 h-20 mb-4 p-1 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden">
          <img 
            src={cert.image_url || "/api/placeholder/80/80"} 
            alt={cert.name}
            className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          {/* Subtle "Scanning" line overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent h-1/2 w-full animate-scanline pointer-events-none"></div>
        </div>

        <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-1 group-hover:text-blue-400 transition-colors">
          {cert.name}
        </h3>
        
        <p className="text-xs font-mono text-emerald-500/70 mb-3 tracking-widest uppercase">
          {cert.issuer}
        </p>

        <div className="flex items-center justify-between w-full mt-auto pt-4 border-t border-slate-800">
          <span className="text-[10px] font-mono text-slate-500 uppercase">
            Issued: {new Date(cert.issue_date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
          </span>
          <a 
            href={cert.cert_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] font-mono text-blue-400 hover:text-white underline tracking-tighter"
          >
            VIEW_CREDENTIAL
          </a>
        </div>
      </div>
      
      {/* Corner Brackets */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-slate-700 group-hover:border-blue-500"></div>
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-slate-700 group-hover:border-blue-500"></div>
    </div>
  );
};

export default CertificateCard;