import React, { useState, useEffect } from "react";

const Banner = ({ data, onClick }) => {
  const [randomIndex, setRandomIndex] = useState(null);

  const setRandomBanner = () => {
    if (data.length > 0) {
      const index = Math.floor(Math.random() * data.length);
      setRandomIndex(index);
    }
  };

  useEffect(() => {
    setRandomBanner();
  }, [data]);

  const item = data[randomIndex];
  if (!item) return null;

  return (
    <div className="mt-10">
      <div
        className="relative w-full h-[400px] overflow-hidden cursor-pointer"
        onClick={() => onClick(item?.RCP_NM)}
      >
        <img
          src={item?.ATT_FILE_NO_MK}
          alt={item?.RCP_NM}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 bg-white p-6 shadow-lg max-w-sm">
          <p className="text-xs font-semibold text-gray-500 mb-1">
            {item?.RCP_PAT2}
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {item?.RCP_NM}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {item?.RCP_NA_TIP}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
