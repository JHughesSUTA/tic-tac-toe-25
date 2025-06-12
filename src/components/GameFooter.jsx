const GameFooter = ({ xWinCount, oWinCount, catWinCount }) => {
  return (
    <section
      className="info"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "50px",
      }}
    >
      <div className="x-wins">{`X wins: ${xWinCount}`}</div>
      <div className="cat-wins">{`Cat wins: ${catWinCount}`}</div>
      <div className="o-wins">{`O wins: ${oWinCount}`}</div>
    </section>
  );
};

export default GameFooter;
