import React from "react";
import CarouselAnimation from "./CarouselAnimation";
import "./HomePageStyles.css";

function HomePageComponent() {
  return (
    <div>
      HomePageComponent
      <div className="carousel-container" styles="width: 100px">
        <CarouselAnimation />
        <div Contact></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default HomePageComponent;
