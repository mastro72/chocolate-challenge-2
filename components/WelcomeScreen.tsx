import React, { useState } from 'react';
import type { ScoreEntry } from '../types';
import Leaderboard from './Leaderboard';

interface WelcomeScreenProps {
  onStartGame: (name: string) => void;
  leaderboard: ScoreEntry[];
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame, leaderboard }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStartGame(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-amber-400 tracking-wider">Chocolate Challenge</h1>
            <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
              There are 1000 chocolates. One is poisoned. Eat chocolates to earn money. How much risk will you take?
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Start a New Game</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="playerName" className="block text-slate-300 text-lg mb-2 font-medium">
                    Enter Your Name
                  </label>
                  <input
                    id="playerName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Willy Wonka"
                    className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-600 rounded-lg text-white text-center text-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    required
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="w-full px-8 py-4 bg-amber-600 text-white font-bold rounded-lg shadow-md hover:bg-amber-500 transition-all transform hover:scale-105 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed disabled:scale-100"
                >
                  Start The Challenge
                </button>
              </form>
            </div>
            <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
                <Leaderboard scores={leaderboard} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
