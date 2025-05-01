import React from "react";

const Footer = () => {

  return (
    <footer className="bg-gray-100 p-6 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex-1">
          <ul className="flex flex-wrap gap-4 mb-4">
            <li>
              <a className="hover:underline cursor-pointer">
                이용약관
              </a>
            </li>
            <li>
              <a className="hover:underline cursor-pointer">
                개인정보처리방침
              </a>
            </li>
            <li>
              <a className="hover:underline cursor-pointer">
                ABOUT US
              </a>
            </li>
            <li>
              <a className="hover:underline cursor-pointer">
                공지사항
              </a>
            </li>
          </ul>

          <button
            className="flex items-center gap-2 text-gray-800 hover:text-gray-900">
            <span>fresh table co.</span>
          </button>

          

          <p className="mt-4 text-xs text-gray-500">
            Copyright © fresh table, All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;