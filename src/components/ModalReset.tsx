import { forwardRef } from "react";
import "../components/Modals.scss";

type ModalResetProps = {
  toggleResetModal: () => void;
  restart: () => void;
  // children?: ReactNode;
};

const ModalReset = forwardRef<HTMLDialogElement, ModalResetProps>(
  (props, ref) => {
    return (
      <dialog ref={ref} className="modal modal--reset" id="">
        <h2>Restart game?</h2>
        <div className="modal__button-container">
          <button
            className="modal__cancel-button"
            onClick={props.toggleResetModal}
            aria-label="Cancel"
          >
            No, Cancel
          </button>
          <button
            className="modal__restart-button"
            onClick={() => {
              props.restart();
              props.toggleResetModal();
            }}
            aria-label="Restart game"
          >
            Yes, restart
          </button>
        </div>
        {/* {props.children} */}
      </dialog>
    );
  }
);

ModalReset.displayName = "ModalReset";

export default ModalReset;
