import React, { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import { supabase } from "../../lib/supabaseClient";
import useUserStore from "../../stores/useUserStore";
import {
  faBars,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const { user, setUser, clearUser } = useUserStore();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      // console.log("Auth state changed:", event);
      setUser(session?.user ?? null);
    });
  }, []);
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
  };
  const handleDropdown = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      // console.log("로그아웃 실패", error.message);
    } else {
      clearUser();
      navigate("/");
      // console.log("로그아웃 성공!");
    }
  };

  return (
    <div className="flex sticky w-full bg-white top-0 z-[2000] sm:justify-center justify-between items-center sm:space-x-4 font-comic shadow-[0_4px_8px_-1px_rgba(0,0,0,0.1)]">
      <div className=" sm:px-6 py-4 max-sm:flex-1 flex justify-center items-center">
        <Link to="/" className="cursor-pointer flex w-fit items-center">
          <img
            src="/images/fresh_table_logo-removebg-preview.png"
            alt=""
            className="w-12 "
          />
          {/* <span className="hidden sm:block text-xl font-bold">Fresh Table</span> */}
        </Link>
      </div>
      <div className="relative max-sm:flex-3">
        <form action="" onSubmit={handleSearch}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute text-xl left-3 top-[50%] -translate-y-[50%]"
          />
          <input
            placeholder="레시피를 검색해보세요"
            type="text"
            className="w-full lg:w-lg border-1  px-9 p-2 rounded-3xl border-gray-200 outline-none focus:border-gray-400 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className="max-sm:flex-1 flex justify-center sm:hidden">
        <FontAwesomeIcon icon={faBars} onClick={handleDropdown} />
      </div>
      {isOpen && (
        <div className="bg-white inset-0 z-[1000] fixed p-6 font-bold text-xl space-y-2">
          <div className="text-right text-2xl">
            <FontAwesomeIcon icon={faXmark} onClick={handleClose} />
          </div>

          <div className="flex flex-col gap-2">
            {!user && (
              <Link
                to="/signup"
                className="hover:text-green-400 transition-all"
              >
                회원가입
              </Link>
            )}

            {user ? (
              <div
                className="cursor-pointer transition-all hover:text-green-400"
                onClick={handleLogout}
              >
                로그아웃
              </div>
            ) : (
              <Link to="/login" className="hover:text-green-400 transition-all">
                로그인
              </Link>
            )}
            {user && (
              <Link
                to="/mypage"
                className="hover:text-green-400 transition-all"
              >
                내정보
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="hidden sm:flex space-x-3 justify-center lg:mx-9 items-center font-bold">
        {user && (
          <Link to="/mypage" className="hover:text-green-400 transition-all">
            내정보
          </Link>
        )}
        {!user && (
          <Link to="/signup" className="hover:text-green-400 transition-all">
            회원가입
          </Link>
        )}
        {user ? (
          <button
            className="cursor-pointer transition-all hover:text-green-400"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        ) : (
          <Link to="/login" className="hover:text-green-400 transition-all">
            로그인
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
