import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const featchDetailRecipe = async (foodNm) => {
  return await api.get(`/RCP_NM=${foodNm}`);
};

export const useDetailRecipe = (foodNm) => {
  return useQuery({
    queryKey: ["detail", foodNm],
    queryFn: () => featchDetailRecipe(foodNm),
    select: (data) => data.data.COOKRCP01.row[0],
  });
};
