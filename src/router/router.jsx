import { createBrowserRouter } from "react-router";

import NotFoundPage from "@/pages/NotFoundPage";
import MainLayout from "@/layout/MainLayout";
import Login from "@/pages/Login";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import DetailPage from "@/pages/DetailPage";
import MyPage from "@/pages/MyPage";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import UpdatePassword from "@/pages/UpdatePassword";

const router = createBrowserRouter([
  { path: "*", Component: NotFoundPage },
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "search", Component: SearchPage },
      { path: "food/:foodNm", Component: DetailPage },
      { path: "mypage", Component: MyPage },
    ],
  },
  { path: "login", Component: Login },
  { path: "signup", Component: Signup },
  { path: "forgot-password", Component: ForgotPassword },
  { path: "update-password", Component: UpdatePassword },
]);
export default router;
