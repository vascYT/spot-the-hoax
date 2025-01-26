import { useGameStore } from "../hooks/useGameStore";

export default function Score() {
  const score = useGameStore((state) => state.score);
  const highScore = useGameStore((state) => state.highScore);

  return (
    <div>
      <p className="font-bold text-6xl">{score}</p>
      <h1 className="text-2xl font-bold">Score</h1>
      <p className="text-md mt-1">
        <span className="font-bold">Highscore:</span> {highScore}
      </p>
    </div>
  );
}
