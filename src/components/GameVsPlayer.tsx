import { useEffect } from "react";
import type { RefObject } from "react";
import { useGameState } from "../hooks/useGameState";
import { useSafeTimeout } from "../hooks/useSafeTimeout";
import GameLayout from "./GameLayout";
import {
  startingBoard,
  checkForWinner,
  getNextTurn,
  makeMove,
} from "../utils/gameUtils";

type GameVsPlayerProps = {
  toggleGameWonModal: () => void;
  gameWonModalRef: RefObject<HTMLDialogElement | null>;
  toggleResetModal: () => void;
  resetModalRef: RefObject<HTMLDialogElement | null>;
};

const GameVsPlayer = ({
  toggleGameWonModal,
  gameWonModalRef,
  toggleResetModal,
  resetModalRef,
}: GameVsPlayerProps) => {
  const gameState = useGameState("vsPlayer_");

  const { setSafeTimeout } = useSafeTimeout();

  useEffect(() => {
    if (
      gameState.winner &&
      gameState.isGameWonModalOpen &&
      gameWonModalRef.current
    ) {
      gameWonModalRef.current.showModal();
    }
  }, []);

  const handleClick = (i: number) => {
    if (!gameState.gameActive || gameState.board[i]) return;

    const newBoard = makeMove(gameState.board, i, gameState.turn);

    const { winner: gameWinner, line: winLine } = checkForWinner(newBoard);

    gameState.setBoard(newBoard);

    if (gameWinner) {
      gameState.setGameActive(false);
      gameState.setWinner(gameWinner);
      gameState.setIsGameWonModalOpen(true);
      gameState.setWinningLine(winLine);

      if (gameWinner === "x") {
        gameState.setXWinCount((prev) => prev + 1);
      } else if (gameWinner === "o") {
        gameState.setOWinCount((prev) => prev + 1);
      }
      setSafeTimeout(() => {
        toggleGameWonModal();
      }, 1000);
    } else if (newBoard.every((cell) => cell !== null)) {
      console.log("The cat won!! ... meow");
      gameState.setGameActive(false);
      gameState.setWinner("tie");
      gameState.setIsGameWonModalOpen(true);
      gameState.setCatWinCount((prev) => prev + 1);
      setSafeTimeout(() => {
        toggleGameWonModal();
      }, 1000);
      return;
    }

    !gameWinner && gameState.setTurn(getNextTurn(gameState.turn));
  };

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

export default GameVsPlayer;
