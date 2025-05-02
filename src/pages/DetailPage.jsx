import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useDetailRecipe, useRelatedRecipe } from "../hooks/useDetailRecipe";
import { cleanManualStep } from "../utils/cleanManualStep";
import Loding from "../components/Loding";
import CarouselSlider from "../components/CarouselSlider";
import LikeButton from "../components/LikeButton";
import useViewedRecipes from "../stores/useViewedRecipes";

const DetailPage = () => {
  const { foodNm } = useParams();
  const { data, isLoading, isError, error } = useDetailRecipe(foodNm);
  const { data: related, isLoading: relatedLoading } = useRelatedRecipe(
    data?.RCP_PAT2
  );
  const addViewed = useViewedRecipes((state) => state.addViewed);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [foodNm]);

  useEffect(() => {
    if (data?.RCP_NM && data?.ATT_FILE_NO_MAIN) {
      addViewed({ title: data.RCP_NM, image: data.ATT_FILE_NO_MAIN });
    }
  }, [data?.RCP_NM, data?.ATT_FILE_NO_MAIN]);

  const manualSteps = useMemo(() => cleanManualStep(data), [data]);

  if (isLoading || relatedLoading) return <Loding />;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-5xl px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 이미지 박스 */}
        <div id="imgBox" className="relative w-full mx-auto">
          <img
            src={data.ATT_FILE_NO_MAIN}
            alt={data.RCP_NM}
            className="rounded-2xl shadow-lg w-full h-full object-cover"
          />
          <LikeButton title={data.RCP_NM} image={data.ATT_FILE_NO_MAIN} />
        </div>

        {/* 정보 박스 */}
        <div
          id="infoBox"
          className="flex flex-col justify-center space-y-6 p-6"
        >
          <h1 className="text-4xl font-bold text-gray-800">{data.RCP_NM}</h1>
          <p className="text-lg text-gray-600">{data.RCP_NA_TIP}</p>

          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-700 font-semibold">
              인분: 1인분
            </span>
            <span className="text-sm text-gray-700 font-semibold">
              칼로리: {data.INFO_ENG}kcal
            </span>
            {data.HASH_TAG && (
              <span className="text-sm text-gray-700 font-semibold">
                #{data.HASH_TAG}
              </span>
            )}
          </div>

          {/* 재료 정보 */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
              재료 정보
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-2">
              {data?.RCP_PARTS_DTLS?.split("\n").map((item, index) => {
                if (
                  ["재료", "주재료", "장식", "소스", "장식"].includes(
                    item.trim().replace("●", "")
                  )
                ) {
                  return null;
                }

                return (
                  <p
                    key={index}
                    className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                  >
                    {item.trim().replace("●", "")}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 레시피 정보 */}
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

      {/* 관련 레시피 */}
      {related?.length > 1 && (
        <div className="w-full max-w-4xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {data.RCP_PAT2} 레시피 정보
          </h2>
          <CarouselSlider data={related.slice(1, 11)} />
        </div>
      )}
    </div>
  );
};

export default DetailPage;
