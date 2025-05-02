import React from "react";
import useLikedRecipes from "../stores/useLikedRecipes";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeButton = ({ title, image }) => {
  const { toggleLike, isLiked } = useLikedRecipes();
  const liked = isLiked(title);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleLike({ title, image });
      }}
      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-md backdrop-blur-sm transition-all"
    >
      <span className="text-2xl text-red-500">
        {liked ? <FaHeart /> : <FaRegHeart />}
      </span>
    </button>
  );
};

export default LikeButton;
