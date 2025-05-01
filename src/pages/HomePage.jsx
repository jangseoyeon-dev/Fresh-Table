import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import api from "../utils/api";
import { useNavigate } from "react-router";
import Loding from "../components/Loding";

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const todayPick = [
  {
    title: "김치찌개",
    img: "https://i.namu.wiki/i/8drgvI-cQLUfJDC00zbl2ZolK4W3o4ZkVSpR-zM5FZk_QzT58vYnx_7ohk0qwGYYiSLPiZgwccyIEFUtYKDjUQ.webp",
    kcal: "300",
  },
  {
    title: "비빔밥",
    img: "https://i.namu.wiki/i/dgjXU86ae29hDSCza-L0GZlFt3T9lRx1Ug9cKtqWSzMzs7Cd0CN2SzyLFEJcHVFviKcxAlIwxcllT9s2sck0RA.jpg",
    kcal: "300",
  },
  {
    title: "갈비찜",
    img: "https://i.namu.wiki/i/9xHkxjyIHj2yj9fFf7eeyK8YJE3Lu3gJpFEDpe8cNwuMl2hOm61RE7S6607J1KwdvvcejL2J2b2kdS6y_UL0JQ.webp",
    kcal: "300",
  },
  {
    title: "갈비찜",
    img: "https://i.namu.wiki/i/9xHkxjyIHj2yj9fFf7eeyK8YJE3Lu3gJpFEDpe8cNwuMl2hOm61RE7S6607J1KwdvvcejL2J2b2kdS6y_UL0JQ.webp",
    kcal: "300",
  },
  {
    title: "갈비찜",
    img: "https://i.namu.wiki/i/9xHkxjyIHj2yj9fFf7eeyK8YJE3Lu3gJpFEDpe8cNwuMl2hOm61RE7S6607J1KwdvvcejL2J2b2kdS6y_UL0JQ.webp",
    kcal: "300",
  },
  {
    title: "갈비찜",
    img: "https://i.namu.wiki/i/9xHkxjyIHj2yj9fFf7eeyK8YJE3Lu3gJpFEDpe8cNwuMl2hOm61RE7S6607J1KwdvvcejL2J2b2kdS6y_UL0JQ.webp",
    kcal: "300",
  },
];

const HomePage = ({ deviceType }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/food/${id}`);
  };

  const tofuRecipes = recipes.filter((recipe) =>
    ["순두부", "연두부", "두부"].some((tag) => recipe.HASH_TAG?.includes(tag))
  );

  const handleClickTofu = () => {
    navigate("/search?tag=두부");
  };

  console.log("두부", tofuRecipes);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await api.get();
        const list = res.data.COOKRCP01?.row || [];
        setRecipes(list);
        console.log(list);
      } catch (err) {
        console.error("레시피 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (loading) return <Loding />;

  return (
    <div id="container" className="flex flex-col items-center">
      {/* 요리초보 */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-green-600 font-semibold text-md mb-2">
            요리 초보라면? <br />
            이것부터 보세요!
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            요리초보
            <br />
            레시피
          </h2>
          <button className="bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition flex items-center gap-2">
            레시피 더보기 <span className="text-xl">＋</span>
          </button>
        </div>

        <div className="flex">
          <div className="min-w-[280px]">
            <img
              src={tofuRecipes[0]?.ATT_FILE_NO_MAIN}
              alt={tofuRecipes[0]?.RCP_NM}
              className="w-full h-64 object-cover mb-4"
            />
            <h3 className="text-xl font-bold text-gray-900">
              냉장고에 남아있는
              <br />
              처치 곤란 두부, 어떡하죠?
            </h3>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              살 때마다 남게 되는 두부 때문에 걱정이시라고요?
              <br />
              냉장고 파먹기 좋은 레시피들로 생활비 아껴보아요.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["두부", "순두부", "연두부"].map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="w-full max-w-7xl border-t border-gray-300 my-10" />

      {/* 핵꿀팁 BEST 요리 모음 */}
      <div className="w-full max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center mt-10">
          핵꿀팁 BEST 요리모음
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.slice(10, 19).map((recipe, index) => (
            <div
              key={index}
              onClick={() => handleClick(recipe.RCP_NM)}
              className="group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-2 left-2 bg-[#66BB6A] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow-md">
                {index + 1}
              </div>
              <img
                src={recipe.ATT_FILE_NO_MAIN}
                alt={recipe.RCP_NM}
                className="w-full h-52 object-cover"
              />
              <div className="absolute top-2 right-2 text-2xl cursor-pointer">
                ♡
              </div>
              <p className="text-sm mt-2 text-gray-500">
                {" "}
                {recipe.HASH_TAG ? `#${recipe.HASH_TAG}` : ""}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:underline">
                {recipe.RCP_NM}
              </h3>
              <p className="text-sm text-gray-500">{recipe.INFO_ENG} kcal</p>
            </div>
          ))}
        </div>
      </div>

      {/* 배너 */}
      <div
        className="mt-10 relative w-full h-[400px] overflow-hidden cursor-pointer"
        onClick={() => handleClick(recipes[35]?.RCP_NM)}
      >
        <img
          src={recipes[35]?.ATT_FILE_NO_MK}
          alt={recipes[35]?.RCP_NM}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 bg-white p-6 shadow-lg max-w-sm">
          <p className="text-xs font-semibold text-gray-500 mb-1">
            {recipes[35]?.RCP_PAT2}
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {recipes[35]?.RCP_NM}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {recipes[35]?.RCP_NA_TIP}
          </p>
        </div>
      </div>

      {/* 오늘 찌개는 이 레시피 어때요? */}
      <div className="w-full max-w-5xl mt-20  mb-6 ">
        <h2 className="text-3xl font-bold mb-6 text-center">
          오늘 찌개는 이 레시피 어때요?
        </h2>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          // autoPlay={deviceType !== "mobile"}
          // autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all 0.5s"
          transitionDuration={1000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {recipes.slice(40, 48).map((recipe, index) => (
            <div className="px-2">
              <div className="relative overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer">
                <img
                  src={recipe?.ATT_FILE_NO_MK}
                  alt={recipe?.RCP_NM}
                  className="w-full h-64 object-cover"
                />
                <div
                  className="absolute bottom-0 w-full h-full text-white p-4"
                  onClick={() => handleClick(recipe.RCP_NM)}
                >
                  <h3 className="text-lg font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ">
                    {recipe.RCP_NM}
                  </h3>
                  <div className="flex items-center text-sm mt-1 space-x-2">
                    {/* <span className="bg-black/70 px-2 py-1 rounded-full">
                      {recipe?.RCP_NM}
                    </span> */}
                    <span className="bg-black/70 px-2 py-1 rounded-full">
                      {recipe?.RCP_PAT2}
                    </span>
                    {/* <span className="bg-black/70 px-2 py-1 rounded-full">{recipe?.INFO_ENG}Kcal</span> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* 다이어트 중? 저칼로리 레시피 */}
      <div className=" w-full px-4 py-10 mt-20 bg-[#F1F8E9]">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center hover:underline cursor-pointer">
          다이어트 중? 저칼로리 레시피!
          <a href="#" className="text-3xl text-[#66BB6A]">
            →
          </a>
        </h2>
        <div className="grid grid-cols-2 gap-6 px-4 max-w-7xl mx-auto">
          {recipes
            .filter((recipe) => parseFloat(recipe.INFO_ENG) <= 200)
            .slice(20, 24)
            .map((recipe, index) => (
              <div
                key={index}
                onClick={() => handleClick(recipe.RCP_NM)}
                className="relative overflow-hidden hover:scale-105 transition-transform bg-white cursor-pointer"
              >
                <img
                  src={recipe.ATT_FILE_NO_MK}
                  alt={recipe.RCP_NM}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 text-2xl cursor-pointer">
                  ♡
                </div>
                <div className="absolute bottom-0 w-full bg-black/50 text-white p-4">
                  <h3 className="text-lg font-bold">{recipe.RCP_NM}</h3>
                  <div className="flex items-center text-sm mt-1">
                    {/* <span>{recipe.RCP_WAY2}</span> */}
                    <span>{recipe.INFO_ENG} kcal</span>
                    {/* <span>{recipe.time}</span> */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
