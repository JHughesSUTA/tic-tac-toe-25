import GameVsPlayer from "./components/GameVsPlayer";
import GameVsComputer from "./components/GameVsComputer";
import Menu from "./components/Menu";
import { useState, useRef } from "react";

function App() {
  const [gameSelected, setGameSelected] = useState(false);
  const [gameType, setGameType] = useState(null);

  const gameWonModalRef = useRef(null);
  const resetModalRef = useRef(null);

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

  return (
    <>
      {!gameSelected && (
        <Menu setGameSelected={setGameSelected} setGameType={setGameType} />
      )}
      {gameSelected && gameType === "single-player" && (
        <GameVsComputer
          resetGame={resetGame}
          toggleGameWonModal={toggleGameWonModal}
          gameWonModalRef={gameWonModalRef}
          resetModalRef={resetModalRef}
          toggleResetModal={toggleResetModal}
        />
      )}
      {gameSelected && gameType === "two-player" && (
        <GameVsPlayer
          resetGame={resetGame}
          toggleGameWonModal={toggleGameWonModal}
          gameWonModalRef={gameWonModalRef}
          resetModalRef={resetModalRef}
          toggleResetModal={toggleResetModal}
        />
      )}

      <dialog id="modal">This is a test</dialog>
    </>
  );
}

export default App;
