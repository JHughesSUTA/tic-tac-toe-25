import "../components/GameBoard.scss";
import OSolid from "./icons/OSolid";
import XSolid from "./icons/XSolid";
import XOutline from "./icons/XOutline";
import OOutline from "./icons/OOutline";
import type { Player } from "../types";
import { useGame } from "../contexts/GameContext";

type GameBoardProps = {
  board: (Player | null)[];
  handleClick: (i: number) => void;
  turn: Player;
  winningLine?: number[];
};

const GameBoard = ({
  board,
  handleClick,
  turn,
  winningLine,
}: GameBoardProps) => {
  const { gameType, playerOne } = useGame();

  return (
    <section id="board">
      {board.map((cell, i) => {
        const showPreview =
          cell === null &&
          (gameType === "two-player" ||
            (gameType === "single-player" && turn === playerOne));

        return (
          <button
            className={`cell ${
              winningLine && winningLine.includes(i)
                ? `cell--winner-${board[i]}`
                : ""
            }`}
            tabIndex={cell ? -1 : 0}
            aria-disabled={cell ? "true" : "false"}
            key={i}
            onClick={() => handleClick(i)}
          >
            {cell === "x" ? <XSolid /> : cell === "o" ? <OSolid /> : null}
            {showPreview && (
              <span className="cell--preview">
                {turn === "x" ? <XOutline /> : <OOutline />}
              </span>
            )}
          </button>
        );
      })}
    </section>
  );
};

export default GameBoard;
