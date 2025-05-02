import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecipes = async () => {
  const res = await api.get();
  return res.data.COOKRCP01?.row || [];
};

const useAllRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export default useAllRecipes;