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

  const [volunteers, setVolunteer] = useState([]);
  const [oldusers, setOldUser] = useState([]);

  //add filter variables here for both volunteers and oldusers

  function getActiveVolunteer() {
    axios
      .get("http://localhost:5000/volunteers/getallactivevol")
      .then(function (response) {
        console.log(response.data);
        setVolunteer(response.data);
      });
  }

  function getActiveOldUser() {
    axios
      .get("http://localhost:5000/oldusers/getallactiveold")
      .then(function (response) {
        console.log(response.data);
        setOldUser(response.data);
      });
  }

  function getVisits() {

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
            {/* <h3 className="mt-4">Create an Appointment</h3> */}
            <div className="col-xs-12">
              <h3 className="mt-4">Old user list</h3>
              <div className="box">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Olduser Name</th>
                      <th>Phone Number </th>
                      <th>City </th>
                    </tr>
                  </thead>
                  <tbody>
                    {oldusers.map((olduser, key) => (
                      <tr key={key}>
                        <td>
                          {olduser.name} {olduser.surname}
                        </td>
                        <td>{olduser.mobile}</td>
                        <td>{olduser.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3 className="mt-4">Volunteer list</h3>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Volunteer Name</th>
                      <th>Phone Number </th>
                      <th>City </th>
                    </tr>
                  </thead>
                  <tbody>
                    {volunteers.map((volunteer, key) => (
                      <tr key={key}>
                        <td>
                          {volunteer.name} {volunteer.surname}
                        </td>
                        <td>{volunteer.mobile}</td>
                        <td>{volunteer.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div class="column">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="date" className="form-label">
                      Pick a date
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      name="dateOfBirth"
                      //value={visit.dateofbirth}
                      //onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  as="textarea"
                  rows={4}
                  name="message"
                  placeholder="Type here"
                />
              </div>
            </div>
            {/* CREATE APPOINTMENT BUTTON */}
          </div>
          </div>
          </main>
          <Footer/>
        </div>
      </div>
    </div>
  );
}
