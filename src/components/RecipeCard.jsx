import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useLikedRecipes from "@/stores/useLikedRecipes";

const RecipeCard = ({ title, image, category, onClick }) => {
  const { toggleLike, isLiked } = useLikedRecipes();
  const liked = isLiked(title);

  return (
    <div className="relative overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer">
      {/* 이미지 */}
      <img src={image} alt={title} className="w-full h-64 object-cover" />

      {/* 좋아요 하트 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 상세페이지 이동 막기
          toggleLike({ title, image });
        }}
        className="absolute top-2 right-2 text-xl text-red-500 hover:scale-110 transition z-10"
      >
        {liked ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* 텍스트 클릭 시 상세페이지 이동 */}
      <div
        onClick={onClick}
        className="absolute bottom-0 w-full h-full text-white p-4 bg-gradient-to-t from-black/60 to-transparent"
      >
        <h3 className="text-lg font-bold">{title}</h3>
        {category && (
          <span className="bg-black/70 px-2 py-1 rounded-full text-sm">
            {category}
          </span>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
