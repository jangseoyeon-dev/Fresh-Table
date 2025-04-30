import { useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient"; // supabase 클라이언트 임포트
import React, { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("로그인 실패:", error.message);
      // 실패한 경우에 대한 처리
    } else {
      console.log("로그인 성공:", data.user);
      navigate("/");

      // 성공한 경우에 대한 처리
      // data.user에는 사용자의 정보가 담겨 있습니다.
    }
  };
  return (
    <div className=" ">
      <form action="" onSubmit={handleLogin} className="flex flex-col">
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-amber-600 cursor-pointer">로그인</button>
      </form>
    </div>
  );
};

export default Login;
