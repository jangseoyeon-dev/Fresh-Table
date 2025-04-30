import React from "react";

const foodIngredients = [
  "밥 1공기",
  "돼지고기",
  "시금치",
  "콩나물",
  "양파",
  "당근",
  "계란",
  "고추장",
  "간장",
  "설탕",
  "깨소금",
  "참기름",
];

const DetailPage = () => {
  return (
    <div
      id="container"
      className="flex flex-col items-center bg-gray-50 min-h-screen"
    >
      <div className="w-full max-w-7xl px-4 py-12 grid grid-cols-1 md:grid-cols-2">
        {/* 이미지 박스 */}
        <div id="imgBox" className="relative w-full max-w-md mx-auto">
          <img
            src="https://i.namu.wiki/i/dgjXU86ae29hDSCza-L0GZlFt3T9lRx1Ug9cKtqWSzMzs7Cd0CN2SzyLFEJcHVFviKcxAlIwxcllT9s2sck0RA.jpg"
            alt="비빔밥"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
          {/* 좋아요 아이콘 */}
          <div className="absolute top-2 right-2 text-2xl cursor-pointer">
            ♡
          </div>
        </div>

        {/* 정보 박스 */}
        <div
          id="infoBox"
          className="flex flex-col justify-center space-y-4 p-6"
        >
          <h1 className="text-4xl font-bold text-gray-800">비빔밥</h1>
          <p className="text-lg text-gray-600">
            영양가득 맛있는 비빔밥을 만들어보아요!
          </p>

          <div className="flex items-center gap-6 mt-4">
            <div className="text-sm text-gray-700">
              <span className="font-semibold">인분:</span> 1인분
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-semibold">칼로리:</span> 400kcal
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-semibold">소요 시간:</span> 30분
            </div>
          </div>
        </div>
      </div>

      {/* 재료 정보 섹션 */}
      <div className="w-full max-w-4xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">재료 정보</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {foodIngredients.map((ingredient, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-xl shadow text-gray-700"
            >
              <span className="font-semibold">{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 레시피 정보 섹션 */}
      <div></div>
    </div>
  );
};

export default DetailPage;
