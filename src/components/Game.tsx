import { useGameStore } from "../hooks/useGameStore";
import Feed from "./Feed";
import GameOver from "./GameOver";
import Instructions from "./Instructions";
import Score from "./Score";
import { useEffect } from "react";

export default function () {
  const gameState = useGameStore((state) => state.state);

  useEffect(() => {
    useGameStore.getState().fetchPosts();
  }, []);

  if (!gameState) {
    return <Instructions />;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center w-full">
      <Feed />
      <div className="sticky flex justify-center items-center top-0 sm:h-screen sm:w-1/4 my-3 sm:my-0 text-center">
        {gameState == "live" && <Score />}
        {gameState == "over" && <GameOver />}
      </div>
    </div>
  );
}
