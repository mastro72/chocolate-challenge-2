import React from 'react';

interface StatsPanelProps {
  playerName: string;
  moneyEarned: number;
  remainingChocolates: number;
  riskPercentage: number;
  gameOver: boolean;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ playerName, moneyEarned, remainingChocolates, riskPercentage, gameOver }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
       <div className="p-2 bg-slate-900/50 rounded-lg">
        <p className="text-sm text-slate-400 truncate">Player</p>
        <p className="text-2xl md:text-3xl font-bold text-indigo-400 truncate" title={playerName}>
          {playerName}
        </p>
      </div>
      <div className="p-2 bg-slate-900/50 rounded-lg">
        <p className="text-sm text-slate-400">Money Earned</p>
        <p className="text-2xl md:text-3xl font-bold text-green-400 tracking-tighter">
          ${moneyEarned.toLocaleString()}
        </p>
      </div>
      <div className="p-2 bg-slate-900/50 rounded-lg">
        <p className="text-sm text-slate-400">Chocolates Left</p>
        <p className="text-2xl md:text-3xl font-bold text-amber-400">
          {remainingChocolates.toLocaleString()}
        </p>
      </div>
      <div className="p-2 bg-slate-900/50 rounded-lg">
        <p className="text-sm text-slate-400">Risk of Poison</p>
        <p className={`text-2xl md:text-3xl font-bold ${gameOver ? 'text-slate-500' : 'text-red-400'}`}>
          {gameOver ? '---' : `${riskPercentage.toFixed(4)}%`}
        </p>
      </div>
    </div>
  );
};

export default StatsPanel;
