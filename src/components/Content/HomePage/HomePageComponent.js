import React from "react";
import CardComponent from "./CardComponent";
import Img4 from "../../../images/tepak.png";
import "./HomePageStyles.scss";

function HomePageComponent() {
  return (
    <div className="home-page-container">
      <div className="more-container">
        <div className="opening-title">
          <div className="opening-text1">
            <h1>Καλωσορίσατε στο Friendship at All Ages</h1>
            <p>
              Πιστεύουμε στη δύναμη των συνδέσεων και στον θετικό αντίκτυπο των
              φιλιών μεταξύ των γενεών. Η πλατφόρμα μας είναι αφιερωμένη στην
              καλλιέργεια ουσιαστικών σχέσεων μεταξύ εθελοντών και ατόμων της
              Τρίτης Ηλικίας.
            </p>
          </div>
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
