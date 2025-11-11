
import React from 'react';
import type { Chocolate as ChocolateType } from '../types';
import ChocolateIcon from './ChocolateIcon';
import PoisonIcon from './PoisonIcon';

interface ChocolateProps {
  chocolate: ChocolateType;
  isRevealed: boolean;
  onClick: (id: number) => void;
  disabled: boolean;
}

const Chocolate: React.ForwardRefRenderFunction<HTMLButtonElement, ChocolateProps> = ({ chocolate, isRevealed, onClick, disabled }, ref) => {
  const { id, isPoisoned, isEaten } = chocolate;

  const handleClick = () => {
    if (!disabled) {
      onClick(id);
    }
  };

  const isTheRevealedPoison = isRevealed && isPoisoned;

  const getBackgroundColor = () => {
    if (isTheRevealedPoison) {
      return 'bg-red-500/50';
    }
    if (isEaten) {
      return 'bg-slate-700/30';
    }
    return 'bg-amber-800/50 hover:bg-amber-700/70';
  };
  
  const getBorderColor = () => {
    if (isTheRevealedPoison) {
      return 'border-red-400';
    }
     if (isEaten) {
      return 'border-slate-700';
    }
    return 'border-amber-900';
  }

  const getExtraClasses = () => {
    if (isTheRevealedPoison) {
        return 'shadow-lg shadow-red-500/50 scale-110 z-10';
    }
    return '';
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      disabled={disabled}
      className={`relative aspect-square w-full rounded-md border transition-all duration-300 ease-in-out flex items-center justify-center ${getBackgroundColor()} ${getBorderColor()} ${getExtraClasses()} ${!disabled && 'cursor-pointer'}`}
      aria-label={`Chocolate ${id + 1}`}
    >
        <div className={`transition-opacity duration-300 ${isEaten ? 'opacity-0' : 'opacity-100'}`}>
             <ChocolateIcon className="w-3/5 h-3/5 text-amber-950" />
        </div>
      
      {isTheRevealedPoison && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <PoisonIcon className="w-4/5 h-4/5 text-red-300" />
        </div>
      )}
    </button>
  );
};

export default React.memo(React.forwardRef(Chocolate));
