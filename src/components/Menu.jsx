import logo from "../assets/images/logo.png";
import XSolid from "./icons/XSolid";
import OSolid from "./icons/OSolid";
import "../components/Menu.scss";

const Menu = () => {
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
        <button className="menu__button--cpu">New game (vs CPU)</button>
        <button className="menu__button--player">New game (vs player)</button>
      </div>
    </main>
  );
};

export default Menu;
