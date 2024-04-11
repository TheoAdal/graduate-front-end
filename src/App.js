import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import TopBarNav from "./components/TopBar/TopBarNav";
import FooterWrapper from "./components/Footer/FooterWrapper";
import ContentWrapperComponent from "./components/Content/ContentWrapper/ContentWrapperComponent";

import { AuthProvider } from "./components/Content/LoginPage/AuthContext";

function App() {
  
  const excludePaths = [
    "/admindash",
    "/volunteerlist",
    "/managerdash",
    "/volunteerdash",
    "/olduserdash",
    "/employeelist",
    "/olduserlist",
    "/profile",
    "/appointmentslist",
    "/createappointment",
    "userappointmentlist",
    "/useredit",
  ];

  const RenderComponent = !excludePaths.some((path) =>
    window.location.pathname.includes(path)
  );

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          {/* Render navbar if not in excluded paths */}
          {RenderComponent && (
            <div className="top-bar-container">
              <TopBarNav />
            </div>
          )}

          <div className="content-wrapper">
            <ContentWrapperComponent />
          </div>

          {/* Render footer if not in excluded paths */}
          {RenderComponent && (
            <div className="footer">
              <FooterWrapper />
            </div>
          )}
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
