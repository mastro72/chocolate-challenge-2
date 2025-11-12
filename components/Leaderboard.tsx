import React from 'react';
import type { ScoreEntry } from '../types';

interface LeaderboardProps {
  scores: ScoreEntry[];
  currentScoreId?: string | null;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ scores, currentScoreId }) => {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-amber-400 mb-4 text-center">Leaderboard</h3>
      {scores.length > 0 ? (
        <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {scores.map((score, index) => (
            <li
              key={score.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                score.id === currentScoreId
                  ? 'bg-amber-500/30 ring-2 ring-amber-400 scale-105'
                  : 'bg-slate-900/50'
              }`}
            >
              <div className="flex items-center">
                <span className="text-lg font-bold text-slate-400 w-8">{index + 1}.</span>
                <span className="font-medium text-white truncate" title={score.playerName}>{score.playerName}</span>
              </div>
              <span className="font-bold text-green-400 text-lg tracking-tight">
                ${score.score.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-slate-400 py-4">No scores yet. Be the first!</p>
      )}
    </div>
  );
};

export default Leaderboard;
