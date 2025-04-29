import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-5 bg-white shadow-md">
      <div>
        <a
          href="/"
          className="font-bold text-2xl text-green-600 hover:text-green-800 transition-colors"
        >
          Fresh Table
        </a>
      </div>
      <div className="flex space-x-6 text-gray-600">
        <a href="/login" className="hover:text-green-600 transition-colors">
          로그인
        </a>
        <a href="/join" className="hover:text-green-600 transition-colors">
          회원가입
        </a>
      </div>
    </div>
  );
};

export default Header;
