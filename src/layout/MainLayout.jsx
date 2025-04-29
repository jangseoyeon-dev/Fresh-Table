import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow"></main>
      <Footer />
    </div>
  );
};

export default MainLayout;
