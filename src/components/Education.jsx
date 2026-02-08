import React from 'react';
import { motion } from 'framer-motion';

const Education = ({ education }) => {
  return (
    <div className="space-y-10">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3"
      >
        <span className="w-8 h-px bg-blue-500"></span>
        Academic<span className="text-blue-500">_History</span>
      </motion.h2>

      <div className="border-l border-slate-800 ml-4 space-y-12">
        {education.map((edu, index) => (
          <motion.div 
            key={edu.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }} // Sequential delay
            className="relative pl-8 group"
          >
            <div className="absolute w-3 h-3 bg-slate-900 border border-blue-500 rounded-full -left-[6.5px] top-1.5 group-hover:bg-blue-500 transition-colors duration-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <h3 className="text-white font-bold text-lg leading-none">{edu.degree}</h3>
              <p className="text-blue-500 font-mono text-xs mt-1 uppercase tracking-widest">{edu.institution} | {edu.duration}</p>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-md">
                {edu.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;