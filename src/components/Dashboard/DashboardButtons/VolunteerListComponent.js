import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Button.scss";

export default function ListUser() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios
      .get("http://localhost:5000/users/getallvol")
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data);
      });
  }
//   const fetchUser =  (id) => {
//     axios
//   .get("http://localhost:5000/users/get/${id}")
//   .then(function (response) {
//     console.log(response.data);
//     setUsers(response.data);
//   });
// }

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/users/delete/${id}`)
      .then(function (response) {
        console.log(response.data);
        getUsers();
      });
  };

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
                <a className="nav-link" href="/calendar">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-table"></i>
                  </div>
                  Calendar
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
          <h1 className="mt-4">Volunteer List</h1>
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Name</th>
                      <th>Surname</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Country</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, key) => (
                      <tr key={key}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>{user.country}</td>
                        <td>{user.city}</td>
                        <td>
                          <Link
                            to={`useredit/${user._id}`}
                            style={{ marginRight: "10px" }}
                          >
                            Edit
                          </Link>
                          <button onClick={() => deleteUser(user._id)}>
                            Delete
                          </button>
                        </td>
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
