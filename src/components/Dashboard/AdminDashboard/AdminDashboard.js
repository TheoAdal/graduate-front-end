import React, { useContext, useState, useEffect } from "react";
import "./AdminDashboard.scss";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../DashboardNav/Sidebar";
import TopNav from "../DashboardNav/TopNav";
import Footer from "../DashboardNav/Footer";

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

  //FOR CREATING THE LOGOUT BUTTON
  //https://medium.com/@vrinmkansal/quickstart-jwt-based-login-for-react-express-app-eebf4ea9cfe8

  

  return (
    // {/* MAKE SEPARATE FILE TO AVOID writing it all the time*/}
    <div className="sb-nav-fixed">
      <TopNav userRole={userRole}/>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar userRole={userRole} userName={userName} userSurname={userSurname} />
        </div>
        {/* MAKE SEPARATE FILE FOR THE SIDE BAR TO AVOID writing it all the time*/}
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
                      <a
                        className="small text-white stretched-link"
                        href="/volunteerlist"
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
                  <div className="card bg-warning text-white mb-4">
                    <div className="card-body">Old User List</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {/* Change href to the report */}
                      <a
                        className="small text-white stretched-link"
                        href="/olduserlist"
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
                  <div className="card bg-success text-white mb-4">
                    <div className="card-body">Manager List</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {/* Change href to the report */}
                      <a
                        className="small text-white stretched-link"
                        href="/employeelist"
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
                    <div className="card-body">Appointments</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {/* Change href to the report */}
                      <a
                        className="small text-white stretched-link"
                        href="/appointmentslist"
                      >
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
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

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
