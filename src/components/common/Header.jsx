import React from "react";
import { NavLink } from "react-router";

const Header = () => {
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
        <NavLink to="/login" className="hover:text-green-600 transition-colors">
          로그인
        </NavLink>
        <NavLink to="/join" className="hover:text-green-600 transition-colors">
          회원가입
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
