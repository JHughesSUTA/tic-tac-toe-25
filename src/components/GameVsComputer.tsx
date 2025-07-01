import { useEffect, useState } from "react";
import type { RefObject } from "react";
import GameHeader from "./GameHeader";
import GameBoard from "./GameBoard";
import GameFooter from "./GameFooter";
import ModalGameWon from "./ModalGameWon";
import ModalReset from "./ModalReset";
import type { Board, GameType, Player } from "../types";

type GameVsComputerProps = {
  resetGame: () => void;
  toggleGameWonModal: () => void;
  gameWonModalRef: RefObject<HTMLDialogElement | null>;
  toggleResetModal: () => void;
  resetModalRef: RefObject<HTMLDialogElement | null>;
  gameType: Exclude<GameType, "two-player" | null>;
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

const GameVsComputer = ({
  resetGame,
  toggleGameWonModal,
  gameWonModalRef,
  toggleResetModal,
  resetModalRef,
  gameType,
  playerOne,
}: GameVsComputerProps) => {
  const [board, setBoard] = useState<Board>(startingBoard);
  const [gameActive, setGameActive] = useState<boolean>(true);
  const [turn, setTurn] = useState<Player>("x");
  const [xWinCount, setXWinCount] = useState<number>(0);
  const [oWinCount, setOWinCount] = useState<number>(0);
  const [catWinCount, setCatWinCount] = useState<number>(0);
  const [winner, setWinner] = useState<Player | "tie" | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [nextFirstTurn, setNextFirstTurn] = useState<Player>("o");

  const cpu: Player = playerOne === "x" ? "o" : "x";

  const startNewMatch = () => {
    setBoard(startingBoard);
    setGameActive(true);
    setTurn(nextFirstTurn);
    setNextFirstTurn(nextFirstTurn === "x" ? "o" : "x");
    setWinner(null);
    setWinningLine([]);
  };

  const restart = () => {
    setBoard(startingBoard);
    setGameActive(true);
    setTurn(nextFirstTurn === "x" ? "o" : "x");
  };

  const checkForDraw = (board: Board) => {
    if (board.every((cell) => cell !== null)) {
      console.log("The cat won!! ... meow");
      setGameActive(false);
      setCatWinCount((prev) => prev + 1);
      setWinner("tie");
      setTimeout(() => {
        toggleGameWonModal();
      }, 500);
      return;
    }
  };

  const handleClick = (i: number) => {
    // only allow click if game is active and cell clicked is empty
    if (!gameActive || board[i] || turn !== playerOne) return;

    // create copy of the new board and check if it's a winner
    const newBoard = board.map((cell, index) =>
      index === i ? playerOne : cell
    ) as Board;

    const { winner: gameWinner, line: winLine } = checkForWinner(newBoard);

    setBoard(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      setWinningLine(winLine);
      console.log(`${gameWinner} wins!`);
      setGameActive(false);
      if (gameWinner === "x") {
        setXWinCount((prev) => prev + 1);
      } else {
        setOWinCount((prev) => prev + 1);
      }
      setTimeout(() => {
        toggleGameWonModal();
      }, 1000);
      return;
    }

    checkForDraw(newBoard);

    !gameWinner && setTurn(turn === "x" ? "o" : "x");
  };

  useEffect(() => {
    if (turn !== playerOne && gameActive) {
      const timer = setTimeout(() => {
        let move: number | null = null;

        for (const line of lines) {
          const [a, b, c] = line;
          const values: (Player | null)[] = [board[a], board[b], board[c]];

          const winningMove =
            (values[0] === values[1] &&
              values[0] === cpu &&
              values[2] === null) ||
            (values[0] === values[2] &&
              values[0] === cpu &&
              values[1] === null) ||
            (values[1] === values[2] &&
              values[1] === cpu &&
              values[0] === null);

          const blockingMove =
            (values[0] === values[1] &&
              values[0] === playerOne &&
              values[2] === null) ||
            (values[0] === values[2] &&
              values[0] === playerOne &&
              values[1] === null) ||
            (values[1] === values[2] &&
              values[1] === playerOne &&
              values[0] === null);

          if (winningMove) {
            // pick cell if it's a winning move
            move = [a, b, c][values.indexOf(null)];
            break;
            // pick cell if it's a blocking move
          } else if (blockingMove && move === null) {
            move = [a, b, c][values.indexOf(null)];
          }
        }

        // Pick a random empty cell if there are no winning or blocking moves
        if (move === null) {
          const emptyCells: number[] = [];
          for (let i = 0; i < 9; i++) {
            if (!board[i]) emptyCells.push(i);
          }
          if (emptyCells.length === 0) return;
          move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }

        const newBoard = board.map((cell, index) =>
          index === move ? cpu : cell
        ) as Board;

        const { winner: gameWinner, line: winLine } = checkForWinner(newBoard);

        setBoard(newBoard);

        if (gameWinner) {
          setWinner(gameWinner);
          setWinningLine(winLine);
          setGameActive(false);
          if (gameWinner === "x") {
            setXWinCount((prev) => prev + 1);
          } else {
            setOWinCount((prev) => prev + 1);
          }
          setTimeout(() => {
            toggleGameWonModal();
          }, 1000);
          return;
        }

        checkForDraw(newBoard);

        !gameWinner && setTurn(turn === "x" ? "o" : "x");
      }, Math.floor(Math.random() * (1000 - 500 + 1)) + 500); // .5 - 1 second delay (thinking)

      return () => clearTimeout(timer);
    }
  }, [board, turn, gameActive]);

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
        playerOne={playerOne}
        gameType={gameType}
        winningLine={winningLine}
      />
      <GameFooter
        xWinCount={xWinCount}
        oWinCount={oWinCount}
        catWinCount={catWinCount}
        gameType={gameType}
        playerOne={playerOne}
      />
      <ModalGameWon
        ref={gameWonModalRef}
        toggleGameWonModal={toggleGameWonModal}
        startNewMatch={startNewMatch}
        resetGame={resetGame}
        winner={winner}
        gameType={gameType}
        playerOne={playerOne}
      />
      <ModalReset
        ref={resetModalRef}
        restart={restart}
        toggleResetModal={toggleResetModal}
      />
    </main>
  );
};

export default GameVsComputer;
