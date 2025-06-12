import "../components/GameBoard.scss";
import XSolid from "../components/icons/XSolid";
import OSolid from "../components/icons/OSolid";
import PropTypes from "prop-types";

const GameBoard = ({ board, handleClick }) => {
  return (
    <section id="board">
      {board.map((cell, i) => (
        <button className="cell" key={i} onClick={() => handleClick(i)}>
          {cell === "x" ? <XSolid /> : cell === "o" ? <OSolid /> : null}
        </button>
      ))}
    </section>
  );
};

export default GameBoard;

GameBoard.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
};
