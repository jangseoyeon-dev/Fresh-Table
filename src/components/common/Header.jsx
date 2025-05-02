import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router";
import { supabase } from "../../lib/supabaseClient";
import useUserStore from "../../stores/useUserStore";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const { user, setUser, clearUser } = useUserStore();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
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

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
  };

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
    <div className="flex sticky bg-white top-0 z-[2000] justify-center items-center space-x-4 font-comic shadow-[0_4px_8px_-1px_rgba(0,0,0,0.1)]">
      <div className=" px-6 py-4 ">
        <Link to="/" className="cursor-pointer flex w-fit items-center">
          <img
            src="/images/fresh_table_logo-removebg-preview.png"
            alt=""
            className="w-14 "
          />
          <span className="text-xl font-bold">Fresh Table</span>
        </Link>
      </div>
      <div className="relative ">
        <form action="" onSubmit={handleSearch}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute text-xl left-3 top-[50%] -translate-y-[50%]"
          />
          <input
            placeholder="레시피를 검색해보세요"
            type="text"
            className="w-lg border-1 px-9 p-2 rounded-3xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className="flex space-x-3 justify-center  items-center font-bold">
        <Link to="/search" className="hover:text-green-400 transition-all">
          검색페이지
        </Link>
        {user && (
          <Link to="/mypage" className="hover:text-green-400 transition-all">
            마이페이지
          </Link>
        )}
        <Link to="/signup" className="hover:text-green-400 transition-all">
          가입하기
        </Link>
        {user ? (
          <button
            className="cursor-pointer transition-all hover:text-green-400"
            onClick={handleLogout}
          >
            로그아웃하기
          </button>
        ) : (
          <Link to="/login" className="hover:text-green-400 transition-all">
            로그인하기
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
