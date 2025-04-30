import React from "react";
import { supabase } from "../lib/supabaseClient";

const Home = () => {
  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("로그아웃 실패", error.message);
    } else {
      console.log("로그아웃 성공!");
    }
  };
  const handleIsUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      console.log("현재 로그인된 사용자", user);
    } else {
      console.log("로그인되지 않았습니다.");
    }
  };
  return (
    <div className="text-[#66BB6A]">
      Home
      <button className="" onClick={handleLogout}>
        로그아웃
      </button>
      <button onClick={handleIsUser}>로그인 유저 확인</button>
    </div>
  );
};

export default Home;
