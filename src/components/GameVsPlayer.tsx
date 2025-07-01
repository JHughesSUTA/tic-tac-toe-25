import { useState } from "react";
import type { RefObject } from "react";
import GameHeader from "./GameHeader";
import GameBoard from "./GameBoard";
import GameFooter from "./GameFooter";
import ModalGameWon from "./ModalGameWon";
import ModalReset from "./ModalReset";
import type { Player, Board, GameType } from "../types";

type GameVsPlayerProps = {
  resetGame: () => void;
  toggleGameWonModal: () => void;
  gameWonModalRef: RefObject<HTMLDialogElement | null>;
  toggleResetModal: () => void;
  resetModalRef: RefObject<HTMLDialogElement | null>;
  gameType: Exclude<GameType, "single-player" | null>;
  playerOne: Player;
};

type CheckForWinnerResult = {
  winner: Player | null;
  line: number[];
};

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
  resetGame,
  toggleGameWonModal,
  gameWonModalRef,
  toggleResetModal,
  resetModalRef,
  gameType,
  playerOne,
}: GameVsPlayerProps) => {
  const [board, setBoard] = useState<Board>(startingBoard);
  const [gameActive, setGameActive] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | "tie" | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [turn, setTurn] = useState<Player>("x");
  const [xWinCount, setXWinCount] = useState<number>(0);
  const [oWinCount, setOWinCount] = useState<number>(0);
  const [catWinCount, setCatWinCount] = useState<number>(0);
  const [nextFirstTurn, setNextFirstTurn] = useState<Player>("o");

  const startNewMatch = () => {
    setBoard(startingBoard);
    setGameActive(true);
    setWinner(null);
    setWinningLine([]);
    setTurn(nextFirstTurn);
    setNextFirstTurn(nextFirstTurn === "x" ? "o" : "x");
  };

  const restart = () => {
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
      setWinningLine(winLine);

      if (gameWinner === "x") {
        setXWinCount((prev) => prev + 1);
      } else if (gameWinner === "o") {
        setOWinCount((prev) => prev + 1);
      }
      setTimeout(() => {
        toggleGameWonModal();
      }, 1000);
    } else if (newBoard.every((cell) => cell !== null)) {
      console.log("The cat won!! ... meow");
      setGameActive(false);
      setWinner("tie");
      setCatWinCount((prev) => prev + 1);
      setTimeout(() => {
        toggleGameWonModal();
      }, 500);
      return;
    }

    !gameWinner && setTurn(turn === "x" ? "o" : "x");
  };

  return (
    <main className="container">
      <GameHeader
        turn={turn}
        toggleResetModal={toggleResetModal}
        resetGame={resetGame}
      />
      <GameBoard
        board={board}
        handleClick={handleClick}
        turn={turn}
        gameType={gameType!}
        winningLine={winningLine}
      />
      <GameFooter
        xWinCount={xWinCount}
        oWinCount={oWinCount}
        catWinCount={catWinCount}
        gameType={gameType!}
        playerOne={playerOne}
      />
      <ModalGameWon
        ref={gameWonModalRef}
        toggleGameWonModal={toggleGameWonModal}
        startNewMatch={startNewMatch}
        resetGame={resetGame}
        winner={winner}
        playerOne={playerOne}
        gameType={gameType}
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
