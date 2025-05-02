import React from "react";
import { ClipLoader } from "react-spinners";

const Loding = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader
        color="black"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loding;
