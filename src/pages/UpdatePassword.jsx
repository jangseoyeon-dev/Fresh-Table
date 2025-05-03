import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "@/lib/supabaseClient";
import AuthHeader from "../components/common/AuthHeader";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  //   const handleTest = async () => {
  //     const {
  //       data: { user, error },
  //     } = await supabase.auth.getUser();
  //     if (error) console.log(error.message);

  //     if (user) {
  //       const avatarUrl = user.user_metadata.avatar_url;
  //       console.log("프사:", avatarUrl);
  //       setAvatar(avatarUrl);
  //     }
  //   };
  const handleSendresetEmail = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      console.log(error.message);
    } else {
      alert("비밀번호 변경을 완료했습니다.");
      navigate("/");
    }
  };

  return (
    <div className="h-screen font-jua flex flex-col items-center justify-center">
      <AuthHeader />

      <div className=" flex justify-center items-center  my-10">
        <div className="w-100 max-sm:w-80">
          <form
            action=""
            className="flex flex-col"
            onSubmit={handleSendresetEmail}
          >
            <div className=" font-bold text-2xl py-2">
              새로운 비밀번호 만들기
            </div>
            <div className="border-t-1 border-[#BDBDBD] my-4"></div>
            <div className="">새로운 비밀번호</div>
            <input
              className="border-1 rounded-sm p-1 mt-2 px-3 placeholder:text-sm focus:outline-gray-400 focus:outline-1"
              type="password"
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="hover:bg-[#72cf77] bg-[#66BB6A] rounded-sm mt-6 font-bold text-white cursor-pointer p-2">
              비밀번호 변경
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
