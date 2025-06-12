import PropTypes from "prop-types";
import logo from "../assets/images/logo.png";
import XSolid from "./icons/XSolid";
import OSolid from "./icons/OSolid";
import "../components/Menu.scss";

const Menu = ({ setGameSelected, setGameType }) => {
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
          <button>
            <XSolid size="32" color="#1a2a33" />
          </button>
          <button>
            <OSolid size="32" color="#1a2a33" />
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
};
