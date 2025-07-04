import logo from "../assets/images/logo.png";
import XSolid from "./icons/XSolid";
import OSolid from "./icons/OSolid";
import "../components/Menu.scss";
import type { GameType, Player } from "../types";

type MenuProps = {
  setGameSelected: (selected: boolean) => void;
  setGameType: (type: GameType) => void;
  playerOne?: Player;
  setPlayerOne: (player: Player) => void;
};

const Menu = ({
  setGameSelected,
  setGameType,
  playerOne,
  setPlayerOne,
}: MenuProps) => {
  const handleClick = (selectedType: GameType) => {
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
        <legend>Pick player 1's mark</legend>
        <div className="menu__player-selection__button-container">
          <button
            id="x-choice-button"
            onClick={() => setPlayerOne("x")}
            className={`menu__choice-button ${playerOne === "x" && "selected"}`}
            aria-label="Select X marker"
            aria-pressed={playerOne === "x"}
          >
            <XSolid size="32" />
          </button>
          <button
            id="o-choice-button"
            onClick={() => setPlayerOne("o")}
            className={`menu__choice-button ${playerOne === "o" && "selected"}`}
            aria-label="Select O marker"
            aria-pressed={playerOne === "o"}
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
          aria-label="New game vs CPU"
        >
          New game (vs CPU)
        </button>
        <button
          onClick={() => handleClick("two-player")}
          className="menu__button--two-player"
          aria-label="New game vs other player"
        >
          New game (vs player)
        </button>
      </div>
    </main>
  );
};

export default Menu;
