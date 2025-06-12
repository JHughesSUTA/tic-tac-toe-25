import logo from "../assets/images/logo.png";

const GameHeader = ({ turn }) => {
  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      <img src={logo} alt="" width="72" height="32" />
      <div>{`${turn}'s turn`}</div>
      <button
        style={{
          padding: "10px",
        }}
      >
        Reset
      </button>
    </header>
  );
};

export default GameHeader;
