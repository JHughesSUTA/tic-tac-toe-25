import { useEffect, useState } from "react";
import "../components/Game.scss";

const startingBoard = [null, null, null, null, null, null, null, null, null];

const GameVsComputer = () => {
  const [board, setBoard] = useState(startingBoard);
  const [gameActive, setGameActive] = useState(true);
  const [turn, setTurn] = useState("x");

  const handleClick = (i) => {
    if (!gameActive) return;
    setBoard(board.map((cell, index) => (index === i ? turn : cell)));
    setTurn(turn === "x" ? "o" : "x");
  };

  const checkForWinner = () => {
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

    // loop through lines
    for (const line of lines) {
      // assign each index of the current array to a variable
      const [a, b, c] = line;
      // check against board if it's a winner
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  useEffect(() => {
    if (turn === "o" && gameActive) {
      // Computer's move logic here
      // Pick a random empty cell
      const emptyCells = [];
      for (let i = 0; i < 9; i++) {
        if (!board[i]) emptyCells.push(i);
      }
      if (emptyCells.length === 0) return;
      const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      setBoard(board.map((cell, index) => (index === move ? "o" : cell)));
      setTurn("x");
    }

    const winner = checkForWinner();

    if (winner) {
      console.log(`${winner} wins!`);
      setGameActive(false);
    }
  }, [board, turn, gameActive]);

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

export default GameVsComputer;
