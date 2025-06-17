import { forwardRef } from "react";
import PropTypes from "prop-types";
import "../components/Modals.scss";
import OSolid from "./icons/OSolid";
import XSolid from "./icons/XSolid";

const ModalGameWon = forwardRef((props, ref) => {
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
    if (props.gameType === "single-player") {
      // Single-player mode
      if (props.playerOne === "x") {
        // If X wins, player one is X, and gameType is Single Player
        return (
          <>
            <p>You won!</p>
            <h2 style={{ color: messageColor }}>
              <XSolid size="64" /> takes the round
            </h2>
          </>
        );
      } else {
        // If X wins, player one is O, and gameType is Single Player
        return (
          <>
            <p>Oh no, you lost ...</p>
            <h2 style={{ color: messageColor }}>
              <XSolid size="64" /> takes the round
            </h2>
          </>
        );
      }
    } else {
      // Two-player mode
      if (props.playerOne === "x") {
        // If X wins, player one is X, and gameType is Two Players
        return (
          <>
            <p>Player 1 wins!</p>
            <h2 style={{ color: messageColor }}>
              <XSolid size="64" /> takes the round
            </h2>
          </>
        );
      } else {
        // If X wins, player one is O, and gameType is Two Player
        return (
          <>
            <p>Player 2 wins!</p>
            <h2 style={{ color: messageColor }}>
              <XSolid size="64" /> takes the round
            </h2>
          </>
        );
      }
    }
  };

  const getOWinMessage = () => {
    if (props.gameType === "single-player") {
      // Single-player mode
      if (props.playerOne === "x") {
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
      if (props.playerOne === "x") {
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
    >
      {props.winner === "x" && getXWinMessage()}
      {props.winner === "o" && getOWinMessage()}
      {props.winner === "tie" && tieMessage}
      <div className="modal__button-container">
        <button className="modal__quit-button" onClick={props.resetGame}>
          Quit
        </button>
        <button
          className="modal__next-round-button"
          onClick={handleNextRoundClick}
        >
          Next Round
        </button>
      </div>
      {props.children}
    </dialog>
  );
});

ModalGameWon.propTypes = {
  toggleGameWonModal: PropTypes.func.isRequired,
  startNewMatch: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  children: PropTypes.node,
  winner: PropTypes.string.isRequired,
  gameType: PropTypes.string.isRequired,
  playerOne: PropTypes.string.isRequired,
};

export default ModalGameWon;
