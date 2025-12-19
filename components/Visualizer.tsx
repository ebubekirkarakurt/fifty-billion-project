
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { Project } from '../types';

interface VisualizerProps {
  lastProject: Project | null;
}

const Visualizer: React.FC<VisualizerProps> = ({ lastProject }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [resolution, setResolution] = useState<'1K' | '2K' | '4K'>('1K');

  const handleGenerate = async () => {
    if (!lastProject) return;
    setIsGenerating(true);
    try {
      const url = await GeminiService.generateProjectVision(lastProject.name, resolution);
      setImageUrl(url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEdit = async () => {
    if (!imageUrl || !editPrompt) return;
    setIsGenerating(true);
    try {
      const newUrl = await GeminiService.editVision(imageUrl, editPrompt);
      if (newUrl) setImageUrl(newUrl);
      setEditPrompt('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!lastProject && !imageUrl) {
    return (
      <div className="h-64 flex flex-col items-center justify-center bg-slate-900 border border-slate-800 border-dashed rounded-xl text-slate-500">
        <span className="text-3xl mb-2">🖼️</span>
        <p className="text-sm">Select a project to generate a vision.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
      <div className="p-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-widest">Project Visualizer</span>
        <div className="flex gap-2">
           <select 
            value={resolution} 
            onChange={(e) => setResolution(e.target.value as any)}
            className="bg-slate-900 text-[10px] border border-slate-700 rounded px-1"
           >
             <option value="1K">1K</option>
             <option value="2K">2K</option>
             <option value="4K">4K</option>
           </select>
           <button 
            onClick={handleGenerate} 
            disabled={isGenerating || !lastProject}
            className="bg-amber-600 hover:bg-amber-500 text-white text-[10px] px-2 py-1 rounded font-bold transition-colors disabled:opacity-50"
          >
            {imageUrl ? 'REGENERATE' : 'GENERATE VISION'}
          </button>
        </div>
      </div>

      <div className="relative aspect-video bg-black flex items-center justify-center group">
        {isGenerating && (
          <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
             <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-xs font-mono text-amber-500 animate-pulse">DREAMING NEW REALITIES...</p>
          </div>
        )}
        {imageUrl ? (
          <img src={imageUrl} alt="Project vision" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center p-8">
            <p className="text-slate-400 text-sm mb-4">Click generate to see a visualization of {lastProject?.name}</p>
          </div>
        )}
      </div>

      {imageUrl && (
        <div className="p-4 bg-slate-800/50 space-y-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Edit Vision (Nano Banana 2.5)</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              placeholder="e.g. Add more futuristic drones..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
            />
            <button 
              onClick={handleEdit}
              disabled={isGenerating || !editPrompt}
              className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-4 rounded font-bold transition-colors disabled:opacity-50"
            >
              EDIT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visualizer;
