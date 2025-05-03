import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RecipeCard from "./RecipeCard";
import { useNavigate } from "react-router-dom"; // 라우팅 용도

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const CarouselSlider = ({ data = [], deviceType, isViewed = false }) => {
  const navigate = useNavigate();

  return (
    <Carousel
      swipeable
      draggable
      showDots={false}
      responsive={responsive}
      ssr={true}
      infinite={true}
      keyBoardControl
      transitionDuration={600}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={deviceType}
      containerClass="carousel-container"
      itemClass="carousel-item-padding-40-px px-2"
    >
      {data.map((recipe, index) => (
        <RecipeCard
          isViewed={isViewed}
          key={index}
          title={recipe.RCP_NM}
          image={recipe.ATT_FILE_NO_MK}
          category={recipe.RCP_PAT2}
          onClick={() => navigate(`/food/${recipe.RCP_NM}`)}
        />
      ))}
    </Carousel>
  );
};

export default CarouselSlider;
