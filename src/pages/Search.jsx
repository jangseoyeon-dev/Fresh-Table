import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useFilteredRecipes } from "../hooks/useFilteredRecipes";
import { ClipLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import LikeButton from "../components/LikeButton";

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
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const calorie = searchParams.get("calorie");
    const q = searchParams.get("q");

    if (q) setQuery(q);
    else setQuery("");
    if (calorie) setCalorieFilter(calorie);
  }, [searchParams]);

  const { data, isLoading, isError, error } = useFilteredRecipes({
    query,
    selectedCookingMethod,
    selectedFoodType,
    calorieFilter,
  });
  console.log(data);

  const handleSearch = () => {
    setQuery(search);
    setCurrentPage(0);
  };

  const handleResetFilters = () => {
    setQuery("");
    setSelectedCookingMethod(null);
    setSelectedFoodType(null);
    setCalorieFilter(null);
    setSearch("");
    setCurrentPage(0);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = data?.slice(offset, offset + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* <h2 className="text-3xl font-bold mb-6 text-center mt-10">레시피</h2>

      검색창
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="재료 검색"
            className="border border-gray-300 rounded-lg p-2 w-full sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="bg-[#66BB6A] text-white px-4 py-2 rounded-lg hover:bg-[#57A05A] sm:w-auto"
          >
            검색
          </button>
          <button
            onClick={handleResetFilters}
            className="bg-[#66BB6A] text-white px-4 py-2 rounded-lg hover:bg-[#57A05A] sm:w-auto"
          >
            새로 고침
          </button>
        </div>
      </div> */}

      {/* 필터 */}
       <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl  pb-2">레시피</h2>
        <button
          onClick={handleResetFilters}
          className="bg-[#66BB6A] font-bold text-white px-3 py-1 rounded-lg hover:bg-[#57A05A] sm:w-auto cursor-pointer text-sm"
        >
          <FontAwesomeIcon
            icon={faRotateLeft}
            style={{ marginRight: "6px" }}
          />
          필터 초기화
        </button>
      </div>
      
      <div className="w-full flex flex-wrap justify-start gap-x-6 gap-y-6 mt-6">
        {/* 음식 분류 */}
        <div className="min-w-[250px] grow">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="block w-full mb-1 sm:mb-0 sm:inline sm:w-auto font-semibold text-sm leading-none">음식 분류</span>
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
        <div className="min-w-[250px] grow">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="block w-full mb-1 sm:mb-0 sm:inline sm:w-auto font-semibold text-sm leading-none">조리 방법</span>
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
        <div className="min-w-[250px] grow">
          <div className="flex flex-wrap gap-2 items-center">
          <span className="block w-full mb-1 sm:mb-0 sm:inline sm:w-auto font-semibold text-sm leading-none">칼로리</span>
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
      <div className="w-full flex justify-end">
        <span className="text-right">
          총 <span className="font-bold text-[#66BB6A]">{data?.length}</span>개
        </span>
      </div>
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
        {!isLoading && currentItems?.length === 0 && (
          <p className="font-semibold">
            검색 내용에 해당하는 레시피가 없습니다.
          </p>
        )}

        {!isLoading &&
          currentItems?.map((recipe, idx) => (
            <div
              key={idx}
              className="relative group p-4 border-2 border-gray-300 rounded-lg hover:border-[#66BB6A] cursor-pointer"
              onClick={() => navigate(`/food/${recipe.RCP_NM}`)}
            >
              {/* 좋아요 하트 버튼 */}
              <LikeButton title={recipe.RCP_NM} image={recipe.ATT_FILE_NO_MAIN} />
              <img
                src={recipe.ATT_FILE_NO_MAIN}
                alt={recipe.RCP_NM}
                className="w-full h-52 object-cover rounded-lg"
              />
              <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:underline">
                {recipe.RCP_NM}
              </h3>
              <p className="text-sm mt-2 text-gray-500">
                조리 방법: {recipe.RCP_WAY2} / 분류: {recipe.RCP_PAT2} / 칼로리:{recipe.INFO_ENG} kcal
              </p>
            </div>
          ))}
      </div>
      {/* 페이지네이션 */}
      {data?.length > itemsPerPage && (
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={Math.ceil(data.length / itemsPerPage)}
          breakClassName="cursor-pointer"
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center mt-8 space-x-2"}
          pageClassName={
            "px-3 py-1 border border-gray-300 cursor-pointer rounded-md text-sm"
          }
          activeClassName={"bg-[#66BB6A] text-white"}
          previousClassName={
            "px-3 py-1 border border-gray-300 rounded-md text-sm cursor-pointer"
          }
          nextClassName={
            "px-3 py-1 border border-gray-300 rounded-md text-sm cursor-pointer"
          }
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
        />
      )}
    </div>
  );
};

export default Search;
