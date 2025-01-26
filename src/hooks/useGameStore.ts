import { create } from "zustand";
import { persist } from "zustand/middleware";
import { shuffle } from "../lib/utils";

export interface Post {
  id: number;
  date_created: string;
  image: string;
  headline: string;
  caption: string;
  theme_color: string;
  hoax: boolean;
  author_name: string;
  author_avatar: string;
  author_verified: boolean;
  source: string | null;
}

interface GameState {
  state: "live" | "over" | null;
  score: number;
  highScore: number;
  posts: Post[];
  sfx: boolean;
  fetchPosts: () => Promise<void>;
  incrementScore: () => void;
  gameOver: () => void;
  restartGame: () => void;
  toggleSfx: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      state: null,
      score: 0,
      highScore: 0,
      posts: [],
      sfx: true,
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
      restartGame: () => {
        set({
          state: "live",
          score: 0,
          posts: shuffle(get().posts),
        });
      },
      toggleSfx: () => set({ sfx: !get().sfx }),
    }),
    {
      name: "game-storage",
      partialize: (state) => ({ highScore: state.highScore, sfx: state.sfx }), // only persist high score and sfx
    }
  )
);
