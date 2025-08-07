import Main from "./components/Main";
import { GameProvider } from "./contexts/GameContext";

function App() {
  return (
    <GameProvider>
      <Main />
    </GameProvider>
  );
}

export default App;
