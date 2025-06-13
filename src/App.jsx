import GameVsPlayer from "./components/GameVsPlayer";
import GameVsComputer from "./components/GameVsComputer";
import Menu from "./components/Menu";
import { useState, useRef } from "react";

function App() {
  const [gameSelected, setGameSelected] = useState(false);
  const [gameType, setGameType] = useState(null);

  const modalRef = useRef(null);

  const toggleModal = () => {
    if (!modalRef.current) return;
    if (modalRef.current.open) {
      modalRef.current.close();
    } else {
      modalRef.current.showModal();
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
          toggleModal={toggleModal}
          modalRef={modalRef}
        />
      )}
      {gameSelected && gameType === "two-player" && (
        <GameVsPlayer
          resetGame={resetGame}
          toggleModal={toggleModal}
          modalRef={modalRef}
        />
      )}
    </>
  );
}

export default App;
