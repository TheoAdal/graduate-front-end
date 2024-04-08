import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Button.scss";

import Sidebar from "../DashboardNav/Sidebar";
import TopNav from "../DashboardNav/TopNav";
import Footer from "../DashboardNav/Footer";

import { AuthContext } from "../../Content/LoginPage/AuthContext";

export default function ListUser() {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("userSurname");
  const userRole = localStorage.getItem("userRole");

  const { setToken, token, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [volunteers, setVolunteer] = useState([]);
  const [oldusers, setOldUser] = useState([]);

  useEffect(() => {
    if (!token && !userRole) {
      navigate("/login");
    } else if (userRole == "admin") {
      getActiveVolunteer();
      getActiveOldUser();
    } else if (userRole == "manager") {
      getActiveVolunteer();
      getActiveOldUser();
    } else if (userRole == "volunteer") {
      navigate("/volunteerdash");
    } else if (userRole == "olduser") {
      navigate("/olduserdash");
    }
  }, [navigate, token]);

  function getActiveVolunteer() {
    //THA ALLAKSEI OTAN KANW TA CREATEAPPOINTMENTS
    axios
      .get("http://localhost:5000/volunteers/getallactivevol")
      .then(function (response) {
        console.log(response.data);
        setVolunteer(response.data);
      });
  }

  function getActiveOldUser() {
    //THA ALLAKSEI OTAN KANW TA CREATEAPPOINTMENTS
    axios
      .get("http://localhost:5000/oldusers/getallactiveold")
      .then(function (response) {
        console.log(response.data);
        setOldUser(response.data);
      });
  }

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
              <div className="row">
                <div className="card bg-danger text-white mb-4">
                  <div className="card-body">Create Appointment</div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    {/* Change href to the report */}
                    <a
                      className="small text-white stretched-link"
                      href="/createappointment"
                    >
                      View Details
                    </a>
                    <div className="small text-white">
                      <i className="fas fa -angle-right"></i>
                    </div>
                  </div>
                </div>
                {/* <h3 className="mt-4">Create an Appointment</h3> */}
                <div className="col-xs-12">
                  <h3 className="mt-4">Appointments List</h3>
                  <div className="box">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Olduser Name</th>
                          <th>Phone Number </th>
                          <th>Volunteer Name</th>
                          <th>Phone Number </th>
                          <th>Date</th>
                          <th>Kind of Appointment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {oldusers.map(
                          (
                            olduser,
                            index // OLA TA MAPS THA ALLKSOUN KAI THA MPEI TO VISIT
                          ) => (
                            <tr key={index}>
                              <td>
                                {olduser.name} {olduser.surname}
                              </td>
                              <td>{olduser.mobile}</td>
                              {volunteers[index] && (
                                <>
                                  <td>
                                    {volunteers[index].name}{" "}
                                    {volunteers[index].surname}
                                  </td>
                                  <td>{volunteers[index].mobile}</td>
                                </>
                              )}
                              <td>Date Placeholder</td>
                              <td>Appointment Type Placeholder</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
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
