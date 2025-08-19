import "../components/GameHeader.scss";
import logo from "../assets/images/logo.png";
import XSolid from "./icons/XSolid";
import OSolid from "./icons/OSolid";
import Reset from "./icons/Reset";
import type { Player } from "../types";
import { useGameMode } from "../contexts/GameModeContext";

type GameHeaderProps = {
  turn: Player;
  toggleResetModal: () => void;
};

const GameHeader = ({ turn, toggleResetModal }: GameHeaderProps) => {
  const { resetGame } = useGameMode();
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

export default GameHeader;
