import GameVsPlayer from "./components/GameVsPlayer";
import GameVsComputer from "./components/GameVsComputer";
import Menu from "./components/Menu";
import { useState } from "react";

function App() {
  const [gameSelected, setGameSelected] = useState(false);
  const [gameType, setGameType] = useState(null);

  return (
    <>
      {!gameSelected && (
        <Menu setGameSelected={setGameSelected} setGameType={setGameType} />
      )}
      {gameSelected && gameType === "single-player" && <GameVsComputer />}
      {gameSelected && gameType === "two-player" && <GameVsPlayer />}
    </>
  );
}

export default App;
