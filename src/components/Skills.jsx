import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Remove Pagination from imports, keep Autoplay
import { Autoplay, FreeMode } from 'swiper/modules'; 

import 'swiper/css';
// No need to import pagination css anymore

const Skills = ({ skills }) => {
  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-4xl font-bold text-white uppercase tracking-tighter">Technical Arsenal</h2>
        <div className="h-px bg-slate-800 flex-grow mt-2"></div>
      </div>

      {categories.map(cat => (
        <div key={cat} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl font-mono text-blue-400 opacity-80">{`> ${cat}`}</h3>
          </div>

          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true} // ENABLE INFINITE LOOP
            freeMode={true} // MAKES IT SLIDE SMOOTHLY
            speed={2000} // TRANSITION SPEED IN MS
            autoplay={{
              delay: 0, // 0 DELAY FOR CONTINUOUS MOTION
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              reverseDirection: cat === 'Cybersecurity' // OPTIONAL: BACKWARDS MOTION FOR SEC
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="skills-swiper"
          >
            {skills
              .filter(s => s.category === cat)
              .map(skill => (
                <SwiperSlide key={skill.id}>
                  <div className="bg-slate-900/60 backdrop-blur-sm p-6 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      {skill.icon_url && (
                        <img 
                          src={skill.icon_url} 
                          alt="" 
                          className="w-6 h-6 object-contain brightness-90 group-hover:brightness-110" 
                        />
                      )}
                      <span className="text-slate-200 font-medium">{skill.name}</span>
                    </div>
                    
                    <div className="w-full bg-slate-950 rounded-full h-1 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          cat === 'Cybersecurity' ? 'bg-emerald-500' : 'bg-blue-600'
                        }`} 
                        style={{ width: `${skill.proficiency_level}%` }}
                      ></div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      ))}
    </section>
  );
};

export default Skills;