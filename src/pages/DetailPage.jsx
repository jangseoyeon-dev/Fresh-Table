import React, { useEffect } from "react";
import { useDetailRecipe, useRelatedRecipe } from "../hooks/useDetailRecipe";
import { useParams } from "react-router";
import { cleanManualStep } from "../utils/cleanManualStep";
import Loding from "../components/Loding";
import useLikedRecipes from "../stores/useLikedRecipes";
import CarouselSlider from "../components/CarouselSlider";

const DetailPage = () => {
  const { toggleLike } = useLikedRecipes();
  const { foodNm } = useParams();
  const { data, isLoading, isError, error } = useDetailRecipe(foodNm);
  const { data: related, isLoading: relatedLoading } = useRelatedRecipe(
    data?.RCP_PAT2
  );
  const manualSteps = cleanManualStep(data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [foodNm]);

  if (isLoading || relatedLoading) {
    return <Loding />;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div
      id="container"
      className="flex flex-col items-center bg-gray-50 min-h-screen"
    >
      <div className="w-full max-w-5xl px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 이미지 박스 */}
        <div id="imgBox" className="relative w-full mx-auto">
          <img
            src={data?.ATT_FILE_NO_MAIN}
            alt={data?.RCP_NM}
            className="rounded-2xl shadow-lg w-full h-full object-cover"
          />
          {/* 좋아요 아이콘 */}
          <div
            className="absolute top-2 right-2 text-2xl cursor-pointer"
            onClick={() => {
              toggleLike(data);
            }}
          >
            ♡
          </div>
        </div>

        {/* 정보 박스 */}
        <div
          id="infoBox"
          className="flex flex-col justify-center space-y-6 p-6"
        >
          <h1 className="text-4xl font-bold text-gray-800">{data?.RCP_NM}</h1>
          <p className="text-lg text-gray-600">{data?.RCP_NA_TIP}</p>

          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-700">
              <span className="font-semibold">인분:</span> 1인분
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-semibold">칼로리:</span> {data?.INFO_ENG}
              kcal
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-semibold">
                {data?.HASH_TAG && `#${data?.HASH_TAG}`}
              </span>
            </div>
          </div>

          {/* 재료 정보 */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
              재료 정보
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-2">
              {data?.RCP_PARTS_DTLS?.split("\n").map((item, index) => (
                <p
                  key={index}
                  className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                >
                  {item.trim().replace("●", " ")}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 레시피 정보 섹션 */}
      <div className="w-full max-w-4xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">레시피 정보</h2>
        <ul className="space-y-4">
          {manualSteps.map((step, index) => (
            <li key={index} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#66BB6A] text-white font-bold flex items-center justify-center">
                {index + 1}
              </div>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 w-full">
                {step}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 관련 레시피 정보 */}
      {related && (
        <div className="w-full max-w-4xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {data?.RCP_PAT2} 레시피 정보
          </h2>
          <CarouselSlider data={related.slice(1, 11)} />
        </div>
      )}
    </div>
  );
};

export default DetailPage;
