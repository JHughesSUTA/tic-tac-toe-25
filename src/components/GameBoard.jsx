import React from "react";

const GameBoard = ({ board, handleClick }) => {
  return (
    <section id="board">
      {board.map((cell, i) => (
        <button className="cell" key={i} onClick={() => handleClick(i)}>
          {cell}
        </button>
      ))}
    </section>
  );
};

export default GameBoard;
