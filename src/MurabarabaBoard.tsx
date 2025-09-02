import React from "react";
import { useGame } from "./GameLogic.ts";
import Piece from "./Piece.tsx";

const INTERSECTIONS = [
  [40, 40], [200, 40], [360, 40],
  [80, 80], [200, 80], [320, 80],
  [120, 120], [200, 120], [280, 120],
  [40, 200], [80, 200], [120, 200], [280, 200], [320, 200], [360, 200],
  [120, 280], [200, 280], [280, 280],
  [80, 320], [200, 320], [320, 320],
  [40, 360], [200, 360], [360, 360],
];

const BOARD_SIZE = 400;

const lines = [
  // Outer square
  [INTERSECTIONS[0], INTERSECTIONS[2]],
  [INTERSECTIONS[2], INTERSECTIONS[22]],
  [INTERSECTIONS[22], INTERSECTIONS[0]],
  // Middle square
  [INTERSECTIONS[3], INTERSECTIONS[5]],
  [INTERSECTIONS[5], INTERSECTIONS[19]],
  [INTERSECTIONS[19], INTERSECTIONS[3]],
  // Inner square
  [INTERSECTIONS[6], INTERSECTIONS[8]],
  [INTERSECTIONS[8], INTERSECTIONS[17]],
  [INTERSECTIONS[17], INTERSECTIONS[6]],
  // Connecting lines
  [INTERSECTIONS[1], INTERSECTIONS[20]],
  [INTERSECTIONS[4], INTERSECTIONS[16]],
  [INTERSECTIONS[7], INTERSECTIONS[10]],
  [INTERSECTIONS[13], INTERSECTIONS[11]],
  [INTERSECTIONS[14], INTERSECTIONS[21]],
];

const MurabarabaBoard: React.FC = () => {
  const {
    board,
    currentPlayer,
    handlePlace,
    handleMove,
    selected,
    mills,
    flyingPhase,
    canRemove,
    handleRemove,
    phase,
    winner,
  } = useGame();

  return (
    <div
      className="relative board-shadow"
      style={{
        width: BOARD_SIZE,
        height: BOARD_SIZE,
        minWidth: 300,
        minHeight: 300,
      }}
    >
      <svg
        width={BOARD_SIZE}
        height={BOARD_SIZE}
        viewBox="0 0 400 400"
        className="rounded-lg shadow-lg bg-white"
      >
        {/* Board squares and lines */}
        {lines.map((line, idx) => (
          <line
            key={idx}
            x1={line[0][0]}
            y1={line[0][1]}
            x2={line[1][0]}
            y2={line[1][1]}
            stroke="#c2410c"
            strokeWidth={4}
            strokeLinecap="round"
          />
        ))}
        {/* Intersections */}
        {INTERSECTIONS.map(([x, y], idx) => (
          <circle
            key={idx}
            cx={x}
            cy={y}
            r={15}
            fill="#fff7ed"
            stroke="#c2410c"
            strokeWidth={2}
          />
        ))}
      </svg>
      {/* Pieces */}
      {board.map((cell, idx) => (
        <Piece
          key={idx}
          index={idx}
          cell={cell}
          selected={selected === idx}
          onPlace={() => handlePlace(idx)}
          onMove={() => handleMove(idx)}
          onRemove={() => canRemove && handleRemove(idx)}
          isMill={mills.includes(idx)}
          position={INTERSECTIONS[idx]}
        />
      ))}
      {/* Overlay for winner */}
      {winner && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
          <div className="bg-white p-8 rounded-xl shadow-xl text-center">
            <h2 className="text-3xl font-bold text-orange-600 mb-2">Game Over!</h2>
            <p className="text-xl text-blue-700">{winner} wins!</p>
            <button
              className="mt-4 px-6 py-2 bg-orange-500 text-white font-bold rounded shadow hover:bg-orange-600 transition"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      {/* Current phase and player */}
      <div className="absolute right-2 top-2 bg-white bg-opacity-80 px-4 py-1 rounded shadow text-lg font-semibold">
        {phase === "placing"
          ? `Placing phase: ${currentPlayer}`
          : flyingPhase
          ? `Flying phase: ${currentPlayer}`
          : `Moving phase: ${currentPlayer}`}
      </div>
    </div>
  );
};

export default MurabarabaBoard;
