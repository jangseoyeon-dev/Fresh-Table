import { createBrowserRouter } from "react-router";

import NotFoundPage from "@/pages/NotFoundPage";
import MainLayout from "../layout/MainLayout";
import Login from "@/pages/Login";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import DetailPage from "@/pages/DetailPage";
import MyPage from "@/pages/MyPage";

const router = createBrowserRouter([
  { path: "*", Component: NotFoundPage },
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: Login },
      { path: "search", Component: SearchPage },
      { path: "food/:id", Component: DetailPage },
      { path: "mypage", Component: MyPage },
    ],
  },
]);
export default router;
