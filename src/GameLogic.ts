import React, { useState } from "react";
import { Player } from "./types";

// Murabaraba board setup
const MILLS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 9, 21], [3, 10, 18], [6, 11, 15],
  [2, 14, 23], [5, 13, 20], [8, 12, 17],
  [15, 16, 17], [18, 19, 20], [21, 22, 23],
  [9, 10, 11], [12, 13, 14], [16, 19, 22],
  [1, 4, 7], [16, 19, 22], [17, 20, 23],
];

const ADJACENT = [
  [1, 9], [0, 2, 4], [1, 14], [4, 10], [1, 3, 5, 7], [4, 13], [7, 11], [4, 6, 8], [7, 12],
  [0, 10, 21], [3, 9, 11, 18], [6, 10, 15], [8, 13, 17], [5, 12, 14, 20], [2, 13, 23],
  [11, 16], [15, 17, 19], [8, 16], [12, 17, 20], [10, 19, 21], [16, 18, 20, 22], [13, 19, 23],
  [9, 18, 22], [19, 21, 23], [14, 20, 22],
];

const PIECES_PER_PLAYER = 12;

type Phase = "placing" | "moving" | "flying";

export const useGame = () => {
  const [board, setBoard] = useState<(Player | null)[]>(Array(24).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("Player1");
  const [piecesPlaced, setPiecesPlaced] = useState({ Player1: 0, Player2: 0 });
  const [selected, setSelected] = useState<number | null>(null);
  const [mills, setMills] = useState<number[]>([]);
  const [canRemove, setCanRemove] = useState(false);
  const [phase, setPhase] = useState<Phase>("placing");
  const [flyingPhase, setFlyingPhase] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);

  const countPieces = (player: Player) => board.filter((p) => p === player).length;

  const getMills = (player: Player) => {
    let inMill: number[] = [];
    MILLS.forEach((mill) => {
      if (mill.every((idx) => board[idx] === player)) inMill.push(...mill);
    });
    return Array.from(new Set(inMill));
  };

  const handlePlace = (idx: number) => {
    if (phase !== "placing" || board[idx] !== null || winner) return;
    setBoard((prev) => {
      const next = [...prev];
      next[idx] = currentPlayer;
      return next;
    });
    setPiecesPlaced((prev) => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + 1,
    }));

    setTimeout(() => {
      const newMills = getMills(currentPlayer);
      setMills(newMills);
      if (newMills.includes(idx)) {
        setCanRemove(true);
      } else {
        nextTurn();
      }
    }, 100);

    if (piecesPlaced[currentPlayer] + 1 === PIECES_PER_PLAYER &&
        piecesPlaced[otherPlayer()] === PIECES_PER_PLAYER) {
      setPhase("moving");
    }
  };

  const handleMove = (idx: number) => {
    if (winner) return;
    if (phase === "placing") return;
    if (selected === null) {
      if (board[idx] === currentPlayer) setSelected(idx);
    } else {
      if (board[idx] === null && isValidMove(selected, idx)) {
        setBoard((prev) => {
          const next = [...prev];
          next[idx] = currentPlayer;
          next[selected] = null;
          return next;
        });
        setSelected(null);

        setTimeout(() => {
          const newMills = getMills(currentPlayer);
          setMills(newMills);
          if (newMills.includes(idx)) {
            setCanRemove(true);
          } else {
            nextTurn();
          }
        }, 100);
      } else if (board[idx] === currentPlayer) {
        setSelected(idx);
      }
    }
  };

  const isValidMove = (from: number, to: number) => {
    if (flyingPhase || countPieces(currentPlayer) === 3) return board[to] === null;
    return ADJACENT[from].includes(to) && board[to] === null;
  };

  const handleRemove = (idx: number) => {
    if (!canRemove || board[idx] !== otherPlayer()) return;
    const opponentMills = getMills(otherPlayer());
    if (opponentMills.includes(idx)) {
      const opponentPieces = board
        .map((v, i) => v === otherPlayer() && !opponentMills.includes(i))
        .filter(Boolean).length;
      if (opponentPieces > 0) return;
    }
    setBoard((prev) => {
      const next = [...prev];
      next[idx] = null;
      return next;
    });
    setCanRemove(false);
    setMills([]);
    nextTurn();
    checkWin();
  };

  const checkWin = () => {
    if (countPieces(otherPlayer()) < 3 || !hasMoves(otherPlayer())) {
      setWinner(currentPlayer);
    }
  };

  const hasMoves = (player: Player) => {
    if (countPieces(player) > 3) {
      for (let i = 0; i < board.length; i++) {
        if (board[i] === player) {
          if (ADJACENT[i].some((adj) => board[adj] === null)) return true;
        }
      }
      return false;
    }
    return board.some((cell) => cell === null);
  };

  const nextTurn = () => {
    setCurrentPlayer(otherPlayer());
    setSelected(null);

    if (countPieces(otherPlayer()) === 3) {
      setFlyingPhase(true);
      setPhase("flying");
    } else if (phase === "flying" && countPieces(otherPlayer()) > 3) {
      setFlyingPhase(false);
      setPhase("moving");
    }
  };

  const otherPlayer = () => (currentPlayer === "Player1" ? "Player2" : "Player1");

  return {
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
  };
};
