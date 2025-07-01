import GameVsPlayer from "./components/GameVsPlayer";
import GameVsComputer from "./components/GameVsComputer";
import Menu from "./components/Menu";
import { useState, useRef, useEffect } from "react";
import type { GameType, Player } from "./types";

function App() {
  const [gameSelected, setGameSelected] = useState<boolean>(false);
  const [gameType, setGameType] = useState<GameType>(null);
  const [playerOne, setPlayerOne] = useState<Player>("x");

  const gameWonModalRef = useRef<HTMLDialogElement>(null);
  const resetModalRef = useRef<HTMLDialogElement>(null);

  const toggleGameWonModal = () => {
    if (!gameWonModalRef.current) return;
    if (gameWonModalRef.current.open) {
      gameWonModalRef.current.close();
    } else {
      gameWonModalRef.current.showModal();
    }
  };

  const toggleResetModal = () => {
    if (!resetModalRef.current) return;
    if (resetModalRef.current.open) {
      resetModalRef.current.close();
    } else {
      resetModalRef.current.showModal();
    }
  };

  const resetGame = () => {
    setGameSelected(false);
    setGameType(null);
  };

  useEffect(() => {
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.body.classList.add("user-is-tabbing");
        window.removeEventListener("keydown", handleFirstTab);
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove("user-is-tabbing");
      window.addEventListener("keydown", handleFirstTab);
    };

    window.addEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleFirstTab);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <>
      {!gameSelected && (
        <Menu
          setGameSelected={setGameSelected}
          setGameType={setGameType}
          playerOne={playerOne}
          setPlayerOne={setPlayerOne}
        />
      )}
      {gameSelected && gameType === "single-player" && (
        <GameVsComputer
          resetGame={resetGame}
          toggleGameWonModal={toggleGameWonModal}
          gameWonModalRef={gameWonModalRef}
          resetModalRef={resetModalRef}
          toggleResetModal={toggleResetModal}
          gameType={gameType}
          playerOne={playerOne}
        />
      )}
      {gameSelected && gameType === "two-player" && (
        <GameVsPlayer
          resetGame={resetGame}
          toggleGameWonModal={toggleGameWonModal}
          gameWonModalRef={gameWonModalRef}
          resetModalRef={resetModalRef}
          toggleResetModal={toggleResetModal}
          gameType={gameType}
          playerOne={playerOne}
        />
      )}

      <dialog id="modal">This is a test</dialog>
    </>
  );
}

export default App;
