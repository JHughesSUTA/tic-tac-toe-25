import "../components/GameFooter.scss";
import PropTypes from "prop-types";

const GameFooter = ({ xWinCount, oWinCount, catWinCount }) => {
  return (
    <section
      className="game-info"
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div className="game-info__display game-info__display--x-wins">
        X (you) <span>{xWinCount}</span>
      </div>
      <div className="game-info__display game-info__display--ties">
        Ties <span>{catWinCount}</span>
      </div>
      <div className="game-info__display game-info__display--o-wins">
        O (CPU) <span>{oWinCount}</span>
      </div>
    </section>
  );
};

export default GameFooter;

GameFooter.propTypes = {
  xWinCount: PropTypes.number.isRequired,
  oWinCount: PropTypes.number.isRequired,
  catWinCount: PropTypes.number.isRequired,
};
