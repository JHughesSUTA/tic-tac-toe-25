import "../components/GameFooter.scss";
import PropTypes from "prop-types";

const GameFooter = ({
  xWinCount,
  oWinCount,
  catWinCount,
  playerOne,
  gameType,
}) => {
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

GameFooter.propTypes = {
  xWinCount: PropTypes.number.isRequired,
  oWinCount: PropTypes.number.isRequired,
  catWinCount: PropTypes.number.isRequired,
};
