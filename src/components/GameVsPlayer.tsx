import { useEffect } from "react";
import GameHeader from "./GameHeader";
import GameBoard from "./GameBoard";
import GameFooter from "./GameFooter";
import ModalGameWon from "./ModalGameWon";
import ModalReset from "./ModalReset";
import { usePersistedState } from "../hooks/usePersistedState";
import type { RefObject } from "react";
import type { Player, Board } from "../types";
import { useSafeTimeout } from "../hooks/useSafeTimeout";

type GameVsPlayerProps = {
  toggleGameWonModal: () => void;
  gameWonModalRef: RefObject<HTMLDialogElement | null>;
  toggleResetModal: () => void;
  resetModalRef: RefObject<HTMLDialogElement | null>;
};

type CheckForWinnerResult = {
  winner: Player | null;
  line: number[];
};

// TODO - playerOne only gets set to local storage after refreshing (from modal?)

const startingBoard: Board = Array(9).fill(null);
const lines: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkForWinner = (board: Board): CheckForWinnerResult => {
  for (const line of lines) {
    // assign each index of the current array to a variable
    const [a, b, c] = line;
    // check against board if it's a winner
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return { winner: null, line: [] };
};

const GameVsPlayer = ({
  toggleGameWonModal,
  gameWonModalRef,
  toggleResetModal,
  resetModalRef,
}: GameVsPlayerProps) => {
  const [board, setBoard] = usePersistedState<Board>("board", startingBoard);
  const [gameActive, setGameActive] = usePersistedState("gameActive", true);
  const [turn, setTurn] = usePersistedState<Player>("turn", "x");
  const [xWinCount, setXWinCount] = usePersistedState("xWinCount", 0);
  const [oWinCount, setOWinCount] = usePersistedState("oWinCount", 0);
  const [catWinCount, setCatWinCount] = usePersistedState("catWinCount", 0);
  const [winner, setWinner] = usePersistedState<Player | "tie" | null>(
    "winner",
    null
  );
  const [winningLine, setWinningLine] = usePersistedState<number[]>(
    "winningLine",
    []
  );
  const [nextFirstTurn, setNextFirstTurn] = usePersistedState<Player>(
    "nextFirstTurn",
    "o"
  );
  const [isGameWonModalOpen, setIsGameWonModalOpen] = usePersistedState(
    "isGameWonModalOpen",
    false
  );

  const { setSafeTimeout } = useSafeTimeout();

  useEffect(() => {
    if (winner && isGameWonModalOpen && gameWonModalRef.current) {
      gameWonModalRef.current.showModal();
    }
  }, []);

  const startNewMatch = () => {
    setBoard(startingBoard);
    setGameActive(true);
    setWinner(null);
    setWinningLine([]);
    setTurn(nextFirstTurn);
    setNextFirstTurn(nextFirstTurn === "x" ? "o" : "x");
    setIsGameWonModalOpen(false);

    if (gameWonModalRef.current?.open) {
      gameWonModalRef.current.close();
    }
  };

  const restart = () => {
    console.log("restarting game vs player");
    setBoard(startingBoard);
    setGameActive(true);
    setTurn(nextFirstTurn === "x" ? "o" : "x");
  };

  const handleClick = (i: number) => {
    if (!gameActive || board[i]) return;

    const newBoard = board.map((cell, index) =>
      index === i ? turn : cell
    ) as Board;
    const { winner: gameWinner, line: winLine } = checkForWinner(newBoard);

    setBoard(newBoard);

    if (gameWinner) {
      setGameActive(false);
      setWinner(gameWinner);
      setIsGameWonModalOpen(true);
      setWinningLine(winLine);

      if (gameWinner === "x") {
        setXWinCount((prev) => prev + 1);
      } else if (gameWinner === "o") {
        setOWinCount((prev) => prev + 1);
      }
      setSafeTimeout(() => {
        toggleGameWonModal();
      }, 1000);
    } else if (newBoard.every((cell) => cell !== null)) {
      console.log("The cat won!! ... meow");
      setGameActive(false);
      setWinner("tie");
      setIsGameWonModalOpen(true);
      setCatWinCount((prev) => prev + 1);
      setSafeTimeout(() => {
        toggleGameWonModal();
      }, 1000);
      return;
    }

    !gameWinner && setTurn(turn === "x" ? "o" : "x");
  };

  return (
    <main className="container">
      <GameHeader turn={turn} toggleResetModal={toggleResetModal} />
      <GameBoard
        board={board}
        handleClick={handleClick}
        turn={turn}
        winningLine={winningLine}
      />
      <GameFooter
        xWinCount={xWinCount}
        oWinCount={oWinCount}
        catWinCount={catWinCount}
      />
      <ModalGameWon
        ref={gameWonModalRef}
        toggleGameWonModal={toggleGameWonModal}
        startNewMatch={startNewMatch}
        winner={winner}
      />
      <ModalReset
        ref={resetModalRef}
        restart={restart}
        toggleResetModal={toggleResetModal}
      />
    </main>
  );
};

export default GameVsPlayer;
