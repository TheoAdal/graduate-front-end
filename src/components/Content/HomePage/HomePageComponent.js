import React from "react";
import CarouselAnimation from "./CarouselAnimation";
import "./HomePageStyles.scss";

function HomePageComponent() {
  return (
    <div>
      HomePageComponent
      <div className="home-page-container">
        <CarouselAnimation />
      </div>
    </div>
  );
}

export default HomePageComponent;
