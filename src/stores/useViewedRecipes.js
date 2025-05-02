import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useViewedRecipes = create(
  persist(
    (set, get) => ({
      viewed: [],
      addViewed: ({ title, image }) => {
        const current = get().viewed;
        const filtered = current.filter((item) => item.title !== title);
        const updated = [{ title, image }, ...filtered].slice(0, 10);
        set({ viewed: updated });
      },
      isViewed: (title) => {
        return get().viewed.some((item) => item.title === title);
      },
    }),
    {
      name: "viewedRecipes",
    }
  )
);

export default useViewedRecipes;
