import { Player, GamePhase, Position } from './types';

// Traditional Murabaraba board positions (24 positions)
export const MILLS = [
  // Outer square
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  // Middle square  
  [9, 10, 11], [12, 13, 14], [15, 16, 17],
  // Inner square
  [18, 19, 20], [21, 22, 23],
  // Vertical lines
  [0, 9, 21], [3, 10, 18], [6, 11, 15],
  [1, 4, 7], [16, 19, 22], [8, 12, 17],
  [2, 14, 23], [5, 13, 20]
];

export const ADJACENCIES: number[][] = [
  [1, 9], [0, 2, 4], [1, 14], [4, 10], [1, 3, 5, 7], [4, 13],
  [7, 11], [4, 6, 8], [7, 12], [0, 10, 21], [3, 9, 11, 18],
  [6, 10, 15], [8, 13, 17], [5, 12, 14, 20], [2, 13, 23],
  [11, 16], [15, 17, 19], [12, 16], [10, 19], [16, 18, 20, 22],
  [13, 19, 23], [9, 22], [19, 21, 23], [14, 20, 22]
];

export class MurabarabaGame {
  board: (Player | null)[] = Array(24).fill(null);
  currentPlayer: Player = "player1";
  phase: GamePhase = "placing";
  piecesPlaced = { player1: 0, player2: 0 };
  selectedPosition: Position | null = null;
  removingPiece = false;
  winner: Player | null = null;

  getOpponent(): Player {
    return this.currentPlayer === "player1" ? "player2" : "player1";
  }

  countPieces(player: Player): number {
    return this.board.filter(piece => piece === player).length;
  }

  isInMill(position: Position, player: Player): boolean {
    return MILLS.some(mill => 
      mill.includes(position) && mill.every(pos => this.board[pos] === player)
    );
  }

  canMove(from: Position, to: Position): boolean {
    if (this.board[to] !== null) return false;
    
    // Flying phase - can move anywhere
    if (this.phase === "flying" || this.countPieces(this.currentPlayer) === 3) {
      return true;
    }
    
    // Normal movement - only to adjacent positions
    return ADJACENCIES[from].includes(to);
  }

  makeMove(position: Position): boolean {
    if (this.winner) return false;

    if (this.removingPiece) {
      return this.removePiece(position);
    }

    if (this.phase === "placing") {
      return this.placePiece(position);
    } else {
      return this.movePiece(position);
    }
  }

  placePiece(position: Position): boolean {
    if (this.board[position] !== null) return false;
    if (this.piecesPlaced[this.currentPlayer] >= 12) return false;

    this.board[position] = this.currentPlayer;
    this.piecesPlaced[this.currentPlayer]++;

    if (this.isInMill(position, this.currentPlayer)) {
      this.removingPiece = true;
      return true;
    }

    this.nextTurn();
    return true;
  }

  movePiece(position: Position): boolean {
    if (this.selectedPosition === null) {
      // Select piece to move
      if (this.board[position] === this.currentPlayer) {
        this.selectedPosition = position;
        return true;
      }
      return false;
    } else {
      // Move selected piece
      if (this.canMove(this.selectedPosition, position)) {
        this.board[position] = this.currentPlayer;
        this.board[this.selectedPosition] = null;
        
        const movedPosition = position;
        this.selectedPosition = null;

        if (this.isInMill(movedPosition, this.currentPlayer)) {
          this.removingPiece = true;
          return true;
        }

        this.nextTurn();
        return true;
      } else if (this.board[position] === this.currentPlayer) {
        // Select different piece
        this.selectedPosition = position;
        return true;
      }
      return false;
    }
  }

  removePiece(position: Position): boolean {
    const opponent = this.getOpponent();
    if (this.board[position] !== opponent) return false;

    // Check if piece is in a mill - can only remove if no other pieces available
    if (this.isInMill(position, opponent)) {
      const nonMillPieces = this.board
        .map((piece, idx) => piece === opponent && !this.isInMill(idx, opponent) ? idx : -1)
        .filter(idx => idx !== -1);
      
      if (nonMillPieces.length > 0) return false;
    }

    this.board[position] = null;
    this.removingPiece = false;
    
    this.checkWinCondition();
    if (!this.winner) {
      this.nextTurn();
    }
    
    return true;
  }

  nextTurn(): void {
    this.currentPlayer = this.getOpponent();
    this.selectedPosition = null;

    // Check if we should transition to moving phase
    if (this.phase === "placing" && 
        this.piecesPlaced.player1 === 12 && 
        this.piecesPlaced.player2 === 12) {
      this.phase = "moving";
    }

    // Check if current player should be in flying phase
    if (this.countPieces(this.currentPlayer) === 3) {
      this.phase = "flying";
    }

    this.checkWinCondition();
  }

  checkWinCondition(): void {
    const currentPieces = this.countPieces(this.currentPlayer);
    
    // Win if opponent has less than 3 pieces
    if (currentPieces < 3 && this.phase !== "placing") {
      this.winner = this.getOpponent();
      return;
    }

    // Win if opponent cannot move
    if (this.phase !== "placing" && !this.hasValidMoves(this.currentPlayer)) {
      this.winner = this.getOpponent();
    }
  }

  hasValidMoves(player: Player): boolean {
    const playerPositions = this.board
      .map((piece, idx) => piece === player ? idx : -1)
      .filter(idx => idx !== -1);

    if (this.countPieces(player) === 3) {
      // Flying phase - can move to any empty position
      return this.board.some(piece => piece === null);
    }

    // Check if any piece can move to an adjacent empty position
    return playerPositions.some(pos => 
      ADJACENCIES[pos].some(adj => this.board[adj] === null)
    );
  }

  reset(): void {
    this.board = Array(24).fill(null);
    this.currentPlayer = "player1";
    this.phase = "placing";
    this.piecesPlaced = { player1: 0, player2: 0 };
    this.selectedPosition = null;
    this.removingPiece = false;
    this.winner = null;
  }
}