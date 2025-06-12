import logo from "../assets/images/logo.png";
import PropTypes from "prop-types";
import XSolid from "./icons/XSolid";
import OSolid from "./icons/OSolid";
import Reset from "./icons/Reset";
import "../components/GameHeader.scss";

const GameHeader = ({ turn }) => {
  return (
    <header className="header">
      <img
        className="header__logo logo"
        src={logo}
        alt=""
        width="72"
        height="32"
      />
      <div className="header__turn-display">
        {turn === "x" ? (
          <XSolid size="16" color="#A8BFC9" />
        ) : (
          <OSolid size="16" color="#A8BFC9" />
        )}{" "}
        turn
      </div>
      <button className="header__reset" aria-label="Reset Game">
        <Reset size="15.4" />
      </button>
    </header>
  );
};

export default GameHeader;

GameHeader.propTypes = {
  turn: PropTypes.string.isRequired,
};
