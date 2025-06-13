import { forwardRef } from "react";
import PropTypes from "prop-types";
import "../components/Modals.scss";

const ModalGameWon = forwardRef((props, ref) => {
  const handleNextRoundClick = () => {
    props.toggleGameWonModal();
    props.startNewMatch();
  };

  return (
    <dialog ref={ref} className="modal modal--game-won" id="">
      <p>You lost</p>
      <h2>XXX takes the round</h2>
      <div className="modal__button-container">
        <button className="modal__quit-button" onClick={props.resetGame}>
          Quit
        </button>
        <button className="modal__next-round-button" onClick={handleNextRoundClick}>
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
};

export default ModalGameWon;
