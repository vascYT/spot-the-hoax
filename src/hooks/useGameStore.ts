import { create } from "zustand";
import { persist } from "zustand/middleware";
import { shuffle } from "../lib/utils";

export interface Post {
  id: number;
  date_created: string;
  image: string;
  caption: string;
  likes: number;
  hoax: boolean;
  author_name: string;
  author_avatar: string;
  author_verified: boolean;
}

interface GameState {
  state: "live" | "over" | null;
  score: number;
  highScore: number;
  posts: Post[];
  fetchPosts: () => Promise<void>;
  incrementScore: () => void;
  gameOver: () => void;
  restartGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      state: null,
      score: 0,
      highScore: 0,
      posts: [],
      fetchPosts: async () => {
        const res = await fetch(
          `${import.meta.env.PUBLIC_DIRECTUS_URL}/items/fake_news_posts`
        );
        const json = await res.json();
        set({ posts: shuffle(json.data) });
      },
      incrementScore: () => set({ score: get().score + 1 }),
      gameOver: () =>
        set({
          state: "over",
          highScore:
            get().score > get().highScore ? get().score : get().highScore,
        }),
      restartGame: () =>
        set({
          state: "live",
          score: 0,
          posts: shuffle(get().posts),
        }),
    }),
    {
      name: "game-storage",
      partialize: (state) => ({ highScore: state.highScore }), // only persist high score
    }
  )
);
