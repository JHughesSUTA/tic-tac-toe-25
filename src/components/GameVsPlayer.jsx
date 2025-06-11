import "../components/Game.scss";
import { useState, useEffect } from "react";

const startingBoard = [null, null, null, null, null, null, null, null, null];

const GameVsPlayer = () => {
  const [turn, setTurn] = useState("x");
  const [board, setBoard] = useState(startingBoard);
  const [gameActive, setGameActive] = useState(true);

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
    if (board[i]) return;
    setTurn((prevTurn) => (prevTurn === "x" ? "o" : "x"));
    const newBoard = board.slice();
    newBoard[i] = turn;
    setBoard(newBoard);
  };

  // const computeTurn = () => {
  //   const newBoard = board.slice().map((cell) => cell !== null);

  //   return newBoard;
  // };

  useEffect(() => {
    let winnerFound = false;

    lines.forEach((line) => {
      if (
        board[line[0]] &&
        board[line[0]] === board[line[1]] &&
        board[line[0]] === board[line[2]]
      ) {
        window.alert("WINNER WINNER CHICKEN DINNER");
        resetBoard();
        winnerFound = true;
      }

      if (!winnerFound && board.every((cell) => cell !== null)) {
        window.alert("IT'S A DRAW!");

        resetBoard();
        winnerFound = true;
      }
    });

    // console.log(computeTurn());
  }, [board]);

  return (
    <>
      <p>{`${turn}'s turn`}</p>
      <div id="board">
        {board.map((cell, i) => (
          <button className="cell" key={i} onClick={() => handleClick(i)}>
            {cell}
          </button>
        ))}
      </div>
    </>
  );
};

export default GameVsPlayer;
