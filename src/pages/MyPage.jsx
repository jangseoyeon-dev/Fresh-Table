import React, { useState } from "react";
import CarouselSlider from "../components/CarouselSlider";
import useUserStore from "../stores/useUserStore";
import useLikedRecipes from "../stores/useLikedRecipes";
import useViewedRecipes from "../stores/useViewedRecipes";
import { supabase } from "../lib/supabaseClient";

const MyPage = () => {
  const { user, setUser } = useUserStore();
  const userId = user?.id;
  const avatarUrl = user?.user_metadata?.avatar_url || "/images/chef.png";
  const userName =
    user?.user_metadata?.nickname ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "";
  const joinedAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString()
    : "";

  const { liked } = useLikedRecipes();
  const { viewed } = useViewedRecipes();

  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState(userName);
  const [newAvatarFile, setNewAvatarFile] = useState(null);

  const handleProfileUpdate = async () => {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError || !session) throw new Error("세션 없음");

      let newAvatarUrl = avatarUrl;

      if (newAvatarFile) {
        const ext = newAvatarFile.name.split(".").pop();
        const timestamp = Date.now();
        const fileName = `${userId}-${timestamp}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, newAvatarFile, { upsert: true });
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(fileName);
        newAvatarUrl = urlData.publicUrl;
      }

      await supabase
        .from("profiles")
        .update({ avatar_url: newAvatarUrl })
        .eq("id", userId);

      const { error: updateError } = await supabase.auth.updateUser(
        {
          data: {
            nickname: newNickname,
            avatar_url: newAvatarUrl,
          },
        },
        {
          accessToken: session.access_token,
        }
      );
      if (updateError) throw updateError;

      const { data: freshUser } = await supabase.auth.getUser();
      setUser(freshUser.user);
      setIsEditing(false);
      setNewAvatarFile(null);
    } catch (err) {
      console.error("프로필 업데이트 실패:", err.message);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* 프로필 영역 */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-6 mb-10 bg-[#E8F5E9] p-6 rounded-xl shadow-md">
        <img
          src={avatarUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-[#66BB6A] shadow-lg mx-auto sm:mx-0"
        />
        <div className="flex-1 w-full text-center sm:text-left">
          {isEditing ? (
            <div className="mt-1 flex flex-col gap-4 w-full max-w-xs mx-auto sm:mx-0">
              <label className="flex flex-col w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1">
                  닉네임 수정
                </span>
                <input
                  type="text"
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66BB6A] w-full"
                  placeholder="새 닉네임을 입력하세요"
                />
              </label>

              <label className="flex flex-col w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1">
                  프로필 이미지 변경
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewAvatarFile(e.target.files[0])}
                  className="block w-full text-sm text-gray-700
                  file:mr-4 file:py-1 file:px-3 file:rounded-lg
                  file:border-0 file:text-sm file:font-semibold
                  file:bg-[#66BB6A] file:text-white
                  hover:file:bg-[#57A05A] transition"
                />
                {newAvatarFile && (
                  <span className="text-xs text-gray-500 mt-1">
                    선택된 파일: {newAvatarFile.name}
                  </span>
                )}
              </label>

              <div className="flex gap-2 justify-center sm:justify-start">
                <button
                  onClick={handleProfileUpdate}
                  className="px-3 py-1 text-sm bg-[#66BB6A] text-white rounded-md hover:bg-[#57A05A]"
                >
                  저장
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setNewAvatarFile(null);
                    setNewNickname(userName);
                  }}
                  className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded-md"
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#333333] mb-2">
                안녕하세요, {userName}님👋
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-500">
                마이 레시피 공간에 오신 것을 환영합니다.
              </p>
              <p className="text-sm text-gray-400 mt-1">가입일: {joinedAt}</p>
            </>
          )}
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 sm:mt-0 sm:ml-auto px-4 py-2 bg-[#66BB6A] text-white rounded-md hover:bg-[#57A05A]"
          >
            수정
          </button>
        )}
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
            isViewed={true}
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
