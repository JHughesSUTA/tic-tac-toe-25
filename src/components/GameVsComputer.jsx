import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import GameHeader from "./GameHeader";
import GameBoard from "./GameBoard";
import GameFooter from "./GameFooter";

const startingBoard = Array(9).fill(null);
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

const GameVsComputer = () => {
  const [board, setBoard] = useState(startingBoard);
  const [gameActive, setGameActive] = useState(true);
  const [turn, setTurn] = useState("x");
  const [xWinCount, setXWinCount] = useState(0);
  const [oWinCount, setOWinCount] = useState(0);
  const [catWinCount, setCatWinCount] = useState(0);

  const checkForDraw = (board) => {
    if (board.every((cell) => cell !== null)) {
      console.log("The cat won!! ... meow");
      setGameActive(false);
      return;
    }
  };

  const handleClick = (i) => {
    // only allow click if game is active and cell clicked is empty
    if (!gameActive || board[i]) return;

    // create copy of the new board and check if it's a winner
    const newBoard = board.map((cell, index) => (index === i ? turn : cell));
    const winner = checkForWinner(newBoard);

    setBoard(newBoard);

    if (winner) {
      console.log(`${winner} wins!`);
      setGameActive(false);
      return;
    }

    checkForDraw(newBoard);

    setTurn("o");
  };

  useEffect(() => {
    if (turn === "o" && gameActive) {
      const timer = setTimeout(() => {
        let move = null;

        for (const line of lines) {
          const [a, b, c] = line;
          const values = [board[a], board[b], board[c]];

          const twoOOneNull =
            (values[0] === values[1] &&
              values[0] === "o" &&
              values[2] === null) ||
            (values[0] === values[2] &&
              values[0] === "o" &&
              values[1] === null) ||
            (values[1] === values[2] &&
              values[1] === "o" &&
              values[0] === null);

          const twoXOneNull =
            (values[0] === values[1] &&
              values[0] === "x" &&
              values[2] === null) ||
            (values[0] === values[2] &&
              values[0] === "x" &&
              values[1] === null) ||
            (values[1] === values[2] &&
              values[1] === "x" &&
              values[0] === null);

          if (twoOOneNull) {
            move = [a, b, c][values.indexOf(null)];
            break;
          } else if (twoXOneNull && move === null) {
            move = [a, b, c][values.indexOf(null)];
          }
        }

        if (move === null) {
          const emptyCells = [];
          for (let i = 0; i < 9; i++) {
            if (!board[i]) emptyCells.push(i);
          }
          if (emptyCells.length === 0) return;
          move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }

        const newBoard = board.map((cell, index) =>
          index === move ? "o" : cell
        );
        const winner = checkForWinner(newBoard);

        setBoard(newBoard);

        if (winner) {
          setGameActive(false);
          return;
        }

        checkForDraw(newBoard);

        setTurn("x");
      }, 600); // 600ms delay

      return () => clearTimeout(timer);
    }
  }, [board, turn, gameActive]);

  return (
    <main className="container">
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

export default GameVsComputer;
