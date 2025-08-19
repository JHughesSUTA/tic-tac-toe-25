import "../components/GameFooter.scss";
import { useGameMode } from "../contexts/GameModeContext";

type GameFooterProps = {
  xWinCount: number;
  oWinCount: number;
  catWinCount: number;
};

const GameFooter = ({ xWinCount, oWinCount, catWinCount }: GameFooterProps) => {
  const { gameType, playerOne } = useGameMode();
  return (
    <section
      className="game-scoreboard"
      aria-label="Game Scoreboard"
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {gameType === "single-player" ? (
        <>
          <div
            className="game-scoreboard__display game-scoreboard__display--x-wins"
            aria-live="polite"
          >
            X ({`${playerOne === "x" ? "You" : "CPU"}`})<span>{xWinCount}</span>
          </div>
          <div
            className="game-scoreboard__display game-scoreboard__display--ties"
            aria-live="polite"
          >
            Ties <span>{catWinCount}</span>
          </div>
          <div
            className="game-scoreboard__display game-scoreboard__display--o-wins"
            aria-live="polite"
          >
            O ({`${playerOne === "o" ? "You" : "CPU"}`})<span>{oWinCount}</span>
          </div>
        </>
      ) : (
        <>
          <div
            className="game-scoreboard__display game-scoreboard__display--x-wins"
            aria-live="polite"
          >
            X ({`${playerOne === "x" ? "P1" : "P2"}`}) <span>{xWinCount}</span>
          </div>
          <div
            className="game-scoreboard__display game-scoreboard__display--ties"
            aria-live="polite"
          >
            Ties <span>{catWinCount}</span>
          </div>
          <div
            className="game-scoreboard__display game-scoreboard__display--o-wins"
            aria-live="polite"
          >
            O ({`${playerOne === "o" ? "P1" : "P2"}`}) <span>{oWinCount}</span>
          </div>
        </>
      )}
    </section>
  );
};

export default GameFooter;
