import { useGameStore } from "../hooks/useGameStore";

export default function GameOver() {
  const posts = useGameStore((state) => state.posts);
  const score = useGameStore((state) => state.score);
  const highScore = useGameStore((state) => state.highScore);
  const restartGame = useGameStore((state) => state.restartGame);

  const hasWon = posts.length === score;

  return (
    <div>
      <img
        className="mx-auto mb-2"
        src={
          hasWon
            ? "https://cdn.7tv.app/emote/01GB4PT9NG000DGEZ8VYY59RSM/4x.gif"
            : "https://cdn.7tv.app/emote/01G1KTDMV00007V6BGFK48Q4DC/4x.gif"
        }
      />
      <h1 className="text-5xl font-bold">Game Over</h1>
      {hasWon && (
        <p className="mt-1">
          You caught us. We ran out of posts. You are now officially a
          professional fake news spotter.
        </p>
      )}
      <div className="flex items-center justify-center gap-2 mt-2 mb-4">
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
        Play again
      </button>
    </div>
  );
}
