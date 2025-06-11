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
      let move = null;

      for (const line of lines) {
        const [a, b, c] = line;
        // get an array of the values of the current line being checked
        const values = [board[a], board[b], board[c]];

        // Check if there's a winning move
        const twoOOneNull =
          (values[0] === values[1] &&
            values[0] === "o" &&
            values[2] === null) ||
          (values[0] === values[2] &&
            values[0] === "o" &&
            values[1] === null) ||
          (values[1] === values[2] && values[1] === "o" && values[0] === null);

        // Check if there's a blocking move
        const twoXOneNull =
          (values[0] === values[1] &&
            values[0] === "x" &&
            values[2] === null) ||
          (values[0] === values[2] &&
            values[0] === "x" &&
            values[1] === null) ||
          (values[1] === values[2] && values[1] === "x" && values[0] === null);

        if (twoOOneNull) {
          move = [a, b, c][values.indexOf(null)];
          console.log(`Calculated Winning Move: ${move}`);
          break; // Always take the win if possible
        } else if (twoXOneNull && move === null) {
          move = [a, b, c][values.indexOf(null)];
          console.log(`Calculated Blocking Move: ${move}`);
          // Don't break; keep looking for a winning move
        }
      }

      // Pick a random empty cell if no winning or blocking moves
      if (move === null) {
        const emptyCells = [];
        for (let i = 0; i < 9; i++) {
          if (!board[i]) emptyCells.push(i);
        }
        if (emptyCells.length === 0) return;
        move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        console.log(`random move: ${move}`);
      }

      const newBoard = board.map((cell, index) =>
        index === move ? "o" : cell
      );
      const winner = checkForWinner(newBoard);

      setBoard(newBoard);

      if (winner) {
        console.log(`${winner} wins!`);
        setGameActive(false);
        return;
      }

      // check for draw
      checkForDraw(newBoard);

      setTurn("x");
    }
  }, [board, turn, gameActive]);

  return (
    <>
      <div>{`${turn}'s turn`}</div>
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

export default GameVsComputer;
