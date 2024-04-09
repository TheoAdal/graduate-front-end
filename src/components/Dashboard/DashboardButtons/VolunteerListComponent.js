import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Button.scss";
//import Filter from "./Filters";

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

export default function ListVolunteers() {
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
      getUsers();
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

  const getUsers = async () => {
    try {
      const response = await axios
      .get("http://localhost:5000/volunteers/getallvol");
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/volunteers/delete/${id}`)
      .then(function (response) {
        console.log(response.data);
        getUsers();
      });
  };

  const changeUserState = (id) => {
    axios
      .patch(`http://localhost:5000/volunteers/changeState/${id}`)
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
              <h1 className="mt-4">Volunteer List</h1>
              <div className="row">
                <div className="col-xs-12">
                  <input
                    type="text"
                    placeholder="Search volunteer"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <select value={selectedCity} onChange={handleCityChange}>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <select value={selectedState} onChange={handleStateChange}>
                    {states.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <div className="box">
                    <table className="table table-bordered">
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
                              <button onClick={() => changeUserState(user._id)}>
                                Edit state
                              </button>
                              <button onClick={() => deleteUser(user._id)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    {Array.from({
                      length: Math.ceil(users.length / usersPerPage),
                    }).map((_, index) => (
                      <button
                        key={index}
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
