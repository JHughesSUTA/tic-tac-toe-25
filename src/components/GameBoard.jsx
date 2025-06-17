import "../components/GameBoard.scss";
import OSolid from "../components/icons/OSolid";
import XSolid from "../components/icons/XSolid";
import PropTypes from "prop-types";
import XOutline from "./icons/XOutline";
import OOutline from "./icons/OOutline";

const GameBoard = ({ board, handleClick, turn, playerOne, gameType }) => {
  console.log(gameType);
  return (
    <section id="board">
      {board.map((cell, i) => {
        const showPreview =
          cell === null &&
          (gameType === "two-player" ||
            (gameType === "single-player" && turn === playerOne));

        return (
          <button className="cell" key={i} onClick={() => handleClick(i)}>
            {cell === "x" ? <XSolid /> : cell === "o" ? <OSolid /> : null}
            {showPreview && (
              <span className="cell--preview">
                {turn === "x" ? <XOutline /> : <OOutline />}
              </span>
            )}
          </button>
        );
      })}
    </section>
  );
};

export default GameBoard;

GameBoard.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  turn: PropTypes.string.isRequired,
  playerOne: PropTypes.string,
  gameType: PropTypes.string,
};
