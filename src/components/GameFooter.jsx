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
      className="game-info"
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {gameType === "single-player" ? (
        <>
          <div className="game-info__display game-info__display--x-wins">
            X ({`${playerOne === "x" ? "You" : "CPU"}`})<span>{xWinCount}</span>
          </div>
          <div className="game-info__display game-info__display--ties">
            Ties <span>{catWinCount}</span>
          </div>
          <div className="game-info__display game-info__display--o-wins">
            O ({`${playerOne === "o" ? "You" : "CPU"}`})<span>{oWinCount}</span>
          </div>
        </>
      ) : (
        <>
          <div className="game-info__display game-info__display--x-wins">
            X ({`${playerOne === "x" ? "P1" : "P2"}`}) <span>{xWinCount}</span>
          </div>
          <div className="game-info__display game-info__display--ties">
            Ties <span>{catWinCount}</span>
          </div>
          <div className="game-info__display game-info__display--o-wins">
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
