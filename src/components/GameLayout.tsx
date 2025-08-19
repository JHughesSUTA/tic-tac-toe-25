import type { RefObject } from "react";
import GameHeader from "./GameHeader";
import GameBoard from "./GameBoard";
import GameFooter from "./GameFooter";
import ModalGameWon from "./ModalGameWon";
import ModalReset from "./ModalReset";
import type { Board, Player } from "../types";

type GameLayoutProps = {
  turn: Player;
  board: Board;
  winningLine: number[];
  xWinCount: number;
  oWinCount: number;
  catWinCount: number;
  winner: Player | "tie" | null;
  handleClick: (i: number) => void;
  toggleResetModal: () => void;
  toggleGameWonModal: () => void;
  startNewMatch: () => void;
  restart: () => void;
  gameWonModalRef: RefObject<HTMLDialogElement | null>;
  resetModalRef: RefObject<HTMLDialogElement | null>;
};

const GameLayout = ({
  turn,
  board,
  winningLine,
  xWinCount,
  oWinCount,
  catWinCount,
  winner,
  handleClick,
  toggleResetModal,
  toggleGameWonModal,
  startNewMatch,
  restart,
  gameWonModalRef,
  resetModalRef,
}: GameLayoutProps) => {
  const handleStartNewMatch = () => {
    startNewMatch();

    if (gameWonModalRef.current?.open) {
      gameWonModalRef.current.close();
    }
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
        startNewMatch={handleStartNewMatch}
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

export default GameLayout;
