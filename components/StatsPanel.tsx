
import React from 'react';
import { INITIAL_BALANCE } from '../constants';

interface StatsPanelProps {
  balance: number;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ balance }) => {
  const spent = INITIAL_BALANCE - balance;
  const percentageSpent = (spent / INITIAL_BALANCE) * 100;

  return (
    <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl shadow-2xl sticky top-4">
      <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Treasury Balance</h2>
      <div className="text-4xl font-black text-amber-500 font-mono mb-4">
        ${balance.toLocaleString()}
      </div>
      
      <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden mb-6">
        <div 
          className="absolute h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-1000 ease-out"
          style={{ width: `${percentageSpent}%` }}
        />
      </div>

      <div className="space-y-4">
        <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-400 uppercase font-bold mb-1">Scale Comparison</p>
          <p className="text-sm italic">
            {balance > 40_000_000_000 && "You are currently wealthier than 100 sovereign nations combined."}
            {balance <= 40_000_000_000 && balance > 20_000_000_000 && "Your wealth is roughly equivalent to the GDP of Estonia."}
            {balance <= 20_000_000_000 && balance > 5_000_000_000 && "You are now spending at the scale of a small country's annual budget."}
            {balance <= 5_000_000_000 && "You are approaching the limits of individual economic power. Spend wisely."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
