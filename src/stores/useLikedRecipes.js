import { create } from "zustand";

// 좋아요한 레시피 상태 전역 관리
const useLikedRecipes = create((set, get) => ({
  // 현재 좋아요 목록
  liked: JSON.parse(localStorage.getItem("likedRecipes") || "[]"),

  // 좋아요 누르면 추가or취소
  toggleLike: (recipe) => {
    const current = get().liked;
    const exists = current.some((item) => item.title === recipe.title);

    const updated = exists
      ? current.filter((item) => item.title !== recipe.title) // 취소
      : [...current, recipe]; // 추가

    localStorage.setItem("likedRecipes", JSON.stringify(updated));
    set({ liked: updated });
  },

  // 좋아요 했는지 확인
  isLiked: (title) => {
    return get().liked.some((item) => item.title === title);
  },
}));

export default useLikedRecipes;
