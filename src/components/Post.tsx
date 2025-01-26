import {
  BadgeCheck,
  CheckCircle2,
  Flag,
  Heart,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { useGameStore, type Post } from "../hooks/useGameStore";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

export default function Post({ post }: { post: Post }) {
  const incrementScore = useGameStore((state) => state.incrementScore);
  const gameOver = useGameStore((state) => state.gameOver);
  const gameState = useGameStore((state) => state.state);
  const [pressed, setPressed] = useState<"like" | "report" | null>(null);
  const postRef = useRef<HTMLDivElement | null>(null);
  const [likes, setLikes] = useState(
    Math.floor(Math.random() * (100000 - 5000) + 5000)
  );
  const [showFullDesc, setShowFullDesc] = useState(false);

  const like = () => {
    if (pressed != null) return;
    setPressed("like");
    setLikes((state) => state + 1);

    if (post.hoax) {
      gameOver();
    } else {
      incrementScore();
    }
  };

  const report = () => {
    if (pressed != null) return;
    setPressed("report");

    if (post.hoax) {
      incrementScore();
    } else {
      gameOver();
    }
  };

  useEffect(() => {
    postRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [postRef]);

  return (
    <div
      ref={postRef}
      className="max-w-full md:max-w-xl border-b border-white/20 mb-10"
    >
      <div className="flex items-center space-x-2 my-3">
        <img
          alt="Avatar"
          src={`${import.meta.env.PUBLIC_DIRECTUS_URL}/assets/${
            post.author_avatar
          }?key=avatar`}
          className="size-8 rounded-full"
        />
        <p className="font-bold text-sm">{post.author_name}</p>
        {post.author_verified && (
          <BadgeCheck className="size-4 stroke-blue-600" />
        )}
      </div>
      <div
        className="relative aspect-square bg-cover pointer-events-none"
        style={{
          backgroundImage: `url("${
            import.meta.env.PUBLIC_DIRECTUS_URL
          }/assets/${post.image}?key=post")`,
        }}
      >
        <div className="absolute bottom-5 left-0">
          <span
            className="font-black text-3xl shrink text-white leading-relaxed px-2 box-decoration-clone"
            style={{ backgroundColor: post.theme_color }}
          >
            {post.headline}
          </span>
        </div>
      </div>
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
        <p className="font-bold mb-1">{likes.toLocaleString()} likes</p>
        <div>
          <div className="flex space-x-1 mb-1 text-sm">
            <p className="font-bold">{post.author_name}</p>
            {post.author_verified && (
              <BadgeCheck className="size-4 stroke-blue-600 shrink-0" />
            )}
            <p
              className={cn(
                "text-ellipsis overflow-hidden",
                !showFullDesc && "whitespace-nowrap"
              )}
            >
              {post.caption}
            </p>
          </div>
          <button
            onClick={() => setShowFullDesc((state) => !state)}
            className="text-gray-400"
          >
            {showFullDesc ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
      {gameState === "over" && (
        <div
          className={cn(
            post.hoax ? "bg-red-400/25" : "bg-green-400/25",
            "flex items-center gap-2 py-3 px-2 my-2 rounded-md"
          )}
        >
          {post.hoax ? (
            <>
              <X className="size-5" />
              <p>This post is based on fabricated information.</p>
            </>
          ) : (
            <>
              <CheckCircle2 className="size-5" />
              <p>This post is based on real information.</p>
              {post.source && (
                <a
                  href={post.source}
                  target="_blank"
                  className="underline underline-offset-4 text-sm"
                >
                  Source
                </a>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
