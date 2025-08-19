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

type GameModeProviderProps = {
  children: ReactNode;
};

export const GameModeProvider = ({ children }: GameModeProviderProps) => {
  const [gameSelected, setGameSelected] = usePersistedState(
    "gameSelected",
    false
  );
  const [gameType, setGameType] = usePersistedState<GameType>("gameType", null);
  const [playerOne, setPlayerOne] = usePersistedState<Player>("playerOne", "x");

  const resetGame = () => {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("vsCPU_") || key.startsWith("vsPlayer_")) {
        sessionStorage.removeItem(key);
      }
    });

    setGameSelected(false);
    setGameType(null);
    setPlayerOne("x");
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

export const useGameMode = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameMode must be used within a GameModeProvider");
  }
  return context;
};
