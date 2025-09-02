import React from "react";
import { Player } from "./types";

interface PieceProps {
  index: number;
  cell: Player | null;
  selected: boolean;
  onPlace: () => void;
  onMove: () => void;
  onRemove: () => void;
  isMill: boolean;
  position: [number, number];
}

const Piece: React.FC<PieceProps> = ({
  cell,
  selected,
  onPlace,
  onMove,
  onRemove,
  isMill,
  position,
}) => {
  const [x, y] = position;

  const style: React.CSSProperties = {
    position: "absolute",
    left: x - 20,
    top: y - 20,
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: cell
      ? cell === "Player1"
        ? "linear-gradient(135deg, #fbbf24 60%, #f59e42)"
        : "linear-gradient(135deg, #3b82f6 60%, #2563eb)"
      : "transparent",
    border: cell
      ? "2px solid #fff"
      : "2px dashed #c2410c",
    boxShadow: isMill ? "0 0 16px 3px #fbbf24" : selected ? "0 0 10px 2px #2563eb" : "",
    cursor: cell
      ? onRemove
        ? "pointer"
        : "default"
      : "pointer",
    zIndex: isMill ? 10 : 1,
    transition: "box-shadow 0.2s, transform 0.2s",
    outline: selected ? "3px solid #2563eb" : "none",
  };

  return (
    <div
      style={style}
      className="premium-piece"
      aria-label={cell ? cell : "empty"}
      onClick={cell ? (onRemove ? onRemove : onMove) : onPlace}
      title={cell ? cell : "Place here"}
    />
  );
};

export default Piece;
