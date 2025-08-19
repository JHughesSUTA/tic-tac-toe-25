import type { Player, Board } from "../types";

export type CheckForWinnerResult = {
  winner: Player | null;
  line: number[];
};

export const startingBoard: Board = Array(9).fill(null);

export const lines: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkForWinner = (board: Board): CheckForWinnerResult => {
  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return { winner: null, line: [] };
};

export const checkForDraw = (board: Board): boolean => {
  return board.every((cell) => cell !== null);
};

export const getNextTurn = (currentTurn: Player): Player => {
  return currentTurn === "x" ? "o" : "x";
};

export const makeMove = (
  board: Board,
  index: number,
  player: Player
): Board => {
  return board.map((cell, i) => (i === index ? player : cell)) as Board;
};
