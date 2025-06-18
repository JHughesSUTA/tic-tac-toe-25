import logo from "../assets/images/logo.png";
import PropTypes from "prop-types";
import XSolid from "./icons/XSolid";
import OSolid from "./icons/OSolid";
import Reset from "./icons/Reset";
import "../components/GameHeader.scss";

const GameHeader = ({ turn, toggleResetModal, resetGame }) => {
  return (
    <header className="header">
      <button
        onClick={resetGame}
        className="header__menu"
        aria-label="Back to menu"
      >
        <img
          className="header__logo logo"
          src={logo}
          alt=""
          width="72"
          height="32"
        />
      </button>
      <div className="header__turn-display">
        {turn === "x" ? (
          <XSolid size="20" color="#A8BFC9" />
        ) : (
          <OSolid size="20" color="#A8BFC9" />
        )}{" "}
        turn
      </div>
      <button
        onClick={toggleResetModal}
        className="header__restart"
        aria-label="Restart Game"
      >
        <Reset size="20px" />
      </button>
    </header>
  );
};

GameHeader.propTypes = {
  turn: PropTypes.string.isRequired,
  resetGame: PropTypes.func.isRequired,
};

export default GameHeader;
