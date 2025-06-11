import { useEffect, useState } from "react";
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
      let move = null;

      // Computer's move logic here
      // find line where there user needs one more square to win
      for (const line of lines) {
        const [a, b, c] = line;
        const twoSameOneEmpty =
          (board[a] === board[b] && board[a] !== null && board[c] === null) ||
          (board[a] === board[c] && board[a] !== null && board[b] === null) ||
          (board[b] === board[c] && board[b] !== null && board[a] === null);

        if (twoSameOneEmpty && [board[a], board[b], board[c]].includes("o")) {
          const options = {
            [a]: board[a],
            [b]: board[b],
            [c]: board[c],
          };

          move = Number(
            Object.keys(options).find((key) => options[key] === null)
          );
          console.log(`Calculated Winning Move: ${move}`);
        }
      }

      if (!move) {
        for (const line of lines) {
          const [a, b, c] = line;
          const twoSameOneEmpty =
            (board[a] === board[b] && board[a] !== null && board[c] === null) ||
            (board[a] === board[c] && board[a] !== null && board[b] === null) ||
            (board[b] === board[c] && board[b] !== null && board[a] === null);

          if (twoSameOneEmpty) {
            const options = {
              [a]: board[a],
              [b]: board[b],
              [c]: board[c],
            };

            move = Number(
              Object.keys(options).find((key) => options[key] === null)
            );
            console.log(`Calculated Blocking Move: ${move}`);
          }
        }
      }

      // Pick a random empty cell
      if (!move) {
        const emptyCells = [];
        for (let i = 0; i < 9; i++) {
          if (!board[i]) emptyCells.push(i);
        }
        if (emptyCells.length === 0) return;
        move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        console.log(`random move: ${move}`);
      }

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
