import React, { useState } from 'react';
import { MurabarabaGame } from './gameLogic';
import Board from './Board';
import GameStatus from './GameStatus';
import Instructions from './Instructions';
import './index.css';

const App: React.FC = () => {
  const [game] = useState(() => new MurabarabaGame());
  const [gameState, setGameState] = useState({
    board: game.board,
    currentPlayer: game.currentPlayer,
    phase: game.phase,
    piecesPlaced: game.piecesPlaced,
    selectedPosition: game.selectedPosition,
    removingPiece: game.removingPiece,
    winner: game.winner
  });
  const [showInstructions, setShowInstructions] = useState(false);

  const updateGameState = () => {
    setGameState({
      board: [...game.board],
      currentPlayer: game.currentPlayer,
      phase: game.phase,
      piecesPlaced: { ...game.piecesPlaced },
      selectedPosition: game.selectedPosition,
      removingPiece: game.removingPiece,
      winner: game.winner
    });
  };

  const handlePositionClick = (position: number) => {
    const success = game.makeMove(position);
    if (success) {
      updateGameState();
    }
  };

  const handleReset = () => {
    game.reset();
    updateGameState();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">Murabaraba</h1>
          <button
            onClick={() => setShowInstructions(true)}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            How to Play
          </button>
        </header>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="flex-shrink-0">
            <Board
              board={gameState.board}
              selectedPosition={gameState.selectedPosition}
              onPositionClick={handlePositionClick}
              removingPiece={gameState.removingPiece}
              currentPlayer={gameState.currentPlayer}
            />
          </div>
          
          <div className="flex-shrink-0">
            <GameStatus
              currentPlayer={gameState.currentPlayer}
              phase={gameState.phase}
              piecesPlaced={gameState.piecesPlaced}
              removingPiece={gameState.removingPiece}
              winner={gameState.winner}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>

      {showInstructions && (
        <Instructions onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
};

export default App;