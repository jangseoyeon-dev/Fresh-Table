import React from "react";

const Button = ({ name, size, active }) => {
  // name: 버튼에 표시될 텍스트 (예: "로그인", "회원가입", "제출").
  // size: 버튼의 크기 (sm, md, lg).
  // active: 버튼의 활성화 상태 (boolean 값). true면 배경색이 **bg-green-200**로, false면 **bg-green-100**로 설정됩니다.

  const buttonTheme = {
    size: {
      sm: "w-20 p-2 text-sm",
      md: "w-30 p-2 text-lg",
      lg: "w-40 p-2 text-2xl",
    },
  };
  return (
    <div
      className={`bg-green-100 flex justify-center items-center rounded-[10px] ${
        buttonTheme.size[size]
      } ${active && "bg-green-200"}`}
    >
      {name}
    </div>
  );
};

export default Button;
