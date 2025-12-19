
import React, { useState, useEffect } from 'react';
import { GameLevel, GameState, Project, ProjectHistory } from './types';
import { PROJECTS, INITIAL_BALANCE } from './constants';
import StatsPanel from './components/StatsPanel';
import ProjectCard from './components/ProjectCard';
import GeminiAssistant from './components/GeminiAssistant';
import Visualizer from './components/Visualizer';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    balance: INITIAL_BALANCE,
    currentLevel: GameLevel.HUMAN,
    history: [],
    isThinking: false
  });

  const [lastPurchased, setLastPurchased] = useState<Project | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const currentLevelProjects = PROJECTS.filter(p => p.level === gameState.currentLevel);

  const handlePurchase = (project: Project) => {
    if (gameState.balance < project.cost) {
      alert("Insufficient treasury funds for this undertaking.");
      return;
    }

    const newHistory: ProjectHistory = {
      projectId: project.id,
      name: project.name,
      cost: project.cost,
      timestamp: Date.now(),
      level: project.level
    };

    setGameState(prev => ({
      ...prev,
      balance: prev.balance - project.cost,
      history: [...prev.history, newHistory]
    }));
    
    setLastPurchased(project);

    // Level up logic
    const projectsInCurrentLevel = gameState.history.filter(h => h.level === gameState.currentLevel).length + 1;
    if (projectsInCurrentLevel >= 2 && gameState.currentLevel < GameLevel.FUTURE) {
      setTimeout(() => setShowLevelUp(true), 1000);
    } else if (gameState.currentLevel === GameLevel.FUTURE && projectsInCurrentLevel >= 2) {
       setTimeout(() => setGameState(prev => ({ ...prev, currentLevel: GameLevel.FINAL })), 1000);
    }
  };

  const nextLevel = () => {
    setGameState(prev => ({
      ...prev,
      currentLevel: prev.currentLevel + 1
    }));
    setShowLevelUp(false);
  };

  if (gameState.currentLevel === GameLevel.FINAL) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
        <div className="max-w-3xl w-full text-center space-y-8">
          <h1 className="text-6xl font-black gradient-text">WORLD SHAPED.</h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            You started with $50,000,000,000. You didn't just spend it on luxuries. 
            You funded entire civilizations, bridged planets, and secured the future of intelligence.
          </p>
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-left">
            <h3 className="text-amber-500 font-bold mb-4 uppercase tracking-widest text-sm">Your Legacy</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-4">
              {gameState.history.map((h, i) => (
                <div key={i} className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-200">{h.name}</span>
                  <span className="text-slate-500 font-mono text-sm">-${h.cost.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-amber-500/20 flex justify-between items-center">
              <span className="text-amber-400 font-bold">REMAINING TREASURY</span>
              <span className="text-2xl font-black text-amber-500">${gameState.balance.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-slate-500 italic">
            "$50 Billion is not 'rich person money.' It is civilizational energy. It is the power to rewrite reality."
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-black tracking-widest transition-all hover:scale-105"
          >
            RESTART SIMULATION
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      {/* Level Up Overlay */}
      {showLevelUp && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6 text-center">
          <div className="max-w-lg space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="text-amber-500 text-6xl">🔓</div>
            <h2 className="text-4xl font-black">NEW HORIZON UNLOCKED</h2>
            <p className="text-slate-400 text-lg">
              You have mastered Level {gameState.currentLevel}. Your influence has grown beyond the current scale. 
              The world is ready for your next phase of development.
            </p>
            <button 
              onClick={nextLevel}
              className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold tracking-widest transition-all"
            >
              ADVANCE TO LEVEL {gameState.currentLevel + 1}
            </button>
          </div>
        </div>
      )}

      <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-amber-500 font-black text-sm tracking-[0.3em] uppercase mb-1">Civilization Builder</h2>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            WHAT CAN YOU BUILD WITH <br/>
            <span className="gradient-text">$50,000,000,000?</span>
          </h1>
        </div>
        <div className="text-right">
          <div className="inline-block px-3 py-1 bg-slate-800 rounded border border-slate-700 text-slate-400 text-xs font-bold uppercase mb-2">
            Level {gameState.currentLevel}: {
              gameState.currentLevel === GameLevel.HUMAN ? 'Human Scale' :
              gameState.currentLevel === GameLevel.CITY ? 'City Scale' :
              gameState.currentLevel === GameLevel.COUNTRY ? 'Country Scale' : 'Future Scale'
            }
          </div>
          <div className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">
            Simulation Active • No Backup Found
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Projects */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentLevelProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onPurchase={handlePurchase}
                disabled={gameState.balance < project.cost}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GeminiAssistant />
            <Visualizer lastProject={lastPurchased} />
          </div>
        </div>

        {/* Right Column: Stats & Meta */}
        <div className="lg:col-span-4 space-y-6">
          <StatsPanel balance={gameState.balance} />
          
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
             <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Investment History</h3>
             <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {gameState.history.length === 0 && <p className="text-slate-600 text-sm italic">No investments made yet.</p>}
                {gameState.history.slice().reverse().map((h, i) => (
                  <div key={i} className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                    <span className="text-slate-300 font-bold">{h.name}</span>
                    <span className="text-amber-600">-${(h.cost / 1_000_000).toFixed(0)}M</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/30 p-6 rounded-xl">
            <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              System Intel (Gemini 3 Pro)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Our models predict that {gameState.history.length > 0 ? gameState.history[gameState.history.length - 1].name : 'your first choice'} 
              will result in a 14.2% increase in regional stability over the next decade.
            </p>
            <div className="flex gap-2">
               <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 w-[78%]"></div>
               </div>
               <span className="text-[10px] text-slate-500 font-mono">STABILITY INDEX</span>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="max-w-7xl mx-auto mt-16 pb-8 border-t border-slate-900 pt-8 text-center text-slate-600 text-[10px] uppercase tracking-widest font-bold">
        Designed for Architects of the Future • Powered by Gemini Reasoning Engine
      </footer>
    </div>
  );
};

export default App;
