import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Button.scss";
// import searchbar from "../../../images/searchbar.webp";
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
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("userSurname");
  const userRole = localStorage.getItem("userRole");

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !userRole) {
      navigate("/login");
    } else if (userRole === "admin") {
      getUsers();
    } else if (userRole === "manager") {
      getUsers();
    } else if (userRole === "volunteer") {
      navigate("/volunteerdash");
    } else if (userRole === "olduser") {
      navigate("/olduserdash");
    }
  }, [navigate]);

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://graduate-back-end.onrender.com/volunteers/getallverifiedvol"
      );
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // const deleteUser = (id) => {
  //   axios
  //     .delete(`http://localhost:5000/volunteers/delete/${id}`)
  //     .then(function (response) {
  //       console.log(response.data);
  //       getUsers();
  //     });
  // };

  const changeUserState = (id) => {
    axios
      .patch(`https://graduate-back-end.onrender.com/volunteers/changeState/${id}`)
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

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  // Filter users based on search query, city, state and gender
  const filteredUsers = users
    .filter((user) =>
      `${user.name} ${user.surname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .filter((user) => selectedCity === "all" || user.city === selectedCity)
    .filter(
      (user) => selectedState === "all" || user.userState === selectedState
    )
    .filter(
      (user) =>
        selectedGender === "all" ||
        user.gender?.toLowerCase() === selectedGender.toLowerCase()
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
              <h1 className="mt-4">Volunteer List </h1>
              <h5 className="mt-4"># of Volunteers: {filteredUsers.length}</h5>
              <div className="row">
                <div className="col-xs-12">
                  {/* FILTERS */}
                  <div className="filters-container">
                    <div className="filters-search">
                      <label>Search User:</label>
                      <input
                        type="text"
                        placeholder="Search volunteer"
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
                    <div className="filters-gender">
                      <label>Filter by Gender:</label>
                      <select
                        value={selectedGender}
                        onChange={handleGenderChange}
                      >
                        <option value="all">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="filters-state">
                      <label>Filter by Status:</label>
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
                          {/* <th>id</th> */}
                          <th>Name</th>
                          <th>Surname</th>
                          <th>Email</th>
                          <th>Phone Number</th>
                          <th>Gender</th>
                          <th>Status</th>
                          <th>City</th>
                          <th>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentUsers.map((user, key) => (
                          <tr key={key}>
                            {/* <td>{user.id}</td> */}
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.gender}</td>
                            <td>{user.userState}</td>
                            <td>{user.city}</td>
                            <td>
                              <div className="button-container">
                                <button
                                  className="change-state"
                                  onClick={() => changeUserState(user._id)}
                                >
                                  Edit status
                                </button>
                                {/* <button
                                  className="delete"
                                  onClick={() => deleteUser(user._id)}
                                >
                                  Delete
                                </button> */}
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
