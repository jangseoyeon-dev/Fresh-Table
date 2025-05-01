import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";
import AuthHeader from "../components/common/AuthHeader";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSendresetEmail = async (e) => {
    e.preventDefault();
    /**
     * Step 1: Send the user an email to get a password reset token.
     * This email contains a link which sends the user back to your application.
     */
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password",
    });
    if (error) {
      console.log(error.message);
    } else {
      alert("초기화 이메일 전송 완료.");
    }
  };

  return (
    <div className="h-screen font-jua ">
      <AuthHeader />

      <div className=" flex justify-center items-center mt-20">
        <div className="w-100 max-sm:w-80">
          <form
            action=""
            className="flex flex-col"
            onSubmit={handleSendresetEmail}
          >
            <div className=" font-bold text-2xl py-2">비밀번호 초기화하기</div>
            <span className="text-sm text-gray-500">
              이메일을 작성하면 비밀번호 초기화 링크를 보내드립니다
            </span>
            <div className="border-t-1 border-[#BDBDBD] my-4"></div>
            <div className="">이메일</div>
            <input
              className="border-1 rounded-sm p-1 mt-2 px-3 placeholder:text-sm focus:outline-gray-400 focus:outline-1"
              placeholder="you@example.com"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="hover:bg-[#72cf77] bg-[#66BB6A] rounded-sm mt-6 font-bold text-white cursor-pointer p-2">
              초기화 이메일 보내기
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
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
