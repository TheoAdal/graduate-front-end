import React from "react";
import CarouselAnimation from "./CarouselAnimation";
import "./HomePageStyles.css";

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
