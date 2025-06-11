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

const GameVsPlayer = () => {
  const [board, setBoard] = useState(startingBoard);
  const [gameActive, setGameActive] = useState(true);
  const [turn, setTurn] = useState("x");
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [catWins, setCatWins] = useState(0);

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
    <>
      <div>{`${turn}'s turn`}</div>
      <div id="board">
        {board.map((cell, i) => (
          <button className="cell" key={i} onClick={() => handleClick(i)}>
            {cell}
          </button>
        ))}
      </div>
      <button
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "10px",
        }}
      >
        Reset
      </button>
      <div
        className="info"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "50px",
        }}
      >
        <div className="x-wins">{`X wins: ${xWins}`}</div>
        <div className="cat-wins">{`Cat wins: ${catWins}`}</div>
        <div className="o-wins">{`O wins: ${oWins}`}</div>
      </div>
    </>
  );
};

export default GameVsPlayer;
