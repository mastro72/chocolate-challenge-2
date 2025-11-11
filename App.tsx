import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Chocolate as ChocolateType } from './types';
import Chocolate from './components/Chocolate';
import StatsPanel from './components/StatsPanel';
import Controls from './components/Controls';
import GameOverOverlay from './components/GameOverOverlay';

const TOTAL_CHOCOLATES = 1000;
const MONEY_PER_CHOCOLATE = 100000;

const App: React.FC = () => {
  const [chocolates, setChocolates] = useState<ChocolateType[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

  const initializeGame = useCallback(() => {
    const poisonedId = Math.floor(Math.random() * TOTAL_CHOCOLATES);
    const initialChocolates = Array.from({ length: TOTAL_CHOCOLATES }, (_, i) => ({
      id: i,
      isPoisoned: i === poisonedId,
      isEaten: false,
    }));
    setChocolates(initialChocolates);
    setGameOver(false);
    setIsRevealed(false);
    setGameWon(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleChocolateClick = useCallback((id: number) => {
    if (gameOver || isRevealed) return;

    const clickedChocolate = chocolates.find(c => c.id === id);
    if (!clickedChocolate || clickedChocolate.isEaten) return;

    if (clickedChocolate.isPoisoned) {
      setGameOver(true);
      setGameWon(false);
    }

    setChocolates(prev =>
      prev.map(c => (c.id === id ? { ...c, isEaten: true } : c))
    );
  }, [chocolates, gameOver, isRevealed]);

  const handleReveal = useCallback(() => {
      if (gameOver) return;
      setIsRevealed(true);
      setGameOver(true);
      setGameWon(true);
  }, [gameOver]);

  const stats = useMemo(() => {
    const eatenCount = chocolates.filter(c => c.isEaten && !c.isPoisoned).length;
    const remainingCount = TOTAL_CHOCOLATES - chocolates.filter(c => c.isEaten).length;
    const riskPercentage = remainingCount > 0 ? (1 / remainingCount) * 100 : 0;
    
    return {
        moneyEarned: eatenCount * MONEY_PER_CHOCOLATE,
        remainingChocolates: remainingCount,
        riskPercentage: riskPercentage
    };
  }, [chocolates]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 md:p-6 flex flex-col items-center">
      <header className="text-center mb-4 md:mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-400 tracking-wider">Chocolate Challenge</h1>
        <p className="text-slate-400 mt-2 max-w-2xl">
          There are 1000 chocolates. For each you eat, you earn $100,000. But one is poisoned.
          <br /> How much risk are you willing to take?
        </p>
      </header>

      <main className="w-full flex-grow flex flex-col">
        {gameOver && <GameOverOverlay won={gameWon} money={stats.moneyEarned} onRestart={initializeGame} />}
        
        <div className="sticky top-4 z-10 bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-4">
            <StatsPanel 
                moneyEarned={stats.moneyEarned}
                remainingChocolates={stats.remainingChocolates}
                riskPercentage={stats.riskPercentage}
                gameOver={gameOver}
            />
        </div>

        <div className="flex-grow p-2 md:p-4 bg-slate-800 rounded-lg shadow-inner overflow-y-auto">
          <div className="grid grid-cols-[repeat(40,minmax(0,1fr))] gap-px justify-center">
            {chocolates.map(chocolate => (
              <Chocolate
                key={chocolate.id}
                chocolate={chocolate}
                isRevealed={isRevealed || (gameOver && chocolate.isPoisoned)}
                onClick={handleChocolateClick}
                disabled={gameOver || isRevealed || chocolate.isEaten}
              />
            ))}
          </div>
        </div>

        <footer className="sticky bottom-4 z-10 mt-4">
            <Controls
                onReveal={handleReveal}
                onRestart={initializeGame}
                isGameOver={gameOver}
                isRevealed={isRevealed}
            />
        </footer>
      </main>
    </div>
  );
};

export default App;