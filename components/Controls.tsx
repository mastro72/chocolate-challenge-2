
import React from 'react';

interface ControlsProps {
  onReveal: () => void;
  onRestart: () => void;
  isGameOver: boolean;
  isRevealed: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onReveal, onRestart, isGameOver, isRevealed }) => {
  return (
    <div className="flex justify-center items-center gap-4 p-4 bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg">
      <button
        onClick={onReveal}
        disabled={isGameOver || isRevealed}
        className="px-6 py-3 bg-amber-600 text-white font-bold rounded-lg shadow-md hover:bg-amber-500 transition-colors disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
      >
        Stop & Collect
      </button>
      <button
        onClick={onRestart}
        className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-500 transition-colors"
      >
        Restart Game
      </button>
    </div>
  );
};

export default Controls;
