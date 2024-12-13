import posts from "../assets/posts.json";
import { BadgeCheck, Bookmark, Heart, MessageCircle, Send } from "lucide-react";

export default function Post({ post }: { post: (typeof posts)[0] }) {
  return (
    <div className="max-w-xl border-b border-white/20 mb-10">
      <div className="flex items-center space-x-2 my-3">
        <img src={post.author.avatar} className="size-8 rounded-full" />
        <p className="font-bold text-sm">{post.author.username}</p>
        {post.author.verified && (
          <BadgeCheck className="size-4 stroke-blue-600" />
        )}
      </div>
      <img src={post.image} />
      <div className="mb-4">
        <div className="flex items-center mt-5 mb-3 gap-5">
          <Heart className="size-[5%]" />
          <MessageCircle className="size-[5%]" />
          <Send className="size-[5%]" />
          <Bookmark className="size-[5%] ml-auto" />
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
