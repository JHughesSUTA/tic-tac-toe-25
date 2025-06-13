import { forwardRef } from "react";
import PropTypes from "prop-types";

const ModalReset = forwardRef((props, ref) => {
  return (
    <dialog ref={ref} className="modal" id="">
      <h2>Restart game?</h2>
      <div className="button-container">
        <button onClick={props.toggleResetModal}>No, Cancel</button>
        <button onClick={props.resetGame}>Yes, restart</button>
      </div>
      {props.children}
    </dialog>
  );
});

ModalReset.propTypes = {
  toggleResetModal: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default ModalReset;
