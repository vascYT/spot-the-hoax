import { create } from "zustand";
import { persist } from "zustand/middleware";
import { shuffle } from "../lib/utils";
import posts from "../assets/posts.json";

interface GameState {
  state: "live" | "over" | null;
  score: number;
  highScore: number;
  posts: typeof posts;
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
      posts: shuffle(posts),
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
          posts: shuffle(posts),
        }),
    }),
    {
      name: "game-storage",
      partialize: (state) => ({ highScore: state.highScore }), // only persist high score
    }
  )
);
