import { useState } from "react";
import GameHeader from "./GameHeader";
import GameBoard from "./GameBoard";
import GameFooter from "./GameFooter";
import PropTypes from "prop-types";
import ModalGameWon from "./ModalGameWon";
import ModalReset from "./ModalReset";

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

const GameVsPlayer = ({
  resetGame,
  toggleGameWonModal,
  gameWonModalRef,
  toggleResetModal,
  resetModalRef,
}) => {
  const [board, setBoard] = useState(startingBoard);
  const [gameActive, setGameActive] = useState(true);
  const [turn, setTurn] = useState("x");
  const [xWinCount, setXWinCount] = useState(0);
  const [oWinCount, setOWinCount] = useState(0);
  const [catWinCount, setCatWinCount] = useState(0);

  const startNewMatch = () => {
    setBoard(startingBoard);
    setGameActive(true);
    setTurn("x");
  };

  const handleClick = (i) => {
    if (!gameActive || board[i]) return;

    const newBoard = board.map((cell, index) => (index === i ? turn : cell));
    const winner = checkForWinner(newBoard);

    setBoard(newBoard);

    if (winner) {
      console.log(`${winner} wins!`);
      setGameActive(false);

      if (winner === "x") {
        setXWinCount((prev) => prev + 1);
      } else {
        setOWinCount((prev) => prev + 1);
      }
      toggleGameWonModal();
    }

    if (newBoard.every((cell) => cell !== null)) {
      console.log("The cat won!! ... meow");
      setGameActive(false);
      setCatWinCount((prev) => prev + 1);
      toggleGameWonModal();
      return;
    }

    setTurn(turn === "x" ? "o" : "x");
  };

  return (
    <main className="container">
      <GameHeader
        turn={turn}
        resetGame={resetGame}
        toggleGameWonModal={toggleGameWonModal}
        toggleResetModal={toggleResetModal}
      />
      <GameBoard board={board} handleClick={handleClick} />
      <GameFooter
        xWinCount={xWinCount}
        oWinCount={oWinCount}
        catWinCount={catWinCount}
      />
      <ModalGameWon
        ref={gameWonModalRef}
        toggleGameWonModal={toggleGameWonModal}
        startNewMatch={startNewMatch}
        resetGame={resetGame}
      />
      <ModalReset
        ref={resetModalRef}
        resetGame={resetGame}
        toggleResetModal={toggleResetModal}
      />
    </main>
  );
};

GameVsPlayer.propTypes = {
  resetGame: PropTypes.func.isRequired,
  toggleGameWonModal: PropTypes.func.isRequired,
  gameWonModalRef: PropTypes.object,
  toggleResetModal: PropTypes.func.isRequired,
  resetModalRef: PropTypes.object,
};

export default GameVsPlayer;
