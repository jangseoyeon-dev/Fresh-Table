import React from "react";

const TofuModal = ({ recipes, onClose, onSelectRecipe }) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4 pt-10">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[80vh] overflow-y-auto p-6 relative">
        <button
          className="cursor-pointer absolute top-3 right-4 text-gray-500 hover:text-black text-3xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center">
          간편 두부 레시피 모음
        </h2>
        <p className="text-center text-md">
          냉장고 속, 빠질 수 없는 식재료에 두부가 있다면? <br />
          맛있게 즐길 수 있는 초간단 레시피 -
        </p>
        <hr className="w-full max-w-7xl border-t border-gray-300 my-10" />
        <ul className="space-y-4">
          {recipes.map((recipe, idx) => (
            <li
              key={idx}
              onClick={() => onSelectRecipe(recipe.RCP_NM)}
              className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition"
            >
              <img
                src={recipe.ATT_FILE_NO_MAIN}
                alt={recipe.RCP_NM}
                className="w-24 h-24 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-md font-semibold text-gray-900 mb-1">
                  {recipe.RCP_NM}
                </h3>
                <div className="text-sm text-gray-500 flex flex-wrap gap-2 items-center">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    {recipe.INFO_ENG} kcal
                  </span>
                  {recipe.RCP_WAY2 && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                      {recipe.RCP_WAY2}
                    </span>
                  )}
                  {recipe.HASH_TAG?.split(",")
                    .slice(0, 2)
                    .map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TofuModal;
