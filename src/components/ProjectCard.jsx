import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition duration-300">
      <img 
        src={project.image_url} 
        alt={project.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech_stack.map((tech) => (
            <span 
              key={tech} 
              className="text-[10px] uppercase tracking-wider bg-blue-900/30 text-blue-400 px-2 py-1 rounded border border-blue-800"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a 
            href={project.github_link} 
            target="_blank" 
            rel="noreferrer"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            GitHub →
          </a>
          {project.live_link !== '#' && (
            <a 
              href={project.live_link} 
              target="_blank" 
              rel="noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300 transition"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;