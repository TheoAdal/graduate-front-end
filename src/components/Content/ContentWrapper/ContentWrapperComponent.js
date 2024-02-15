import "./ContentWrapperStyles.scss";
// import React from "react";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../HomePage/HomePageComponent";
import Contact from "../ContactUsPage/ContactUsPageComponent";
import About from "../AboutUsPage/AboutUsPageComponent";
import RegisterVolunteer from "../RegisterPages/RegisterVolunteerComponent";
import RegisterOldUser from "../RegisterPages/RegisterOldUserComponent";
import Login from "../LoginPage/LoginWrapperComponent";
import useToken from "../../Token/useToken"; //allagh directory

// allages logo tou useToken
// function setToken(userToken) {
//   sessionStorage.setItem("token", JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }

function ContentWrapperComponent() {
  const { token, setToken } = useToken(); //GIA TO useToken

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="content-wrapper-container">
      ContentWrapperComponent
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/About" element={<About />}></Route>
        <Route exact path="/contact" element={<Contact />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/volunteer" element={<RegisterVolunteer />}></Route>
        <Route exact path="/olduser" element={<RegisterOldUser />}></Route>
      </Routes>
    </div>
  );
}

export default ContentWrapperComponent;

//
