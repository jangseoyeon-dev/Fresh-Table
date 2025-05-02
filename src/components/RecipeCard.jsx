import React from "react";
import LikeButton from "./LikeButton";

const RecipeCard = ({ title, image, category, onClick }) => {
  return (
    <div className="relative overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer">
      {/* 이미지 */}
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      {/* 좋아요 하트 버튼 */}
      <LikeButton title={title} image={image} />
      {/* 텍스트 클릭 시 상세페이지 이동 */}
      <div
        onClick={onClick}
        className="absolute bottom-0 w-full h-full text-white p-4 bg-gradient-to-t from-black/60 to-transparent"
      >
        <h3 className="text-lg font-bold w-[80%]  drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ">{title}</h3>
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
