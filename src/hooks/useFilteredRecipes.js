import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchFilteredRecipes = async ({ queryKey }) => {
  const [, query, selectedCookingMethod, selectedFoodType, calorieFilter] = queryKey;
  const res = await api.get();
  let recipes = res.data.COOKRCP01.row || [];

  // 재료
  if (query) {
    recipes = recipes.filter((recipe) =>
      recipe.RCP_PARTS_DTLS.toLowerCase().includes(query.toLowerCase())
    );
  }

  // 조리 방법
  if (selectedCookingMethod) {
    recipes = recipes.filter((recipe) => recipe.RCP_WAY2 === selectedCookingMethod);
  }

  // 음식 분류
  if (selectedFoodType) {
    recipes = recipes.filter((recipe) => recipe.RCP_PAT2 === selectedFoodType);
  }

  // 칼로리
  if (calorieFilter === "below400") {
    recipes = recipes.filter((recipe) => {
      const calorie = parseFloat(recipe.INFO_ENG);
      return calorie && calorie <= 400;
    });
  }

  return recipes;
};

export const useFilteredRecipes = ({
  query,
  selectedCookingMethod,
  selectedFoodType,
  calorieFilter,
}) => {
  return useQuery({
    queryKey: ["recipes", query, selectedCookingMethod, selectedFoodType, calorieFilter],
    queryFn: fetchFilteredRecipes,
    select: (recipes) => {
      if (calorieFilter === "low") {
        return [...recipes].sort(
          (a, b) => parseFloat(a.INFO_ENG) - parseFloat(b.INFO_ENG)
        );
      }
      if (calorieFilter === "high") {
        return [...recipes].sort(
          (a, b) => parseFloat(b.INFO_ENG) - parseFloat(a.INFO_ENG)
        );
      }
      return recipes;
    },
  });
};
