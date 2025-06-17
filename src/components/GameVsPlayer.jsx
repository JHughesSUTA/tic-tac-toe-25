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
  gameType,
  playerOne,
}) => {
  const [board, setBoard] = useState(startingBoard);
  const [gameActive, setGameActive] = useState(true);
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState("x");
  const [xWinCount, setXWinCount] = useState(0);
  const [oWinCount, setOWinCount] = useState(0);
  const [catWinCount, setCatWinCount] = useState(0);
  const [nextFirstTurn, setNextFirstTurn] = useState("o");

  const startNewMatch = () => {
    setBoard(startingBoard);
    setGameActive(true);
    setWinner(null);
    setTurn(nextFirstTurn);
    setNextFirstTurn(nextFirstTurn === "x" ? "o" : "x");
  };

  const restart = () => {
    setBoard(startingBoard);
    setGameActive(true);
    setTurn(nextFirstTurn === "x" ? "o" : "x");
  };

  const handleClick = (i) => {
    if (!gameActive || board[i]) return;

    const newBoard = board.map((cell, index) => (index === i ? turn : cell));
    const gameWinner = checkForWinner(newBoard);

    setBoard(newBoard);

    if (gameWinner) {
      setGameActive(false);
      setWinner(gameWinner);

      if (gameWinner === "x") {
        setXWinCount((prev) => prev + 1);
      } else {
        setOWinCount((prev) => prev + 1);
      }
      toggleGameWonModal();
    } else if (newBoard.every((cell) => cell !== null)) {
      console.log("The cat won!! ... meow");
      setGameActive(false);
      setWinner("tie");
      setCatWinCount((prev) => prev + 1);
      toggleGameWonModal();
      return;
    }

    !gameWinner && setTurn(turn === "x" ? "o" : "x");
  };

  return (
    <main className="container">
      <GameHeader turn={turn} toggleResetModal={toggleResetModal} />
      <GameBoard
        board={board}
        handleClick={handleClick}
        turn={turn}
        gameType={gameType}
      />
      <GameFooter
        xWinCount={xWinCount}
        oWinCount={oWinCount}
        catWinCount={catWinCount}
        gameType={gameType}
        playerOne={playerOne}
      />
      <ModalGameWon
        ref={gameWonModalRef}
        toggleGameWonModal={toggleGameWonModal}
        startNewMatch={startNewMatch}
        resetGame={resetGame}
        winner={winner}
        playerOne={playerOne}
        gameType={gameType}
        // setNextFirstTurn={setNextFirstTurn}
      />
      <ModalReset
        ref={resetModalRef}
        restart={restart}
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
  gameType: PropTypes.string.isRequired,
};

export default GameVsPlayer;
