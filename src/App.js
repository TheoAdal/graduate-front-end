import React, { useState } from 'react';
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import TopBarNav from "./components/TopBar/TopBarNav";
import FooterWrapper from "./components/Footer/FooterWrapper";
import ContentWrapperComponent from "./components/Content/ContentWrapper/ContentWrapperComponent";
import Login from "./components/Content/LoginPage/LoginWrapperComponent";
import useToken from "./components/Token/useToken"; //allagh directory


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        {/* Render navbar if not in dashboard */}
        {!window.location.pathname.includes('/admindash') && (
          <div className="top-bar-container">
            <TopBarNav />
          </div>
        )}
        <div className="content-wrapper">
          <ContentWrapperComponent />
        </div>
        {/* Render footer if not in dashboard */}
        {!window.location.pathname.includes('/admindash') && (
          <div className="footer">
            <FooterWrapper />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
