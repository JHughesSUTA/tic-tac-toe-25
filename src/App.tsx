import Main from "./components/Main";
import { GameModeProvider } from "./contexts/GameModeContext";

function App() {
  return (
    <GameModeProvider>
      <Main />
    </GameModeProvider>
  );
}

export default App;
