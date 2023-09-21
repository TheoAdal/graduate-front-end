import "./ContentWrapperStyles.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../HomePage/HomePageComponent";
import Contact from "../ContactUsPage/ContactUsPageComponent";
import About from "../AboutUsPage/AboutUsPageComponent";

function ContentWrapperComponent() {
  return (
    <div className="content-wrapper-container">
      ContentWrapperComponent
      <div className="">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/contact" element={<Contact />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default ContentWrapperComponent;
