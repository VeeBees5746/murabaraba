import React from 'react';
import { Player, GamePhase } from './types';

interface GameStatusProps {
  currentPlayer: Player;
  phase: GamePhase;
  piecesPlaced: { player1: number; player2: number };
  removingPiece: boolean;
  winner: Player | null;
  onReset: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({
  currentPlayer,
  phase,
  piecesPlaced,
  removingPiece,
  winner,
  onReset
}) => {
  const getPhaseText = () => {
    if (winner) return `${winner === 'player1' ? 'Blue' : 'Red'} Player Wins!`;
    if (removingPiece) return `${currentPlayer === 'player1' ? 'Blue' : 'Red'} Player: Remove opponent's piece`;
    
    switch (phase) {
      case 'placing':
        return `${currentPlayer === 'player1' ? 'Blue' : 'Red'} Player: Place piece (${12 - piecesPlaced[currentPlayer]} left)`;
      case 'moving':
        return `${currentPlayer === 'player1' ? 'Blue' : 'Red'} Player: Move piece`;
      case 'flying':
        return `${currentPlayer === 'player1' ? 'Blue' : 'Red'} Player: Flying phase`;
      default:
        return '';
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {getPhaseText()}
        </h2>
        
        <div className="flex justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span>Blue: {piecesPlaced.player1}/12 placed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span>Red: {piecesPlaced.player2}/12 placed</span>
          </div>
        </div>
      </div>
      
      {winner && (
        <button
          onClick={onReset}
          className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default GameStatus;