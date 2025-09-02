import React from 'react';
import { Player, Position } from './types';

interface BoardProps {
  board: (Player | null)[];
  selectedPosition: Position | null;
  onPositionClick: (position: Position) => void;
  removingPiece: boolean;
  currentPlayer: Player;
}

// Board position coordinates for traditional Murabaraba layout
const POSITIONS = [
  // Outer square (0-8)
  [50, 50], [200, 50], [350, 50],
  [100, 100], [200, 100], [300, 100],
  [150, 150], [200, 150], [250, 150],
  
  // Middle positions (9-17)
  [50, 200], [100, 200], [150, 200],
  [250, 200], [300, 200], [350, 200],
  [150, 250], [200, 250], [250, 250],
  
  // Inner square (18-23)
  [100, 300], [200, 300], [250, 300],
  [50, 350], [200, 350], [350, 350]
];

const LINES = [
  // Outer square
  [[50, 50], [350, 50]], [[350, 50], [350, 350]], 
  [[350, 350], [50, 350]], [[50, 350], [50, 50]],
  
  // Middle square
  [[100, 100], [300, 100]], [[300, 100], [300, 300]], 
  [[300, 300], [100, 300]], [[100, 300], [100, 100]],
  
  // Inner square
  [[150, 150], [250, 150]], [[250, 150], [250, 250]], 
  [[250, 250], [150, 250]], [[150, 250], [150, 150]],
  
  // Connecting lines
  [[200, 50], [200, 150]], [[200, 250], [200, 350]],
  [[50, 200], [150, 200]], [[250, 200], [350, 200]]
];

const Board: React.FC<BoardProps> = ({ 
  board, 
  selectedPosition, 
  onPositionClick, 
  removingPiece,
  currentPlayer 
}) => {
  return (
    <div className="relative">
      <svg width="400" height="400" className="bg-amber-100 rounded-lg shadow-lg">
        {/* Draw board lines */}
        {LINES.map((line, idx) => (
          <line
            key={idx}
            x1={line[0][0]}
            y1={line[0][1]}
            x2={line[1][0]}
            y2={line[1][1]}
            stroke="#92400e"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
        
        {/* Draw positions */}
        {POSITIONS.map((pos, idx) => {
          const piece = board[idx];
          const isSelected = selectedPosition === idx;
          const canRemove = removingPiece && piece && piece !== currentPlayer;
          
          return (
            <g key={idx}>
              {/* Position circle */}
              <circle
                cx={pos[0]}
                cy={pos[1]}
                r="12"
                fill={piece ? "transparent" : "#fef3c7"}
                stroke="#92400e"
                strokeWidth="2"
                className="cursor-pointer"
                onClick={() => onPositionClick(idx)}
              />
              
              {/* Game piece */}
              {piece && (
                <circle
                  cx={pos[0]}
                  cy={pos[1]}
                  r="16"
                  fill={piece === "player1" ? "#3b82f6" : "#ef4444"}
                  stroke={isSelected ? "#fbbf24" : "#ffffff"}
                  strokeWidth={isSelected ? "4" : "2"}
                  className={`cursor-pointer transition-all duration-200 ${
                    canRemove ? 'animate-pulse' : ''
                  }`}
                  onClick={() => onPositionClick(idx)}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default Board;