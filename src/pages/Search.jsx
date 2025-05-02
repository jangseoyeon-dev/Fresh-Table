import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useFilteredRecipes } from "../hooks/useFilteredRecipes";
import { ClipLoader } from "react-spinners";
import useSearchStore from "../stores/useSearchStore";

const filters = {
  cookingMethods: ["굽기", "끓이기", "볶기", "찌기"],
  foodTypes: ["반찬", "국&찌개", "후식"],
  calorie: [
    { label: "칼로리 높은순", value: "high" },
    { label: "칼로리 낮은순", value: "low" },
    { label: "400kcal 이하", value: "below400" },
  ],
};
const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [selectedCookingMethod, setSelectedCookingMethod] = useState(null);
  const [selectedFoodType, setSelectedFoodType] = useState(null);
  const [calorieFilter, setCalorieFilter] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const calorie = searchParams.get("calorie");
    const q = searchParams.get("q");

    if (q) setQuery(q);
    if (calorie) setCalorieFilter(calorie);
  }, [searchParams]);

  const { data, isLoading, isError, error } = useFilteredRecipes({
    query,
    selectedCookingMethod,
    selectedFoodType,
    calorieFilter,
  });

  const handleSearch = () => {
    setQuery(search);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center mt-10">레시피</h2>

      {/* 검색창 */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="재료 검색"
            className="border border-gray-300 rounded-lg p-2 w-full sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-[#66BB6A] text-white px-4 py-2 rounded-lg hover:bg-[#57A05A] sm:w-auto"
          >
            검색
          </button>
        </div>
      </div>

      {/* 필터 */}
      <div className="w-full flex flex-col gap-6 mt-6">
        {/* 음식 분류 */}
        <div>
          <span className="font-semibold text-sm block mb-2">음식 분류</span>
          <div className="flex flex-wrap gap-2">
            {filters.foodTypes.map((type, idx) => (
              <button
                key={idx}
                onClick={() =>
                  setSelectedFoodType((prev) => (prev === type ? null : type))
                }
                className={`px-4 py-2 text-sm rounded-full cursor-pointer ${
                  selectedFoodType === type
                    ? "bg-[#66BB6A] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 조리 방법 */}
        <div>
          <span className="font-semibold text-sm block mb-2">조리 방법</span>
          <div className="flex flex-wrap gap-2">
            {filters.cookingMethods.map((method, idx) => (
              <button
                key={idx}
                onClick={() =>
                  setSelectedCookingMethod((prev) =>
                    prev === method ? null : method
                  )
                }
                className={`px-4 py-2 text-sm rounded-full cursor-pointer ${
                  selectedCookingMethod === method
                    ? "bg-[#66BB6A] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* 칼로리 필터 */}
        <div>
          <span className="font-semibold text-sm block mb-2">칼로리</span>
          <div className="flex flex-wrap gap-2">
            {filters.calorie.map(({ label, value }) => (
              <button
                key={value}
                onClick={() =>
                  setCalorieFilter((prev) => (prev === value ? null : value))
                }
                className={`px-4 py-2 text-sm rounded-full cursor-pointer ${
                  calorieFilter === value
                    ? "bg-[#66BB6A] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <hr className="w-full max-w-7xl border-t border-gray-300 my-10" />
      {/* 결과 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {isLoading && (
          <div className="h-screen fixed top-0 left-0 right-0 bottom-0 bg-white/80 z-50 flex justify-center items-center">
            <ClipLoader
              color="#66BB6A"
              loading={true}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        {!isLoading && data?.length === 0 && (
          <p className="font-semibold">
            검색 내용에 해당하는 레시피가 없습니다.
          </p>
        )}
        {!isLoading &&
          data?.map((recipe, idx) => (
            <div
              key={idx}
              className="group p-4 border-2 border-gray-300 rounded-lg hover:border-[#66BB6A] cursor-pointer"
              onClick={() => navigate(`/food/${recipe.RCP_NM}`)}
            >
              <img
                src={recipe.ATT_FILE_NO_MAIN}
                alt={recipe.RCP_NM}
                className="w-full h-52 object-cover rounded-lg"
              />
              <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:underline">
                {recipe.RCP_NM}
              </h3>
              <p className="text-sm mt-2 text-gray-500">
                조리 방법: {recipe.RCP_WAY2} / 분류: {recipe.RCP_PAT2} / 칼로리
                : {recipe.INFO_ENG} kcal
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
