
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onPurchase: (project: Project) => void;
  disabled: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onPurchase, disabled }) => {
  return (
    <button
      onClick={() => onPurchase(project)}
      disabled={disabled}
      className={`group relative text-left w-full p-6 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 ${
        disabled 
          ? 'bg-slate-900/50 border-slate-800 opacity-50 cursor-not-allowed'
          : 'bg-slate-900 border-slate-700 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-4xl grayscale group-hover:grayscale-0 transition-all">{project.icon}</span>
        <span className="text-amber-500 font-mono font-bold text-sm bg-amber-500/10 px-2 py-1 rounded">
          -${project.cost >= 1_000_000_000 ? (project.cost / 1_000_000_000).toFixed(1) + 'B' : (project.cost / 1_000_000).toFixed(0) + 'M'}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">{project.name}</h3>
      <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
      <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 border-t border-slate-800 pt-3 group-hover:text-slate-400">
        World Impact: {project.comparison}
      </div>
      {!disabled && (
        <div className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-5 rounded-xl transition-opacity" />
      )}
    </button>
  );
};

export default ProjectCard;
