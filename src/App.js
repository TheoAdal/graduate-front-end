import React, { useState } from 'react';
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import TopBarNav from "./components/TopBar/TopBarNav";
import FooterWrapper from "./components/Footer/FooterWrapper";
import ContentWrapperComponent from "./components/Content/ContentWrapper/ContentWrapperComponent";



function App() {

  return (
    <BrowserRouter>
      <div className="App">
        {/* Render navbar if not in dashboard */}
        {!window.location.pathname.includes('/admindash' && '/volunteerlist' 
        && '/managerdash' && '/volunteerdash' && '/olduserdash' && '/employeelist'&&'/olduserlist'
        && '/profile'&&'/calendar'&&'/useredit' ) && (
          <div className="top-bar-container">
            <TopBarNav />
          </div>
        )}
        {/* {!window.location.pathname.includes('/admindash' && '/volunteerlist' 
        && '/managerdash' && '/volunteerdash' && '/olduserdash' && '/employeelist'&&'/olduserlist'
        && '/profile' && '/calendar'&&'/useredit' ) && ( */}
        <div className="content-wrapper">
          <ContentWrapperComponent />
        </div>
        {/* )} */}
        {/* Render footer if not in dashboard */}
        {!window.location.pathname.includes('/admindash' && '/volunteerlist' 
        && '/managerdash' && '/volunteerdash' && '/olduserdash' && '/employeelist'&&'/olduserlist'
        && '/profile' && '/calendar'&&'/useredit' ) && (
          <div className="footer">
            <FooterWrapper />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;