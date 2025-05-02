import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { supabase } from "../../lib/supabaseClient";
import useUserStore from "../../stores/useUserStore";

const Header = () => {
  // const [user, setUser] = useState(null);

  const { user, setUser, clearUser } = useUserStore();
  useEffect(() => {
    const handleIsUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // console.log("현재 로그인된 사용자", user);
        setUser(user);
      } else {
        // console.log("로그인되지 않았습니다.");
      }
    };
    handleIsUser();
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event);
      setUser(session?.user ?? null);
    });
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("로그아웃 실패", error.message);
    } else {
      clearUser();
      console.log("로그아웃 성공!");
    }
  };

  return (
    <div className="flex justify-between items-center p-5 bg-white shadow-md">
      <div>
        <NavLink
          to="/"
          className="font-bold text-2xl text-green-600 hover:text-green-800 transition-colors"
        >
          Fresh Table
        </NavLink>
      </div>
      <div className="flex space-x-6 text-gray-600">
        {/* {user ? (
          <NavLink
            to="/"
            onClick={handleLogout}
            className="hover:text-green-600 transition-colors"
          >
            로그아웃
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className="hover:text-green-600 transition-colors"
          >
            로그인
          </NavLink>
        )} */}

        <NavLink
          to="/signup"
          className="hover:text-green-600 transition-colors"
        >
          회원가입
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
