import React from "react";
import CarouselAnimation from "./CarouselAnimation";
import CardComponent from "./CardComponent";
import Img4 from "../../../images/tepak.png";
import "./HomePageStyles.scss";

function HomePageComponent() {
  return (
    <div>
      {/* HomePageComponent */}
      <div className="home-page-container">
        <CarouselAnimation />
        <div className="opening-title">
          <h1>Καλώς ορίσατε </h1> {/* Add your opening text here */}
          <div className="opening-text1">
            {/* <p>Βαλε μια μικρη opening περιγραφη του σιτε εδω </p> */}
          </div>
        </div>
        <CardComponent/>
        <div className="contributors-title">
        <h3>Υποστηρικτές</h3>
        <img src={Img4} alt="Tepak Logo" />
        </div>
      </div>
    </div>
  );
}

export default HomePageComponent;
