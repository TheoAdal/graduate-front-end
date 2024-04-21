import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Button.scss";

import Sidebar from "../DashboardNav/Sidebar";
import TopNav from "../DashboardNav/TopNav";
import Footer from "../DashboardNav/Footer";

import { AuthContext } from "../../Content/LoginPage/AuthContext";

const cities = [
  "all", // default value
  "Nicosia",
  "Limassol",
  "Larnaca",
  "Famagusta",
  "Paphos",
  "Kyrenia",
  "Protaras",
  "Polis",
  "Ayia Napa",
  "Troodos",
];

const states = ["all", "active", "inactive"];

export default function ListManagers() {
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
      getUsers();
    } else if (userRole == "manager") {
      navigate("/managerdash");
    } else if (userRole == "volunteer") {
      navigate("/volunteerdash");
    } else if (userRole == "olduser") {
      navigate("/olduserdash");
    }
  }, [navigate, token]);

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 2;

  function getUsers() {
    axios
      .get("http://localhost:5000/managers/getallmanagers")
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data);
      });
  }

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/managers/delete/${id}`)
      .then(function (response) {
        console.log(response.data);
        getUsers();
      });
  };

  const changeUserState = (id) => {
    axios
      .patch(`http://localhost:5000/managers/changeState/${id}`)
      .then(function (response) {
        console.log(response.data);
        getUsers();
      });
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setCurrentPage(1); // Reset current page when city changes
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setCurrentPage(1); // Reset current page when state changes
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset current page when search query changes
  };

  // Filter users based on search query, city, and state
  const filteredUsers = users
    .filter((user) =>
      `${user.name} ${user.surname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .filter((user) => selectedCity === "all" || user.city === selectedCity)
    .filter(
      (user) => selectedState === "all" || user.userState === selectedState
    );

  // Paginate filtered users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
                  <div className="card-body">Create Manager</div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    {/* Change href to the report */}
                    <a
                      className="small text-white stretched-link"
                      href="/registermanager"
                    >
                      View Details
                    </a>
                    <div className="small text-white">
                      <i className="fas fa -angle-right"></i>
                    </div>
                  </div>
                </div>
                <h1 className="mt-4">Manager List</h1>
                <div className="col-xs-12">
                  <div className="filters-container">
                    <div className="filters-search">
                      <label>Search User:</label>
                      <input
                        type="text"
                        placeholder="Search manager"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                    <div className="filters-city">
                      <label>Filter by City:</label>
                      <select value={selectedCity} onChange={handleCityChange}>
                        {cities.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="filters-state">
                      <label>Filter by State:</label>
                      <select
                        value={selectedState}
                        onChange={handleStateChange}
                      >
                        {states.map((state, index) => (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="table-container-user">
                    <table className="table-user">
                      <thead>
                        <tr>
                          <th>id</th>
                          <th>Name</th>
                          <th>Surname</th>
                          <th>Email</th>
                          <th>Phone Number</th>
                          <th>State</th>
                          <th>City</th>
                          <th>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentUsers.map((user, key) => (
                          <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.userState}</td>
                            <td>{user.city}</td>
                            <td>
                              <div className="button-container">
                                <button
                                  className="change-state"
                                  onClick={() => changeUserState(user._id)}
                                >
                                  Edit state
                                </button>
                                <button
                                  className="delete"
                                  onClick={() => deleteUser(user._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="pagination-container">
                    {Array.from({
                      length: Math.ceil(filteredUsers.length / usersPerPage),
                    }).map((_, index) => (
                      <button
                        key={index}
                        className={`pagination-button ${
                          currentPage === index + 1 ? "active" : ""
                        }`} // Added active class for current page
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
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
