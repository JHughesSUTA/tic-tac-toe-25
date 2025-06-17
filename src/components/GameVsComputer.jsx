import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import GameHeader from "./GameHeader";
import GameBoard from "./GameBoard";
import GameFooter from "./GameFooter";
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

const GameVsComputer = ({
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
  const [turn, setTurn] = useState("x");
  const [xWinCount, setXWinCount] = useState(0);
  const [oWinCount, setOWinCount] = useState(0);
  const [catWinCount, setCatWinCount] = useState(0);
  const [winner, setWinner] = useState(null);
  const [nextFirstTurn, setNextFirstTurn] = useState("o");

  const cpu = playerOne === "x" ? "o" : "x";

  const startNewMatch = () => {
    setBoard(startingBoard);
    setGameActive(true);
    setTurn(nextFirstTurn);
    setNextFirstTurn(nextFirstTurn === "x" ? "o" : "x");
    setWinner(null);
  };

  const restart = () => {
    setBoard(startingBoard);
    setGameActive(true);
    setTurn(nextFirstTurn === "x" ? "o" : "x");
  };

  const checkForDraw = (board) => {
    if (board.every((cell) => cell !== null)) {
      console.log("The cat won!! ... meow");
      setGameActive(false);
      setCatWinCount((prev) => prev + 1);
      setWinner("tie");
      toggleGameWonModal();
      return;
    }
  };

  const handleClick = (i) => {
    // only allow click if game is active and cell clicked is empty
    if (!gameActive || board[i] || turn !== playerOne) return;

    // create copy of the new board and check if it's a winner
    const newBoard = board.map((cell, index) =>
      index === i ? playerOne : cell
    );
    const gameWinner = checkForWinner(newBoard);

    setBoard(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      console.log(`${gameWinner} wins!`);
      setGameActive(false);
      if (gameWinner === "x") {
        setXWinCount((prev) => prev + 1);
      } else {
        setOWinCount((prev) => prev + 1);
      }
      toggleGameWonModal();
      return;
    }

    checkForDraw(newBoard);

    !gameWinner && setTurn(turn === "x" ? "o" : "x");
  };

  useEffect(() => {
    if (turn !== playerOne && gameActive) {
      const timer = setTimeout(() => {
        let move = null;

        for (const line of lines) {
          const [a, b, c] = line;
          const values = [board[a], board[b], board[c]];

          const winningMove =
            (values[0] === values[1] &&
              values[0] === cpu &&
              values[2] === null) ||
            (values[0] === values[2] &&
              values[0] === cpu &&
              values[1] === null) ||
            (values[1] === values[2] &&
              values[1] === cpu &&
              values[0] === null);

          const blockingMove =
            (values[0] === values[1] &&
              values[0] === playerOne &&
              values[2] === null) ||
            (values[0] === values[2] &&
              values[0] === playerOne &&
              values[1] === null) ||
            (values[1] === values[2] &&
              values[1] === playerOne &&
              values[0] === null);

          if (winningMove) {
            // pick cell if it's a winning move
            move = [a, b, c][values.indexOf(null)];
            break;
            // pick cell if it's a blocking move
          } else if (blockingMove && move === null) {
            move = [a, b, c][values.indexOf(null)];
          }
        }

        // Pick a random empty cell if there are no winning or blocking moves
        if (move === null) {
          const emptyCells = [];
          for (let i = 0; i < 9; i++) {
            if (!board[i]) emptyCells.push(i);
          }
          if (emptyCells.length === 0) return;
          move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }

        const newBoard = board.map((cell, index) =>
          index === move ? cpu : cell
        );

        const gameWinner = checkForWinner(newBoard);

        setBoard(newBoard);

        if (gameWinner) {
          setWinner(gameWinner);
          setGameActive(false);
          if (gameWinner === "x") {
            setXWinCount((prev) => prev + 1);
          } else {
            setOWinCount((prev) => prev + 1);
          }
          toggleGameWonModal();
          return;
        }

        checkForDraw(newBoard);

        !gameWinner && setTurn(turn === "x" ? "o" : "x");
      }, 600); // 600ms delay

      return () => clearTimeout(timer);
    }
  }, [board, turn, gameActive]);

  return (
    <main className="container">
      <GameHeader turn={turn} toggleResetModal={toggleResetModal} />
      <GameBoard
        board={board}
        handleClick={handleClick}
        turn={turn}
        playerOne={playerOne}
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
        gameType={gameType}
        playerOne={playerOne}
      />
      <ModalReset
        ref={resetModalRef}
        restart={restart}
        toggleResetModal={toggleResetModal}
      />
    </main>
  );
};

GameVsComputer.propTypes = {
  resetGame: PropTypes.func.isRequired,
  toggleGameWonModal: PropTypes.func.isRequired,
  gameWonModalRef: PropTypes.object,
  toggleResetModal: PropTypes.func.isRequired,
  resetModalRef: PropTypes.object,
  gameType: PropTypes.string.isRequired,
};

export default GameVsComputer;
