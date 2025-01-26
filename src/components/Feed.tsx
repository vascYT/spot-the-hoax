import { useEffect } from "react";
import { useGameStore } from "../hooks/useGameStore";
import Post from "./Post";

export default function Feed() {
  const posts = useGameStore((state) => state.posts);
  const fetchPosts = useGameStore((state) => state.fetchPosts);
  const gameState = useGameStore((state) => state.state);
  const score = useGameStore((state) => state.score);

  useEffect(() => {
    fetchPosts();
  }, []);

  if (posts.length == 0 || !gameState) {
    return <div></div>;
  }

  return (
    <div className="flex items-center flex-col h-full pt-10 px-10">
      {posts.slice(0, score + 1).map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
