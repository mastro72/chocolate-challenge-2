import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { Chocolate as ChocolateType, ScoreEntry } from './types';
import Chocolate from './components/Chocolate';
import StatsPanel from './components/StatsPanel';
import Controls from './components/Controls';
import GameOverOverlay from './components/GameOverOverlay';
import WelcomeScreen from './components/WelcomeScreen';
import Leaderboard from './components/Leaderboard';

const TOTAL_CHOCOLATES = 1000;
const MONEY_PER_CHOCOLATE = 100000;
const LEADERBOARD_KEY = 'chocolateChallengeLeaderboard';

const App: React.FC = () => {
  const [chocolates, setChocolates] = useState<ChocolateType[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [showWinOverlay, setShowWinOverlay] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);
  const [currentScoreId, setCurrentScoreId] = useState<string | null>(null);

  const poisonedChocolateRef = useRef<HTMLButtonElement>(null);
  const scoreRecordedRef = useRef<boolean>(false);

  useEffect(() => {
    try {
      const savedScores = localStorage.getItem(LEADERBOARD_KEY);
      if (savedScores) {
        setLeaderboard(JSON.parse(savedScores));
      }
    } catch (error) {
      console.error("Failed to load leaderboard from localStorage", error);
    }
  }, []);

  const addScoreToLeaderboard = useCallback((newScore: ScoreEntry) => {
    if (newScore.score < 0) return;
      
    const updatedScores = [...leaderboard, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    setLeaderboard(updatedScores);
    setCurrentScoreId(newScore.id);

    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedScores));
    } catch (error) {
       console.error("Failed to save leaderboard to localStorage", error);
    }
  }, [leaderboard]);
  
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
    setShowWinOverlay(false);
    scoreRecordedRef.current = false;
    setCurrentScoreId(null);
  }, []);
  
  const handleStartGame = (name: string) => {
    setPlayerName(name);
    setGameStarted(true);
  };

  useEffect(() => {
    if (gameStarted) {
      initializeGame();
    }
  }, [gameStarted, initializeGame]);

  useEffect(() => {
    if (gameWon) {
      const timer = setTimeout(() => {
        setShowWinOverlay(true);
      }, 2500); // Wait 2.5 seconds to show the win overlay
      return () => clearTimeout(timer);
    }
  }, [gameWon]);

  useEffect(() => {
    if (isRevealed && poisonedChocolateRef.current) {
      setTimeout(() => {
        poisonedChocolateRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }, 100);
    }
  }, [isRevealed]);

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

  useEffect(() => {
      if (gameOver && !scoreRecordedRef.current) {
          const finalScore = gameWon ? stats.moneyEarned : 0;
          addScoreToLeaderboard({
              playerName,
              score: finalScore,
              id: `${playerName}-${Date.now()}`
          });
          scoreRecordedRef.current = true;
      }
  }, [gameOver, gameWon, playerName, stats.moneyEarned, addScoreToLeaderboard]);


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
  
  const lostByPoison = gameOver && !gameWon && !isRevealed;
  const isGameOverOverlayVisible = lostByPoison || showWinOverlay;
  
  if (!gameStarted) {
    return <WelcomeScreen onStartGame={handleStartGame} leaderboard={leaderboard} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 md:p-6 flex flex-col items-center">
      <header className="text-center mb-4 md:mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-400 tracking-wider">Chocolate Challenge</h1>
        <p className="text-slate-400 mt-2 max-w-2xl">
          There are 1000 chocolates. For each you eat, you earn $100,000. But one is poisoned.
          <br /> How much risk are you willing to take?
        </p>
      </header>

      <main className="w-full flex-grow flex flex-col max-w-7xl">
        {isGameOverOverlayVisible && (
          <GameOverOverlay 
            won={gameWon} 
            money={gameWon ? stats.moneyEarned : 0} 
            onRestart={initializeGame}
            playerName={playerName}
            leaderboard={leaderboard}
            currentScoreId={currentScoreId}
          />
        )}
        
        <div className="sticky top-4 z-10 bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-4">
            <StatsPanel 
                playerName={playerName}
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
                ref={chocolate.isPoisoned ? poisonedChocolateRef : null}
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
