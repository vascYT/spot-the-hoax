import { useGameStore } from "../hooks/useGameStore";
import { Heart, Flag } from "lucide-react";

export default function Score() {
  const posts = useGameStore((state) => state.posts);
  const score = useGameStore((state) => state.score);
  const highScore = useGameStore((state) => state.highScore);
  const gameState = useGameStore((state) => state.state);
  const restartGame = useGameStore((state) => state.restartGame);

  return (
    <div className="sticky flex justify-center items-center top-0 h-screen w-1/4 text-center">
      {gameState === "over" ? (
        <div>
          <img
            className="mx-auto"
            src="https://cdn.7tv.app/emote/01G1KTDMV00007V6BGFK48Q4DC/4x.gif"
          />
          <h1 className="text-5xl font-bold">Game Over!</h1>
          <div className="mt-2 mb-4">
            <p className="text-md">
              <span className="font-bold">Score:</span> {score}
            </p>
            <p className="text-md">
              <span className="font-bold">Highscore:</span> {highScore}
            </p>
          </div>
          <button
            className="px-4 py-2 bg-white text-black rounded-md"
            onClick={() => restartGame()}
          >
            Restart
          </button>
        </div>
      ) : gameState == "live" ? (
        <div>
          <p className="font-bold text-6xl">{score}</p>
          <h1 className="text-2xl font-bold">Score</h1>
          <p className="text-md mt-1">
            <span className="font-bold">Highscore:</span> {highScore}
          </p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold">Welcome to Spot The Hoax</h1>
          <div className="mt-3">
            <p>
              In this game, you are presented with a social media feed and your
              task is to judge each posts by either...
            </p>
            <div className="flex items-center gap-2 justify-center mt-3">
              <Heart className="size-6 fill-red-500 stroke-red-500" />
              <p>Liking it to mark it as real</p>
            </div>
            <p>or</p>
            <div className="flex items-center gap-2 justify-center">
              <Flag className="size-6 stroke-orange-400 fill-orange-400" />
              <p>Reporting it to mark it as fake news</p>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-white text-black rounded-md mt-5"
            onClick={() => restartGame()}
            disabled={posts.length <= 0}
          >
            {posts.length <= 0 ? "Loading..." : "Let's begin"}
          </button>
        </div>
      )}
    </div>
  );
}
