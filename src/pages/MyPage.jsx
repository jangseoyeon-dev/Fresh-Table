import React from "react";
import CarouselSlider from "../components/CarouselSlider";
import useLikedRecipes from "@/stores/useLikedRecipes";
import useViewedRecipes from "@/stores/useViewedRecipes";
import useUserStore from "../stores/useUserStore";

const MyPage = () => {
  const { user } = useUserStore();
  const userId = user?.id;
  const avatar = user?.user_metadata?.avatar_url || "/images/chef.png"; // ✅ 경로만 정확하게
  const userName =
    user?.user_metadata?.nickname ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "";

  const { liked } = useLikedRecipes();
  const { viewed } = useViewedRecipes();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* 프로필 영역 */}
      <section className="flex items-center gap-6 mb-10 bg-[#E8F5E9] p-6 rounded-xl shadow-md">
        <img
          src={avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-[#66BB6A] shadow-lg"
        />
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#333333] mb-1">
            안녕하세요, {userName}님👋
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500">
            마이 레시피 공간에 오신 것을 환영합니다.
          </p>
        </div>
        <button className="ml-auto px-4 py-2 bg-[#66BB6A] text-white rounded-md hover:bg-[#57A05A] transition">
          수정
        </button>
      </section>

      {/* ❤️ 좋아요한 레시피 */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold text-[#333333] mb-4">
          ❤️ 좋아요한 레시피
        </h3>
        {liked.length > 0 ? (
          <CarouselSlider
            data={liked.map((r) => ({
              RCP_NM: r.title,
              ATT_FILE_NO_MK: r.image,
              RCP_PAT2: r.category || "",
            }))}
          />
        ) : (
          <p className="text-gray-400">좋아요한 레시피가 없습니다.</p>
        )}
      </section>

      {/* 👀 최근 본 레시피 */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold text-[#333333] mb-4">
          👀 최근 본 레시피
        </h3>
        {viewed.length > 0 ? (
          <CarouselSlider
            data={viewed.map((r) => ({
              RCP_NM: r.title,
              ATT_FILE_NO_MK: r.image,
              RCP_PAT2: "",
            }))}
          />
        ) : (
          <p className="text-gray-400">최근 본 레시피가 없습니다.</p>
        )}
      </section>
    </main>
  );
};

export default MyPage;
