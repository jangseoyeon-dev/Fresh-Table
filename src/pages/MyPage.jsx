import React from "react";
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
  // 레시피 카드 컴포넌트
  const RecipeCard = ({ title, image }) => (
    <div className="bg-white rounded-xl shadow-md hover:scale-105 transition duration-200 overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h4 className="text-md font-semibold">{title}</h4>
      </div>
    </div>
  );

  const CarouselSection = ({ title, icon, recipes }) => (
    <section className="mb-12">
      <h3 className="text-xl font-semibold text-[#333333] mb-4">
        {icon} {title}
      </h3>
      <Carousel responsive={responsive}>
        {recipes.map((r, i) => (
          <div key={i} className="p-2">
            <RecipeCard title={r.title} image={r.image} />
          </div>
        ))}
      </Carousel>
    </section>
  );

  const likedRecipes = [
    { title: "딸기 케이크", image: "/img1.jpg" },
    { title: "파스타", image: "/img2.jpg" },
    { title: "감자탕", image: "/img3.jpg" },
    { title: "마라탕", image: "/img4.jpg" },
  ];

  const viewedRecipes = [
    { title: "된장찌개", image: "/img1.jpg" },
    { title: "토스트", image: "/img2.jpg" },
    { title: "김치찌개", image: "/img3.jpg" },
    { title: "순두부찌개", image: "/img4.jpg" },
  ];

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
          <h2 className="text-2xl font-bold text-[#333333]">
            안녕하세요, 이유진님 👋
          </h2>
          <p className="text-sm text-gray-500">
            마이 레시피 공간에 오신 것을 환영합니다.
          </p>
        </div>
        <button className="ml-auto px-4 py-2 bg-[#66BB6A] text-white rounded-md hover:bg-[#57A05A] transition">
          수정
        </button>
      </section>

      {/* 좋아요한 레시피 */}
      <CarouselSection
        title="좋아요한 레시피"
        icon="❤️"
        recipes={likedRecipes}
      />

      <CarouselSection
        title="최근 본 레시피"
        icon="👀"
        recipes={viewedRecipes}
      />
    </main>
  );
};

export default MyPage;
