import PropTypes from "prop-types";
import logo from "../assets/images/logo.png";
import XSolid from "./icons/XSolid";
import OSolid from "./icons/OSolid";
import "../components/Menu.scss";

const Menu = ({ setGameSelected, setGameType, playerOne, setPlayerOne }) => {
  const handleClick = (selectedType) => {
    setGameSelected(true);
    setGameType(selectedType);
  };

  return (
    <main className="menu container">
      <img
        className="menu__logo logo"
        src={logo}
        alt=""
        width="72"
        height="32"
      />
      <div className="menu__player-selection">
        <h1>Pick player 1's mark</h1>
        <div className="menu__player-selection__button-container">
          <button
            onClick={() => setPlayerOne("x")}
            className={`menu__choice-button ${playerOne === "x" && "selected"}`}
            id="x-choice-button"
          >
            <XSolid size="32" />
          </button>
          <button
            onClick={() => setPlayerOne("o")}
            className={`menu__choice-button ${playerOne === "o" && "selected"}`}
            id="o-choice-button"
          >
            <OSolid size="32" />
          </button>
        </div>
        <p>Remember: X goes first</p>
      </div>
      <div className="menu__button-container">
        <button
          onClick={() => handleClick("single-player")}
          className="menu__button--single-player"
        >
          New game (vs CPU)
        </button>
        <button
          onClick={() => handleClick("two-player")}
          className="menu__button--two-player"
        >
          New game (vs player)
        </button>
      </div>
    </main>
  );
};

export default Menu;

Menu.propTypes = {
  setGameSelected: PropTypes.func.isRequired,
  setGameType: PropTypes.func.isRequired,
  gameType: PropTypes.string,
  playerOne: PropTypes.string.isRequired,
};
