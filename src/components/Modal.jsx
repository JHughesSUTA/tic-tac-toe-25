import { forwardRef } from "react";
import PropTypes from "prop-types";

const Modal = forwardRef((props, ref) => (
  <dialog ref={ref} className="modal" id="">
    <p>You lost</p>
    <h2>XXX takes the round</h2>
    <div className="button-container">
      <button onClick={props.toggleModal}>Quit</button>
      <button onClick={props.toggleModal}>Next Round</button>
    </div>
    {props.children}
  </dialog>
));

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
