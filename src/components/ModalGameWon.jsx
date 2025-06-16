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

  const color =
    props.winner === "x"
      ? "#31c3bd"
      : props.winner === "o"
      ? "#f2b137"
      : "#a8bfc9";

  const xWinMessage = (
    <>
      <p>Player 1 wins!</p>
      <h2 style={{ color: color }}>
        <XSolid size="28" /> takes the round
      </h2>
    </>
  );

  const oWinMessage = (
    <>
      <p>Player 2 wins!</p>
      <h2 style={{ color: color }}>
        <OSolid size="30" /> takes the round
      </h2>
    </>
  );

  const tieMessage = <h2>Round tied</h2>;

  return (
    <dialog
      ref={ref}
      className={`modal ${
        props.winner === "tie" ? "modal--tie" : "modal--game-won"
      }`}
      id="modal"
    >
      {props.winner === "x" && xWinMessage}
      {props.winner === "o" && oWinMessage}
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
};

export default ModalGameWon;
