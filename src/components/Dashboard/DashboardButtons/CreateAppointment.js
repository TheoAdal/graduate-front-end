import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function CreateAppointment() {
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("userSurname");
  const userRole = localStorage.getItem("userRole");

  const {token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Effect is running");
    if (!token && !userRole) {
      navigate("/login");
    } else if (userRole === "admin" || userRole === "manager") {
      getActiveVolunteer();
      getActiveOldUser();
    } else if (userRole === "volunteer") {
      navigate("/volunteerdash");
    } else if (userRole === "olduser") {
      navigate("/olduserdash");
    }
  }, [navigate, token, userRole]);

  //variables for volunteers and oldusers respectively

  const [volunteers, setVolunteer] = useState([]);
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);
  const [searchVolunteerQuery, setSearchVolunteerQuery] = useState("");
  const [selectedVolunteerCity, setSelectedVolunteerCity] = useState("all");
  const [currentVolunteerPage, setCurrentVolunteerPage] = useState(1);
  const volunteersPerPage = 2;

  const [oldusers, setOldUser] = useState([]);
  const [selectedOldUserId, setSelectedOldUserId] = useState(null);
  const [searchOldUserQuery, setSearchOldUserQuery] = useState("");
  const [selectedOldUserCity, setSelectedOldUserCity] = useState("all");
  const [currentOldUserPage, setCurrentOldUserPage] = useState(1);
  const oldUsersPerPage = 2;

  const [appointmentdate, setAppointmentDate] = useState("");
  const [appointmenttime, setAppointmentTime] = useState("");
  const [description, setDescription] = useState("");

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

  const handleVolunteerCityChange = (e) => {
    setSelectedVolunteerCity(e.target.value);
    setCurrentVolunteerPage(1); // Reset current page when city changes
  };

  const handleVolunteerSearchChange = (e) => {
    setSearchVolunteerQuery(e.target.value);
    setCurrentVolunteerPage(1); // Reset current page when search query changes
  };

  // Filter users based on search query, city
  const filteredVolunteers = volunteers
    .filter((volunteer) =>
      `${volunteer.name} ${volunteer.surname}`
        .toLowerCase()
        .includes(searchVolunteerQuery.toLowerCase())
    )
    .filter(
      (volunteer) =>
        selectedVolunteerCity === "all" ||
        volunteer.city === selectedVolunteerCity
    );

  // Paginate filtered users
  const indexOfLastVolunteer = currentVolunteerPage * volunteersPerPage;
  const indexOfFirstVolunteer = indexOfLastVolunteer - volunteersPerPage;
  const currentVolunteers = filteredVolunteers.slice(
    indexOfFirstVolunteer,
    indexOfLastVolunteer
  );

  const handleVolunteerPageChange = (pageNumber) => {
    setCurrentVolunteerPage(pageNumber);
  };

  function handleVolunteerCheckboxChange(event, volunteerId) {
    if (event.target.checked) {
      // If checked, set selected volunteer ID
      setSelectedVolunteerId(volunteerId);
      console.log("Selected volunteer ID:", volunteerId);
    } else {
      // If unchecked, reset ID
      setSelectedVolunteerId(null);
      console.log("Selected volunteer ID reset");
    }
  }

  const handleOldUserCityChange = (e) => {
    setSelectedOldUserCity(e.target.value);
    setCurrentOldUserPage(1); // Reset current page when city changes
  };

  const handleOldUserSearchChange = (e) => {
    setSearchOldUserQuery(e.target.value);
    setCurrentOldUserPage(1); // Reset current page when search query changes
  };

  // Filter users based on search query, city
  const filteredOldUsers = oldusers
    .filter((olduser) =>
      `${olduser.name} ${olduser.surname}`
        .toLowerCase()
        .includes(searchOldUserQuery.toLowerCase())
    )
    .filter(
      (olduser) =>
        selectedOldUserCity === "all" || olduser.city === selectedOldUserCity
    );

  // Paginate filtered users
  const indexOfLastOldUser = currentOldUserPage * oldUsersPerPage;
  const indexOfFirstOldUser = indexOfLastOldUser - oldUsersPerPage;
  const currentOldUsers = filteredOldUsers.slice(
    indexOfFirstOldUser,
    indexOfLastOldUser
  );

  const handleOldUserPageChange = (pageNumber) => {
    setCurrentOldUserPage(pageNumber);
  };

  function handleOldUserCheckboxChange(event, oldUserId) {
    if (event.target.checked) {
      // If checked, set selected old user ID
      setSelectedOldUserId(oldUserId);
      console.log("Selected old user ID:", oldUserId);
    } else {
      // If unchecked, reset selected old user ID
      setSelectedOldUserId(null);
      console.log("Selected old user ID reset");
    }
  }

  const handleCreateAppointment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/visits/createappointment`,
        {
          vol_id: selectedVolunteerId,
          old_id: selectedOldUserId,
          appointmentdate: appointmentdate,
          appointmenttime: appointmenttime,
          description: description,
        }
      );
      alert("Appointment created succesfully");
      navigate("/appointmentslist");                           //appointments list redirect
      console.log("Appointment created successfully:", response.data);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
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
                {/* <h3 className="mt-4">Create an Appointment</h3> */}
                <div className="col-xs-12">
                  <h3 className="mt-4">Old user list</h3>
                  <div className="filters-container">
                    <div className="filters-search">
                      <label>Search OldUser:</label>
                      <input
                        type="text"
                        placeholder="Search olduser"
                        value={searchOldUserQuery}
                        onChange={handleOldUserSearchChange}
                      />
                    </div>
                    <div className="filters-city">
                      <label>Filter by City:</label>
                      <select
                        value={selectedOldUserCity}
                        onChange={handleOldUserCityChange}
                      >
                        {cities.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
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
                          <th>Olduser Name</th>
                          <th>Phone Number </th>
                          <th>City </th>
                          <th>Check</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentOldUsers.map((olduser, key) => (
                          <tr key={key}>
                            <td>{olduser._id}</td>
                            <td>
                              {olduser.name} {olduser.surname}
                            </td>
                            <td>{olduser.mobile}</td>
                            <td>{olduser.city}</td>
                            <td>
                              <div className="check-container">
                                <input
                                  type="checkbox"
                                  checked={selectedOldUserId === olduser._id}
                                  onChange={(e) =>
                                    handleOldUserCheckboxChange(e, olduser._id)
                                  }
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="pagination-container">
                    {Array.from({
                      length: Math.ceil(
                        filteredOldUsers.length / oldUsersPerPage
                      ),
                    }).map((_, index) => (
                      <button
                        key={index}
                        className={`pagination-button ${
                          currentOldUserPage === index + 1 ? "active" : ""
                        }`}
                        onClick={() => handleOldUserPageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  <h3 className="mt-4">Volunteer list</h3>
                  <div className="filters-container">
                    <div className="filters-search">
                      <label>Search Volunteer:</label>
                      <input
                        type="text"
                        placeholder="Search volunteer"
                        value={searchVolunteerQuery}
                        onChange={handleVolunteerSearchChange}
                      />
                    </div>
                    <div className="filters-city">
                      <label>Filter by City:</label>
                      <select
                        value={selectedVolunteerCity}
                        onChange={handleVolunteerCityChange}
                      >
                        {cities.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
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
                          <th>Volunteer Name</th>
                          <th>Phone Number </th>
                          <th>City </th>
                          <th>Check</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentVolunteers.map((volunteer, key) => (
                          <tr key={key}>
                            <td>{volunteer._id}</td>
                            <td>
                              {volunteer.name} {volunteer.surname}
                            </td>
                            <td>{volunteer.mobile}</td>
                            <td>{volunteer.city}</td>
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedVolunteerId === volunteer._id}
                                onChange={(e) =>
                                  handleVolunteerCheckboxChange(
                                    e,
                                    volunteer._id
                                  )
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="pagination-container">
                    {Array.from({
                      length: Math.ceil(
                        filteredVolunteers.length / volunteersPerPage
                      ),
                    }).map((_, index) => (
                      <button
                        key={index}
                        className={`pagination-button ${
                          currentVolunteerPage === index + 1 ? "active" : ""
                        }`} // Added active class for current page
                        onClick={() => handleVolunteerPageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  <div className="appointment-creation">
                    <div className="date-time-container">
                      <div className="appointment-date">
                        <label htmlFor="date" className="form-label">
                          Pick a date:
                        </label>
                        <input
                          className="form-control"
                          type="date"
                          name="appointmentdate"
                          value={appointmentdate}
                          onChange={(e) => setAppointmentDate(e.target.value)}
                        />
                      </div>

                      <div className="appointment-time">
                        <label htmlFor="time" className="form-label">
                          Pick a time:
                        </label>
                        <input
                          className="form-control"
                          type="time"
                          name="appointmenttime"
                          value={appointmenttime}
                          onChange={(e) => setAppointmentTime(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* </div> */}
                    <div className="appointment-description">
                      <label htmlFor="description" className="form-label">
                        Description:
                      </label>
                      <textarea
                        as="textarea"
                        className="textarea-description"
                        rows={4}
                        name="message"
                        placeholder="Type here"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-primary"
                      onClick={handleCreateAppointment}
                    >
                      Create Appointment
                    </button>
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
