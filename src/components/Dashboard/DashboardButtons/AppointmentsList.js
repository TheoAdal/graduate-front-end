import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Button.scss";

export default function ListUser() {
    const [volunteers, setVolunteer] = useState([]);
    const [oldusers, setOldUser] = useState([]);

    useEffect(() => {
        getActiveVolunteer();
        getActiveOldUser();
    }, []);
  
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



    return (
        <div className="sb-nav-fixed">
          <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            {/* Navbar Brand */}
            <a className="navbar-brand ps-3" href="#">
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
                  <Link to="/login">Logout</Link>
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
                    <a className="nav-link" href="/appointmentslist">
                      <div className="sb-nav-link-icon">
                        <i className="fas fa-table"></i>
                      </div>
                      Appointments
                    </a>
                  </div>
                </div>
                <div className="sb-sidenav-footer">
                  <div className="small">Logged in as:</div>
                  Admin
                </div>
              </nav>
            </div>
            <div className="container-fluid px-4">
              
              <div className="row">
              <div className="card bg-danger text-white mb-4">
                    <div className="card-body">Create Appointment</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      {/* Change href to the report */}
                      <a className="small text-white stretched-link" href="/createappointment">
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
                      {oldusers.map((olduser, index) => (// OLA TA MAPS THA ALLKSOUN KAI THA MPEI TO VISIT 
                        <tr key={index}>
                          <td>{olduser.name} {olduser.surname}</td>
                          <td>{olduser.mobile}</td>
                          {volunteers[index] && (
                            <>
                              <td>{volunteers[index].name} {volunteers[index].surname}</td>
                              <td>{volunteers[index].mobile}</td>
                            </>
                          )}
                          <td>Date Placeholder</td> 
                          <td>Appointment Type Placeholder</td> 
                        </tr>
                      ))}
                    </tbody>
                    </table>
                  </div>
                </div>
              </div>
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