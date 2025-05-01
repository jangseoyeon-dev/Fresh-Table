import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

const MyPage = () => {
  // localstorage에 저장된 레시피 불러오기
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [viewedRecipes, setViewedRecipes] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("likedRecipes");
    if (saved) {
      setLikedRecipes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const viewed = localStorage.getItem("viewedRecipes");
    if (viewed) {
      setViewedRecipes(JSON.parse(viewed));
    }
  }, []);

  // 레시피 카드 컴포넌트
  const RecipeCard = ({ title, image }) => (
    <div className="bg-white rounded-xl shadow-md hover:scale-105 transition duration-200 overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h4 className="text-md font-semibold">{title}</h4>
      </div>
    </div>
  );

  const CarouselSection = ({ title, icon, recipes, emptyMessage }) => (
    <section className="mb-12">
      <h3 className="text-xl font-semibold text-[#333333] mb-4">
        {icon} {title}
      </h3>
      {recipes.length === 0 ? (
        <p className="text-gray-400">{emptyMessage}</p>
      ) : (
        <Carousel responsive={responsive}>
          {recipes.map((r, i) => (
            <div key={i} className="p-2">
              <RecipeCard title={r.title} image={r.image} alt={r.title} />
            </div>
          ))}
        </Carousel>
      )}
    </section>
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* 프로필 영역 */}
      <section className="flex items-center gap-6 mb-10 bg-[#E8F5E9] p-8">
        <img
          src="/profile.jpg" // 예시 이미지
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-[#66BB6A]"
        />
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#333333]">
            안녕하세요, 이유진님 👋
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500">
            마이 레시피 공간에 오신 것을 환영합니다.
          </p>
        </div>
        <button className="ml-auto px-4 py-2 bg-[#66BB6A] text-white rounded-md hover:bg-[#57A05A] transition">
          수정
        </button>
      </section>

      {/* 좋아요한 레시피 (localStorage에서 가져옴) */}
      <CarouselSection
        title="좋아요한 레시피"
        icon="❤️"
        recipes={likedRecipes}
        emptyMessage="좋아요한 레시피가 없습니다."
      />

      {/* 최근 본 레시피 (localStorage에서 가져옴) */}
      <CarouselSection
        title="최근 본 레시피"
        icon="👀"
        recipes={viewedRecipes}
        emptyMessage="최근 본 레시피가 없습니다."
      />
    </main>
  );
};

export default MyPage;
