import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../HomePage/HomePageComponent";
import Contact from "../ContactUsPage/ContactUsPageComponent";
import About from "../AboutUsPage/AboutUsPageComponent";

function ContentWrapperComponent() {
  return (
    <div>
      ContentWrapperComponent
      <Router>
        <div className="App">
          <ul className="App-header">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/contact" element={<Contact />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default ContentWrapperComponent;
