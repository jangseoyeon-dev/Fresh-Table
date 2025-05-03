import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // supabase 클라이언트 임포트
import { Link, Navigate, useNavigate } from "react-router";
import AuthHeader from "@/components/common/AuthHeader";
import useUserStore from "../stores/useUserStore";

export default function Signup() {
  const DEFAULT_AVATAR =
    "data:image/jpeg;base64,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";
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
    const trimmedEmail = email.trim();
    const avatarUrl = await handleUpload();
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: trimmedEmail,
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

    if (signUpError) {
      console.error("회원가입 실패:", signUpError.message);
      setMessage(`회원가입 실패: ${signUpError.message}`);
    } else {
      const user = signUpData.user;

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: user.id, // 반드시 auth user id와 같아야 함
            nickname: nickname,
            avatar_url: avatarUrl || DEFAULT_AVATAR,
          },
        ]);

      if (profileError) {
        console.error("프로필 저장 실패:", profileError.message);
      } else {
        console.log("프로필 저장 성공:", profileData);
        setMessage("회원가입 성공! 이메일을 확인하세요.");
      }
    }
  };

  return (
    <div className=" font-jua flex flex-col items-center justify-center">
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
                  src="data:image/jpeg;base64,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"
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
