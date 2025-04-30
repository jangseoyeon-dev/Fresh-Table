// src/pages/register.jsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient"; // supabase 클라이언트 임포트

export default function Register() {
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

  const handleRegister = async (e) => {
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
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
      <form action="" className="flex flex-col" onSubmit={handleRegister}>
        <input
          className="border-1"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-1"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="border-1"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <input type="file" onChange={(e) => setAvatarFile(e.target.files[0])} />
        <button className="bg-amber-300 cursor-pointer">가입하기</button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}
