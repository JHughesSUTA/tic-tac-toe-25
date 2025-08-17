import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { Player, GameType } from "../types";
import { usePersistedState } from "../hooks/usePersistedState";

type GameContextType = {
  gameSelected: boolean;
  setGameSelected: (selected: boolean) => void;
  gameType: GameType;
  setGameType: (gameType: GameType) => void;
  playerOne: Player;
  setPlayerOne: (player: Player) => void;
  resetGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

type GameProviderProps = {
  children: ReactNode;
};

export const GameProvider = ({ children }: GameProviderProps) => {
  // const [gameSelected, setGameSelected] = useState<boolean>(false);
  const [gameSelected, setGameSelected] = usePersistedState(
    "gameSelected",
    false
  );
  // const [gameType, setGameType] = useState<GameType>(null);
  const [gameType, setGameType] = usePersistedState<GameType>("gameType", null);
  const [playerOne, setPlayerOne] = usePersistedState<Player>("playerOne", "x");

  const resetGame = () => {
    setGameSelected(false);
    setGameType(null);
    sessionStorage.clear();
  };

  return (
    <GameContext.Provider
      value={{
        gameSelected,
        setGameSelected,
        gameType,
        setGameType,
        resetGame,
        playerOne,
        setPlayerOne,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
