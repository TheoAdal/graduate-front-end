import React, { useContext, useState, useEffect } from "react";
import "./OldUserDashboard.scss";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Sidebar from "../DashboardNav/Sidebar";
import TopNav from "../DashboardNav/TopNav";
import Footer from "../DashboardNav/Footer";

import { AuthContext } from "../../Content/LoginPage/AuthContext";

const OldUserDashboard = () => {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("userSurname");
  const userRole = localStorage.getItem("userRole");

  const { setToken, token, loading } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !userRole) {
      navigate("/login");
    } else if (userRole === "admin") {
      navigate("/admindash");
    } else if (userRole === "manager") {
      navigate("/managerdash");
    } else if (userRole === "volunteer") {
      navigate("/volunteerdash");
    } else if (userRole === "olduser") {
      //navigate("/olduserdash");
    }
  }, [navigate, token]);

  return (
    <div className="sb-nav-fixed">
      <TopNav userRole={userRole} />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar
            userRole={userRole}
            userName={userName}
            userSurname={userSurname}
          />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Dashboard</h1>
              <div className="row">
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-primary text-white mb-4">
                    <div className="card-body"> Profile</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {/* Change href to the report */}
                      <a
                        className="small text-white stretched-link"
                        href="/profile"
                      >
                        View Details
                      </a>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-danger text-white mb-4">
                    <div className="card-body">Calendar</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {/* Change href to the report */}
                      <a
                        className="small text-white stretched-link"
                        href="/calendar"
                      >
                        View Details
                      </a>
                      <div className="small text-white">
                        <i className="fas fa -angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Add more cards here */}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default OldUserDashboard;
