import React, { useContext, useState, useEffect} from "react";
import "./AdminDashboard.scss";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Navigate, useNavigate, } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../Content/LoginPage/AuthContext";

function AdminDashboard() {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("userSurname");
  const userRole = localStorage.getItem("userRole");

  const { setToken, token, loading } = useContext(AuthContext);
  
  const navigate = useNavigate();

  //Locks user out of /admindash if !token
  if (loading) {
    return null;
  }
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // const fetchUserData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/users/get/${userId}", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  // useEffect(() => {
  //   const cachedName = localStorage.getItem("userName");
  //   if (cachedName) {
  //     setUserName(cachedName);
  //   } else {
  //     fetchUserData();
  //   }
  // }, [token]);

  // useEffect(() => {
  //   if (userId && token) {
  //     fetchUserData();
  //   }
  // }, [token, userId]);


  //FOR CREATING THE LOGOUT BUTTON
  //https://medium.com/@vrinmkansal/quickstart-jwt-based-login-for-react-express-app-eebf4ea9cfe8

  const handleLogout = () => { // MAKE IT INTO SEPERATE FILE
    setToken(null); // Clear token from context
    localStorage.removeItem("token"); // Remove token from local storage
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole"); // Remove user's role from local storage
    localStorage.removeItem("userName"); // Remove user's name from local storage
    localStorage.removeItem("userSurname"); // Remove user's name from local storage
    navigate("/"); // Navigate user to homepage
  };
  

  return (
    // {/* MAKE SEPARATE FILE FOR THE SIDE BAR TO AVOID writing it all the time*/}
    <div className="sb-nav-fixed">
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/* Navbar Brand */}
        <a className="navbar-brand ps-3" href="/admindash">
          Admin Dashboard
        </a>
        {/* Sidebar Toggle */}
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          href="#"
        >
          <i className="fas fa-bars"></i>
        </button>
        {/* Navbar */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <NavDropdown title="Options" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/profile">Profile</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Addons</div>
                {/* Change href */}
                <a className="nav-link" href="/volunteerlist">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-chart-area"></i>
                  </div>
                  Volunteer List
                </a>
                {/* Change href */}
                <a className="nav-link" href="/olduserlist">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-table"></i>
                  </div>
                  Old User List
                </a>
                {/* Change href */}
                <a className="nav-link" href="/employeelist">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-table"></i>
                  </div>
                  Manager List
                </a>
                {/* Change href */}
                <a className="nav-link" href="/calendar">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-table"></i>
                  </div>
                  Appointments
                </a>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              {userName} {userSurname}
            </div>
          </nav>
        </div> {/* MAKE SEPARATE FILE FOR THE SIDE BAR TO AVOID writing it all the time*/}
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Dashboard</h1>
              <div className="row">
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-primary text-white mb-4">
                    <div className="card-body">Volunteer List</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {/* Change href to the report */}
                      <a className="small text-white stretched-link" href="/volunteerlist">
                        View Details
                      </a>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-warning text-white mb-4">
                    <div className="card-body">Old User List</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {/* Change href to the report */}
                      <a className="small text-white stretched-link" href="/olduserlist">
                        View Details
                      </a>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-success text-white mb-4">
                    <div className="card-body">Manager List</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {/* Change href to the report */}
                      <a className="small text-white stretched-link" href="/employeelist">
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
                    <div className="card-body">Appointments</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {/* Change href to the report */}
                      <a className="small text-white stretched-link" href="/appointmentslist">
                        View Details
                      </a>
                      <div className="small text-white">
                        <i className="fas fa -angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Your Website 2024
                </div>
                <div>
                  <a href="#">Privacy Policy</a>
                  &middot;
                  <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
