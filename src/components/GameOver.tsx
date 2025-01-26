import { useGameStore } from "../hooks/useGameStore";

export default function GameOver() {
  const score = useGameStore((state) => state.score);
  const highScore = useGameStore((state) => state.highScore);
  const restartGame = useGameStore((state) => state.restartGame);

  return (
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
  );
}
