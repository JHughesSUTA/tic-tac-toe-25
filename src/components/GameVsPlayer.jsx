import { useState } from "react";
import GameHeader from "./GameHeader";
import GameBoard from "./GameBoard";
import GameFooter from "./GameFooter";
import "../components/Game.scss";

const startingBoard = [null, null, null, null, null, null, null, null, null];
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

const checkForWinner = (board) => {
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

const GameVsPlayer = () => {
  const [board, setBoard] = useState(startingBoard);
  const [gameActive, setGameActive] = useState(true);
  const [turn, setTurn] = useState("x");
  const [xWinCount, setXWinCount] = useState(0);
  const [oWinCount, setOWinCount] = useState(0);
  const [catWinCount, setCatWinCount] = useState(0);

  const handleClick = (i) => {
    if (!gameActive || board[i]) return;

    const newBoard = board.map((cell, index) => (index === i ? turn : cell));
    const winner = checkForWinner(newBoard);

    setBoard(newBoard);

    if (winner) {
      console.log(`${winner} wins!`);
      setGameActive(false);
      return;
    }

    if (newBoard.every((cell) => cell !== null)) {
      console.log("The cat won!! ... meow");
      setGameActive(false);
      return;
    }

    setTurn(turn === "x" ? "o" : "x");
  };

  return (
    <main>
      <GameHeader turn={turn} />
      <GameBoard board={board} handleClick={handleClick} />
      <GameFooter
        xWinCount={xWinCount}
        oWinCount={oWinCount}
        catWinCount={catWinCount}
      />
    </main>
  );
};

export default GameVsPlayer;
