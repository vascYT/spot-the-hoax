import posts from "../assets/posts.json";
import { BadgeCheck, Flag, Heart, MessageCircle, Send } from "lucide-react";
import { useGameStore } from "../hooks/useGameStore";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

export default function Post({ post }: { post: (typeof posts)[0] }) {
  const incrementScore = useGameStore((state) => state.incrementScore);
  const gameOver = useGameStore((state) => state.gameOver);
  const [pressed, setPressed] = useState<"like" | "report" | null>(null);
  const postRef = useRef<HTMLDivElement | null>(null);

  const like = () => {
    if (pressed != null) return;

    if (post.hoax) {
      gameOver();
    } else {
      incrementScore();
      setPressed("like");
    }
  };

  const report = () => {
    if (pressed != null) return;

    if (post.hoax) {
      incrementScore();
      setPressed("report");
    } else {
      gameOver();
    }
  };

  useEffect(() => {
    postRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [postRef]);

  return (
    <div ref={postRef} className="max-w-xl border-b border-white/20 mb-10">
      <div className="flex items-center space-x-2 my-3">
        <img src={post.author.avatar} className="size-8 rounded-full" />
        <p className="font-bold text-sm">{post.author.username}</p>
        {post.author.verified && (
          <BadgeCheck className="size-4 stroke-blue-600" />
        )}
      </div>
      <img src={post.image} />
      <div className="mb-4">
        <div className="flex items-center my-3 gap-3">
          <Heart
            onClick={() => like()}
            className={cn(
              "size-[4%] cursor-pointer",
              pressed == "like" && "fill-red-500 stroke-red-500"
            )}
          />
          <MessageCircle className="size-[4%] stroke-gray-500" />
          <Send className="size-[4%] stroke-gray-500" />
          <Flag
            onClick={() => report()}
            className={cn(
              "size-[4%] ml-auto cursor-pointer",
              pressed == "report" && "stroke-orange-400 fill-orange-400"
            )}
          />
        </div>
        <p className="font-bold mb-1">{post.likes.toLocaleString()} likes</p>
        <div>
          <div className="flex items-center space-x-1 mb-1 text-sm">
            <p className="font-bold">{post.author.username}</p>
            {post.author.verified && (
              <BadgeCheck className="size-4 stroke-blue-600 shrink-0" />
            )}
            <p className="text-ellipsis overflow-hidden whitespace-nowrap">
              {post.caption}
            </p>
          </div>
        </div>
        <p className="text-gray-400">View Comments</p>
      </div>
    </div>
  );
}
