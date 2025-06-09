import "../components/Game.scss";
import { useState } from "react";

const startingBoard = [null, null, null, null, null, null, null, null, null];

const Game = () => {
  const [turn, setTurn] = useState("x");
  const [board, setBoard] = useState(startingBoard);

  const handleClick = (i) => {
    setTurn((prevTurn) => (prevTurn === "x" ? "o" : "x"));

    const newBoard = board.slice();

    newBoard[i] = turn;

    setBoard(newBoard);
  };

  return (
    <div id="board">
      {board.map((cell, i) => (
        <button className="cell" key={i} onClick={() => handleClick(i)}>
          {cell}
        </button>
      ))}
    </div>
  );
};

export default Game;
