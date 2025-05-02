import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLikedRecipes = create(
  persist(
    (set, get) => ({
      liked: [],

      toggleLike: (recipe) => {
        const current = get().liked;
        const exists = current.some((item) => item.title === recipe.title);
        const updated = exists
          ? current.filter((item) => item.title !== recipe.title)
          : [...current, recipe];
        set({ liked: updated });
      },

      isLiked: (title) => {
        return get().liked.some((item) => item.title === title);
      },
    }),
    {
      name: "likedRecipes", // localStorage 키 이름
    }
  )
);

export default useLikedRecipes;
