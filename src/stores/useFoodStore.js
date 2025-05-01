import { create } from "zustand";

// 전역적으로 상태 관리가 필요한 것은 이곳에서 작업하시면 됩니다.
const useFoodStore = create((set) => ({
  food: [],
  setFood: (food) => set({ food }),
}));

export default useFoodStore;
