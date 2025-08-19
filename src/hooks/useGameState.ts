import { usePersistedState } from "./usePersistedState";
import type { Player, Board } from "../types";
import { getNextTurn } from "../utils/gameUtils";

const startingBoard: Board = Array(9).fill(null);

export const useGameState = (keyPrefix: string = "") => {
  const [board, setBoard] = usePersistedState<Board>(
    `${keyPrefix}board`,
    startingBoard
  );
  const [gameActive, setGameActive] = usePersistedState(
    `${keyPrefix}gameActive`,
    true
  );
  const [turn, setTurn] = usePersistedState<Player>(`${keyPrefix}turn`, "x");
  const [xWinCount, setXWinCount] = usePersistedState(
    `${keyPrefix}xWinCount`,
    0
  );
  const [oWinCount, setOWinCount] = usePersistedState(
    `${keyPrefix}oWinCount`,
    0
  );
  const [catWinCount, setCatWinCount] = usePersistedState(
    `${keyPrefix}catWinCount`,
    0
  );
  const [winner, setWinner] = usePersistedState<Player | "tie" | null>(
    `${keyPrefix}winner`,
    null
  );
  const [winningLine, setWinningLine] = usePersistedState<number[]>(
    `${keyPrefix}winningLine`,
    []
  );
  const [nextFirstTurn, setNextFirstTurn] = usePersistedState<Player>(
    `${keyPrefix}nextFirstTurn`,
    "o"
  );
  const [isGameWonModalOpen, setIsGameWonModalOpen] = usePersistedState(
    `${keyPrefix}isGameWonModalOpen`,
    false
  );

  const restart = () => {
    setBoard(startingBoard);
    setGameActive(true);
    setTurn(getNextTurn(nextFirstTurn));
  };

  const startNewMatch = () => {
    setBoard(startingBoard);
    setGameActive(true);
    setWinner(null);
    setWinningLine([]);
    setTurn(nextFirstTurn);
    setNextFirstTurn(getNextTurn(nextFirstTurn));
    setIsGameWonModalOpen(false);
  };

  return {
    board,
    setBoard,
    gameActive,
    setGameActive,
    turn,
    setTurn,
    xWinCount,
    setXWinCount,
    oWinCount,
    setOWinCount,
    catWinCount,
    setCatWinCount,
    winner,
    setWinner,
    winningLine,
    setWinningLine,
    nextFirstTurn,
    setNextFirstTurn,
    isGameWonModalOpen,
    setIsGameWonModalOpen,
    restart,
    startNewMatch,
  };
};
