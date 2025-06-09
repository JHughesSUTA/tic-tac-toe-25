import "../components/Game.scss";
import { useState, useEffect } from "react";

const startingBoard = [null, null, null, null, null, null, null, null, null];

const Game = () => {
  const [turn, setTurn] = useState("x");
  const [board, setBoard] = useState(startingBoard);
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const resetBoard = () => {
    setBoard(startingBoard);
    setTurn("x");
  };

  const handleClick = (i) => {
    setTurn((prevTurn) => (prevTurn === "x" ? "o" : "x"));
    const newBoard = board.slice();
    newBoard[i] = turn;
    setBoard(newBoard);
  };

  useEffect(() => {
    lines.forEach((line) => {
      if (
        board[line[0]] &&
        board[line[0]] === board[line[1]] &&
        board[line[0]] === board[line[2]]
      ) {
        window.alert("WINNER WINNER CHICKEN DINNER");

        resetBoard();
      }
    });
  }, [board]);

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
