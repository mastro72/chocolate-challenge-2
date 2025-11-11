import React from 'react';

interface GameOverOverlayProps {
  won: boolean;
  money: number;
  onRestart: () => void;
}

const GameOverOverlay: React.FC<GameOverOverlayProps> = ({ won, money, onRestart }) => {
  
  const getTitle = () => {
    if (won) return 'You Survived!';
    return 'You Ate The Poison!';
  }

  const getDescription = () => {
    if (won) return "You wisely decided to stop and collected your winnings.";
    return "Your luck ran out. The game is over.";
  }

  const getTitleColor = () => {
    if (won) return 'text-green-400';
    return 'text-red-500';
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-slate-700">
        <h2 className={`text-4xl font-extrabold mb-4 ${getTitleColor()}`}>
          {getTitle()}
        </h2>
        <p className="text-slate-300 text-lg mb-6">
          {getDescription()}
        </p>
        <div className="bg-slate-900/50 p-4 rounded-lg mb-8">
            <p className="text-slate-400 text-sm">FINAL EARNINGS</p>
            <p className="text-3xl font-bold text-green-400">${money.toLocaleString()}</p>
        </div>
        <button
          onClick={onRestart}
          className="w-full px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-500 transition-transform transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverOverlay;