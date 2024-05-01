import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Button.scss";

import Sidebar from "../DashboardNav/Sidebar";
import TopNav from "../DashboardNav/TopNav";
import Footer from "../DashboardNav/Footer";

import { AuthContext } from "../../Content/LoginPage/AuthContext";

export default function ListAppointments() {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("userSurname");
  const userRole = localStorage.getItem("userRole");

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [visits, setVisits] = useState([]);
  const [appointmentState, setAppointmentState] = useState("pending");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 3;

  useEffect(() => {
    if (!token && !userRole) {
      navigate("/login");
    } else if (userRole === "admin") {
      navigate("/admindash");
    } else if (userRole === "manager") {
      navigate("/managerdash");
    } else if (userRole === "volunteer" || userRole === "olduser") {
      getAcceptedRequests();
    }
  }, [navigate, token, userRole]);

  const getAcceptedRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/requests/appointmentrequests/accepted/${userId}`
      );
      console.log("Accepted Requests:", response.data);
      response.data.sort((a, b) => {
        const dateA = new Date(a.appointmentDate);
        const dateB = new Date(b.appointmentDate);
        return dateA - dateB;
      });

      setVisits(response.data);
    } catch (error) {
      console.error("Error fetching accepted requests:", error);
    }
  };

  const handleStateChange = (e) => {
    setAppointmentState(e.target.value);
    setCurrentPage(1); // Reset page number when filter changes
    filterAcceptedRequests(e.target.value);
  };

  const currentDate = new Date(); // Get the current date

  const filterAcceptedRequests = (state) => {
    let filteredRequests = [];
  
    if (state === "pending") {
      filteredRequests = visits.filter((visit) => {
        const appointmentDate = new Date(visit.appointmentDate);
        return appointmentDate >= currentDate; // Check if appointment date is greater than or equal to the current date
      });
    } else if (state === "expired") {
      filteredRequests = visits.filter((visit) => {
        const appointmentDate = new Date(visit.appointmentDate);
        return appointmentDate < currentDate; // Check if appointment date is less than the current date
      });
    } else if (state === "all") {
      // Show all appointments
      filteredRequests = [...visits];
    }
  
    setFilteredAppointments(filteredRequests);
  };

  // Paginate filtered appointments
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

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
                <div className="col-xs-12">
                  <h3 className="mt-4">My Appointments</h3>
                  <div className="filters-container">
                    <div className="filters-state">
                      <label htmlFor="filter">Appointment State:</label>
                      <select
                        id="filter"
                        value={appointmentState}
                        onChange={handleStateChange}
                      >
                        <option value="pending">Pending Appointments</option>
                        <option value="expired">Expired Appointments</option>
                        <option value="all">All Appointments</option>
                      </select>
                    </div>
                  </div>
                  <div className="table-container-user">
                    <table className="table-user">
                      {/* Table headers */}
                      <thead>
                        <tr>
                          <th>Olduser Name</th>
                          <th>Phone Number</th>
                          <th>Volunteer Name</th>
                          <th>Phone Number</th>
                          <th>Appointment Date</th>
                          <th>Appointment Time</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Appointments data */}
                        {currentAppointments.map((visit, index) => (
                          <tr key={index}>
                            <td>
                              {visit.oldUserId
                                ? `${visit.oldUserId.name} ${visit.oldUserId.surname}`
                                : "N/A"}
                            </td>
                            <td>
                              {visit.oldUserId ? visit.oldUserId.mobile : "N/A"}
                            </td>
                            <td>
                              {visit.acceptedBy
                                ? `${visit.acceptedBy.name} ${visit.acceptedBy.surname}`
                                : "N/A"}
                            </td>
                            <td>
                              {visit.acceptedBy
                                ? visit.acceptedBy.mobile
                                : "N/A"}
                            </td>
                            <td>{visit.appointmentDate}</td>
                            <td>{visit.appointmentTime}</td>
                            <td>{visit.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="pagination-container">
                      {Array.from({
                        length: Math.ceil(
                          filteredAppointments.length / appointmentsPerPage
                        ),
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
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
