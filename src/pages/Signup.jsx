import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // supabase 클라이언트 임포트
import { Link, Navigate, useNavigate } from "react-router";
import AuthHeader from "@/components/common/AuthHeader";
import useUserStore from "../stores/useUserStore";

export default function Signup() {
  const DEFAULT_AVATAR = "/images/chef.png";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [avatarFile, setAvatarFile] = useState("");
  const { user } = useUserStore();

  const navigate = useNavigate();
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // 이미 로그인된 경우 다른 페이지로 리디렉트
        navigate("/"); // 홈이나 원하는 경로
      }
    };
    checkSession();
  }, [user]);
  const handleUpload = async () => {
    if (!avatarFile) return;

    const file = avatarFile;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`public/${Date.now()}_${file.name}`, file);

    if (error) {
      console.error("Upload failed", error.message);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const avatarUrl = await handleUpload();
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
        options: {
          data: {
            first_name: null,
            nickname,
            avatar_url: avatarUrl || DEFAULT_AVATAR,
          },
        },
      }
    );
    const { data: existingProfiles, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email);

    console.log(existingProfiles);

    if (existingProfiles?.length > 0) {
      alert("이미 가입된 이메일입니다.");
      return;
    }
    if (signUpError) {
      console.error("회원가입 실패:", signUpError.message);
      alert(`회원가입 실패: ${signUpError.message}`);
    } else {
      const user = signUpData.user;

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: user.id, // 반드시 auth user id와 같아야 함
            email: email,
            nickname: nickname,
            avatar_url: avatarUrl || DEFAULT_AVATAR,
          },
        ]);

      if (profileError) {
        console.error("프로필 저장 실패:", profileError.message);
      } else {
        console.log("프로필 저장 성공:", profileData);
        alert("회원가입 성공! 이메일을 확인하세요.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <AuthHeader />
      <div className="flex justify-center items-center my-10">
        <div className="w-100 max-sm:w-80">
          <form action="" className="flex flex-col" onSubmit={handleSignup}>
            <div className="font-bold text-2xl">회원가입</div>
            <div className="border-t-1 border-[#BDBDBD] my-4"></div>
            <div className="">이메일</div>
            <input
              required
              className="border-1 rounded-sm p-1 mt-2 px-3 placeholder:text-sm focus:outline-gray-400 focus:outline-1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="mt-6 flex justify-between items-end">비밀번호</div>
            <input
              required
              className="border-1 rounded-sm p-1 mt-2 px-3 placeholder:text-sm focus:outline-gray-400 focus:outline-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-6 flex justify-between items-end">닉네임</div>
            <input
              className="border-1 rounded-sm p-1 mt-2 px-3 placeholder:text-sm focus:outline-gray-400 focus:outline-1"
              type="text"
              required
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className="mt-6 flex justify-between items-end">
              프로필 사진
            </div>
            <div className="mt-2 flex items-center justify-center w-full">
              <div
                id="file-name"
                className={`${
                  avatarFile ? "py-1.5" : "py-4"
                } text-gray-600 flex-grow text-sm mr-2  border-1 focus:outline-gray-400 focus:outline-1 rounded-sm px-3`}
              >
                {avatarFile.name}
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => setAvatarFile(e.target.files[0])}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-sm bg-[#66bb6a] font-bold hover:bg-[#72cf77] text-white rounded-sm py-2 px-3"
              >
                파일 선택
              </label>
            </div>
            <div className="flex justify-center">
              {avatarFile ? (
                <img
                  src={URL.createObjectURL(avatarFile)}
                  alt="미리보기"
                  className="mt-4 w-24 h-24 object-cover rounded-full"
                />
              ) : (
                <img
                  src={DEFAULT_AVATAR}
                  alt="미리보기"
                  className="mt-4 w-24 h-24 object-cover rounded-full"
                />
              )}
            </div>

            <button className="hover:bg-[#72cf77] bg-[#66BB6A] rounded-sm mt-6 font-bold text-white cursor-pointer p-2">
              가입하기
            </button>
            <div className="text-sm text-center font-bold pt-4 pb-2">
              <span className="text-gray-500">회원이신가요?</span>{" "}
              <Link to={"/login"}>
                <span className="underline cursor-pointer hover:text-gray-500 transition-all">
                  로그인 하기
                </span>
              </Link>
            </div>
          </form>
          {message && (
            <p className="text-center text-sm text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
