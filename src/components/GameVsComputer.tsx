import { useEffect } from "react";
import type { RefObject } from "react";
import type { Board, Player } from "../types";
import { useGameMode } from "../contexts/GameModeContext";
import { useSafeTimeout } from "../hooks/useSafeTimeout";
import { useGameState } from "../hooks/useGameState";
import GameLayout from "./GameLayout";
import {
  startingBoard,
  lines,
  checkForWinner,
  getNextTurn,
  makeMove,
} from "../utils/gameUtils";

type GameVsComputerProps = {
  toggleGameWonModal: () => void;
  gameWonModalRef: RefObject<HTMLDialogElement | null>;
  toggleResetModal: () => void;
  resetModalRef: RefObject<HTMLDialogElement | null>;
};

const GameVsComputer = ({
  toggleGameWonModal,
  gameWonModalRef,
  toggleResetModal,
  resetModalRef,
}: GameVsComputerProps) => {
  const gameState = useGameState("vsCPU_");

  const { playerOne } = useGameMode();

  const { setSafeTimeout } = useSafeTimeout();

  const cpu: Player = getNextTurn(playerOne);

  const checkForDraw = (board: Board) => {
    if (board.every((cell) => cell !== null)) {
      console.log("The cat won!! ... meow");
      gameState.setGameActive(false);
      gameState.setCatWinCount((prev) => prev + 1);
      gameState.setWinner("tie");
      gameState.setIsGameWonModalOpen(true);
      setSafeTimeout(() => {
        toggleGameWonModal();
      }, 1000);
      return;
    }
  };

  const handleClick = (i: number) => {
    // only allow click if game is active and cell clicked is empty
    if (
      !gameState.gameActive ||
      gameState.board[i] ||
      gameState.turn !== playerOne
    )
      return;

    const newBoard = makeMove(gameState.board, i, playerOne);

    const { winner: gameWinner, line: winLine } = checkForWinner(newBoard);

    gameState.setBoard(newBoard);

    if (gameWinner) {
      gameState.setWinner(gameWinner);
      gameState.setIsGameWonModalOpen(true);
      gameState.setWinningLine(winLine);
      console.log(`${gameWinner} wins!`);
      gameState.setGameActive(false);
      if (gameWinner === "x") {
        gameState.setXWinCount((prev) => prev + 1);
      } else {
        gameState.setOWinCount((prev) => prev + 1);
      }
      setSafeTimeout(() => {
        toggleGameWonModal();
      }, 1000);
      return;
    }

    checkForDraw(newBoard);

    !gameWinner && gameState.setTurn(getNextTurn(gameState.turn));
  };

  useEffect(() => {
    if (
      gameState.winner &&
      gameState.isGameWonModalOpen &&
      gameWonModalRef.current
    ) {
      gameWonModalRef.current.showModal();
    }
  }, []);

  useEffect(() => {
    if (
      gameState.turn !== playerOne &&
      gameState.gameActive &&
      !gameState.winner
    ) {
      setSafeTimeout(() => {
        let move: number | null = null;

        for (const line of lines) {
          const [a, b, c] = line;
          const values: (Player | null)[] = [
            gameState.board[a],
            gameState.board[b],
            gameState.board[c],
          ];

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
            if (!gameState.board[i]) emptyCells.push(i);
          }
          if (emptyCells.length === 0) return;
          move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }

        const newBoard = makeMove(gameState.board, move!, cpu);

        const { winner: gameWinner, line: winLine } = checkForWinner(newBoard);

        gameState.setBoard(newBoard);

        if (gameWinner) {
          gameState.setWinner(gameWinner);
          gameState.setIsGameWonModalOpen(true);
          gameState.setWinningLine(winLine);
          gameState.setGameActive(false);
          if (gameWinner === "x") {
            gameState.setXWinCount((prev) => prev + 1);
          } else {
            gameState.setOWinCount((prev) => prev + 1);
          }
          setSafeTimeout(() => {
            toggleGameWonModal();
          }, 1000);
          return;
        }

        checkForDraw(newBoard);

        !gameWinner && gameState.setTurn(getNextTurn(gameState.turn));
      }, Math.floor(Math.random() * (1000 - 500 + 1)) + 500); // .5 - 1 second delay (thinking)
    }
  }, [gameState.board, gameState.turn, gameState.gameActive, gameState.winner]);

  return (
    <GameLayout
      turn={gameState.turn}
      board={gameState.board}
      winningLine={gameState.winningLine}
      xWinCount={gameState.xWinCount}
      oWinCount={gameState.oWinCount}
      catWinCount={gameState.catWinCount}
      winner={gameState.winner}
      handleClick={handleClick}
      toggleResetModal={toggleResetModal}
      toggleGameWonModal={toggleGameWonModal}
      restart={gameState.restart}
      startNewMatch={gameState.startNewMatch}
      gameWonModalRef={gameWonModalRef}
      resetModalRef={resetModalRef}
    />
  );
};

export default GameVsComputer;
