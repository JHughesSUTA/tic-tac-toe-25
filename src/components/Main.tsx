import { useEffect, useRef } from "react";
import Menu from "./Menu";
import GameVsComputer from "./GameVsComputer";
import GameVsPlayer from "./GameVsPlayer";
import { useGame } from "../contexts/GameContext";

const Main = ({}) => {
  const { gameSelected, gameType } = useGame();

  const gameWonModalRef = useRef<HTMLDialogElement>(null);
  const resetModalRef = useRef<HTMLDialogElement>(null);

  const toggleGameWonModal = () => {
    if (!gameWonModalRef.current) return;
    if (gameWonModalRef.current.open) {
      gameWonModalRef.current.close();
    } else {
      gameWonModalRef.current.showModal();
    }
  };

  const toggleResetModal = () => {
    if (!resetModalRef.current) return;
    if (resetModalRef.current.open) {
      resetModalRef.current.close();
    } else {
      resetModalRef.current.showModal();
    }
  };

  useEffect(() => {
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.body.classList.add("user-is-tabbing");
        window.removeEventListener("keydown", handleFirstTab);
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove("user-is-tabbing");
      window.addEventListener("keydown", handleFirstTab);
    };

    window.addEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleFirstTab);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <>
      {!gameSelected && <Menu />}
      {gameSelected && gameType === "single-player" && (
        <GameVsComputer
          toggleGameWonModal={toggleGameWonModal}
          gameWonModalRef={gameWonModalRef}
          resetModalRef={resetModalRef}
          toggleResetModal={toggleResetModal}
        />
      )}
      {gameSelected && gameType === "two-player" && (
        <GameVsPlayer
          toggleGameWonModal={toggleGameWonModal}
          gameWonModalRef={gameWonModalRef}
          resetModalRef={resetModalRef}
          toggleResetModal={toggleResetModal}
        />
      )}
    </>
  );
};

export default Main;
