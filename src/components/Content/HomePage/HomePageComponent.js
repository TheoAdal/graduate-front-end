import React from "react";
import CarouselAnimation from "./CarouselAnimation";
import CardComponent from "./CardComponent";
import Img4 from "../../../images/tepak.png";
import "./HomePageStyles.scss";

function HomePageComponent() {
  return (
    <div className="home-page-container">
      <div className="carousel-container">
        <CarouselAnimation />
      </div>
      <div className="more-container">
        <div className="opening-title">
          <div className="opening-text1"></div>
        </div>
        <CardComponent />
        <div className="contributors-title">
          <h3>Υποστηρικτές</h3>
          <img src={Img4} alt="Tepak Logo" />
        </div>
      </div>
    </div>
  );
}

export default HomePageComponent;
