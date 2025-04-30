import { useState } from "react";
import { supabase } from "../lib/supabaseClient"; // supabase 클라이언트 임포트
import { Link } from "react-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [avatarFile, setAvatarFile] = useState("");

  const handleUpload = async () => {
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

    const avatarUrl = urlData.publicUrl;

    // 예: 회원가입 시 metadata에 저장
    await supabase.auth.updateUser({
      data: {
        avatar_url: avatarUrl,
      },
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: name,
          avatar_url: avatarFile,
        },
      },
    });

    if (error) {
      setMessage(`회원가입 실패: ${error.message}`);
    } else {
      setMessage("회원가입 성공! 이메일을 확인하세요.");
    }
    handleUpload();
  };

  return (
    <div className="flex justify-center items-center h-screen font-noto">
      <div className="w-100 ">
        <form action="" className="flex flex-col" onSubmit={handleSignup}>
          <div className="flex justify-center py-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0w6qiEjDWopTV3tllAh_sKaQbe3dI588aJA&s"
              alt=""
              className="w-20"
            />
          </div>
          <div className="py-4 font-bold text-2xl">회원가입하기</div>
          <div className="border-t-1 border-[#BDBDBD] my-4"></div>
          <div className="">이메일</div>
          <input
            className="border-1 rounded-sm p-1 mt-2 px-3 placeholder:text-sm focus:outline-gray-400 focus:outline-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="mt-6 flex justify-between items-end">비밀번호</div>
          <input
            className="border-1 rounded-sm p-1 mt-2 px-3 placeholder:text-sm focus:outline-gray-400 focus:outline-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-6 flex justify-between items-end">이름</div>
          <input
            className="border-1 rounded-sm p-1 mt-2 px-3 placeholder:text-sm focus:outline-gray-400 focus:outline-1"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setAvatarFile(e.target.files[0])}
          />
          <button className="hover:bg-[#72cf77] bg-[#66BB6A] rounded-sm mt-6 font-bold text-white cursor-pointer p-2">
            가입하기
          </button>
          <div className="text-sm text-center font-bold py-6">
            <span className="text-gray-500">회원이신가요?</span>{" "}
            <Link to={"/login"}>
              <span className="underline cursor-pointer hover:text-gray-500 transition-all">
                로그인 하기
              </span>
            </Link>
          </div>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
