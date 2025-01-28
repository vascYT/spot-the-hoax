import { useEffect } from "react";
import { useGameStore } from "../hooks/useGameStore";
import Post from "./Post";

export default function Feed() {
  const posts = useGameStore((state) => state.posts);
  const gameState = useGameStore((state) => state.state);
  const score = useGameStore((state) => state.score);
  const gameOver = useGameStore((state) => state.gameOver);

  if (posts.length == 0 || !gameState) {
    return <div></div>;
  }

  useEffect(() => {
    // End game when no posts are left
    if (posts.length === score) {
      gameOver();
    }
  }, [score]);

  return (
    <div className="flex items-center flex-col h-full px-2 md:px-10">
      {posts.slice(0, score + 1).map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
