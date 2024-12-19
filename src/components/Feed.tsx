import { useGameStore } from "../hooks/useGameStore";
import Post from "./Post";

export default function Feed() {
  const posts = useGameStore((state) => state.posts);
  const gameState = useGameStore((state) => state.state);
  const score = useGameStore((state) => state.score);

  if (posts.length == 0 || gameState !== "live") {
    return <div></div>;
  }

  return (
    <div className="flex items-center flex-col h-full pt-10 px-10">
      {posts.slice(0, score + 1).map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </div>
  );
}
