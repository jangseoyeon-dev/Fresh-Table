import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useDetailRecipe = (foodNm) => {
  return useQuery({
    queryKey: ["detail", foodNm],
    queryFn: () => api.get(`/RCP_NM=${foodNm}`),
    select: (data) => data.data.COOKRCP01.row[0],
  });
};

export const useRelatedRecipe = (RCP_PAT2) => {
  return useQuery({
    queryKey: ["related", RCP_PAT2],
    queryFn: () =>
      api.get(`/RCP_PAT2=${RCP_PAT2 === "국&찌개" ? "국" : RCP_PAT2}`),
    select: (data) => data.data.COOKRCP01.row,
  });
};
