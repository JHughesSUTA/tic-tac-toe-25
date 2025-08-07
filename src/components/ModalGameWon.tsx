import { forwardRef } from "react";
import "../components/Modals.scss";
import OSolid from "./icons/OSolid";
import XSolid from "./icons/XSolid";
import type { Winner } from "../types";
import { useGame } from "../contexts/GameContext";

type ModalGameWonProps = {
  toggleGameWonModal: () => void;
  startNewMatch: () => void;
  winner: Winner;
};

const ModalGameWon = forwardRef<HTMLDialogElement, ModalGameWonProps>(
  (props, ref) => {
    const { resetGame, gameType, playerOne } = useGame();

    const handleNextRoundClick = () => {
      props.toggleGameWonModal();
      props.startNewMatch();
    };

    const messageColor =
      props.winner === "x"
        ? "#31c3bd"
        : props.winner === "o"
        ? "#f2b137"
        : "#a8bfc9";

    const getXWinMessage = () => {
      if (gameType === "single-player") {
        // Single-player mode
        if (playerOne === "x") {
          // If X wins, player one is X, and gameType is Single Player
          return (
            <>
              <p>You won!</p>
              <h2 id="modal-heading" style={{ color: messageColor }}>
                <XSolid size="64" /> takes the round
              </h2>
            </>
          );
        } else {
          // If X wins, player one is O, and gameType is Single Player
          return (
            <>
              <p>Oh no, you lost ...</p>
              <h2 id="modal-heading" style={{ color: messageColor }}>
                <XSolid size="64" /> takes the round
              </h2>
            </>
          );
        }
      } else {
        // Two-player mode
        if (playerOne === "x") {
          // If X wins, player one is X, and gameType is Two Players
          return (
            <>
              <p>Player 1 wins!</p>
              <h2 id="modal-heading" style={{ color: messageColor }}>
                <XSolid size="64" /> takes the round
              </h2>
            </>
          );
        } else {
          // If X wins, player one is O, and gameType is Two Player
          return (
            <>
              <p>Player 2 wins!</p>
              <h2 id="modal-heading" style={{ color: messageColor }}>
                <XSolid size="64" /> takes the round
              </h2>
            </>
          );
        }
      }
    };

    const getOWinMessage = () => {
      if (gameType === "single-player") {
        // Single-player mode
        if (playerOne === "x") {
          // If O wins, player one is X, and gameType is Single Player
          return (
            <>
              <p>Oh no, you lost ...</p>
              <h2 style={{ color: messageColor }}>
                <OSolid size="64" /> takes the round
              </h2>
            </>
          );
        } else {
          // If O wins, player one is O, and gameType is Single Player
          return (
            <>
              <p>You won!</p>
              <h2 style={{ color: messageColor }}>
                <OSolid size="64" /> takes the round
              </h2>
            </>
          );
        }
      } else {
        // Two-player mode
        if (playerOne === "x") {
          // If O wins, player one is X, and gameType is Two Players
          return (
            <>
              <p>Player 2 wins!</p>
              <h2 style={{ color: messageColor }}>
                <OSolid size="64" /> takes the round
              </h2>
            </>
          );
        } else {
          // If O wins, player one is O, and gameType is Two Players
          return (
            <>
              <p>Player 1 wins!</p>
              <h2 style={{ color: messageColor }}>
                <OSolid size="64" /> takes the round
              </h2>
            </>
          );
        }
      }
    };

    const tieMessage = <h2>Round tied</h2>;

    return (
      <dialog
        ref={ref}
        className={`modal ${
          props.winner === "tie" ? "modal--tie" : "modal--game-won"
        }`}
        id="modal"
        role="dialog"
        aria-labelledby="modal__heading"
      >
        {props.winner === "x" && getXWinMessage()}
        {props.winner === "o" && getOWinMessage()}
        {props.winner === "tie" && tieMessage}
        <div className="modal__button-container">
          <button
            className="modal__quit-button"
            onClick={resetGame}
            aria-label="Quit game"
          >
            Quit
          </button>
          <button
            className="modal__next-round-button"
            onClick={handleNextRoundClick}
            aria-label="Next round"
          >
            Next Round
          </button>
        </div>
      </dialog>
    );
  }
);

ModalGameWon.displayName = "ModalGameWon";

export default ModalGameWon;
