import { Link, useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient"; // supabase 클라이언트 임포트
import React, { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(`로그인 실패: ${error.message}`);
      // 실패한 경우에 대한 처리
    } else {
      console.log("로그인 성공:", data.user);
      navigate("/");

      // 성공한 경우에 대한 처리
      // data.user에는 사용자의 정보가 담겨 있습니다.
    }
  };
  return (
    <div className=" flex justify-center items-center h-screen font-noto">
      <div className="w-100 max-sm:w-80">
        <form action="" onSubmit={handleLogin} className="flex flex-col">
          <Link to={"/"} className="flex justify-center py-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0w6qiEjDWopTV3tllAh_sKaQbe3dI588aJA&s"
              alt=""
              className="w-14"
            />
          </Link>
          <div className=" font-bold text-2xl">로그인하기</div>
          <div className="border-t-1 border-[#BDBDBD] my-4"></div>
          <div className="">이메일</div>
          <input
            className="border-1 rounded-sm p-1 mt-2 px-3 placeholder:text-sm focus:outline-gray-400 focus:outline-1"
            placeholder="you@example.com"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="mt-6 flex justify-between items-end">
            <span>비밀번호</span>
            <span className="text-xs text-gray-500 font-bold">
              비밀번호를 잊었나요?
            </span>
          </div>
          <input
            className="border-1 rounded-sm p-1 mt-2 px-3 placeholder:text-sm focus:outline-gray-400 focus:outline-1"
            placeholder=""
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="hover:bg-[#72cf77] bg-[#66BB6A] rounded-sm mt-6 font-bold text-white cursor-pointer p-2">
            로그인
          </button>
          <div className="text-sm text-center font-bold py-6">
            <span className="text-gray-500">회원이 아닌가요?</span>{" "}
            <Link to={"/signup"}>
              <span className="underline cursor-pointer hover:text-gray-500 transition-all">
                회원가입 하러 가기
              </span>
            </Link>
          </div>
        </form>
        {message && (
          <p className="text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
