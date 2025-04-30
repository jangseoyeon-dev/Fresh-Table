import { createBrowserRouter } from "react-router";

import NotFoundPage from "@/pages/NotFoundPage";
import MainLayout from "../layout/MainLayout";
import Login from "@/pages/Login";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import DetailPage from "@/pages/DetailPage";
import MyPage from "@/pages/MyPage";
import Signup from "../pages/Signup";
import Home from "../pages/Home";

const router = createBrowserRouter([
  { path: "*", Component: NotFoundPage },
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "search", Component: SearchPage },
      { path: "food/:id", Component: DetailPage },
      { path: "mypage", Component: MyPage },
    ],
  },
  { path: "home", Component: Home },
  { path: "login", Component: Login },
  { path: "signup", Component: Signup },
]);
export default router;
