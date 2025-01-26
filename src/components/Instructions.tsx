import { Flag, Heart, Play } from "lucide-react";
import { useGameStore } from "../hooks/useGameStore";

export default function Instructions() {
  const posts = useGameStore((state) => state.posts);
  const restartGame = useGameStore((state) => state.restartGame);

  return (
    <div className="flex items-center justify-center w-full text-center p-5 grow">
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
          className="flex items-center justify-center gap-1 mx-auto px-4 py-2 border-2 border-transparent hover:border-white bg-green-600 text-white  rounded-xl mt-5 text-lg font-bold active:scale-95 transition-all"
          onClick={() => restartGame()}
          disabled={posts.length <= 0}
        >
          <Play className="size-5" />
          START
        </button>
      </div>
    </div>
  );
}
