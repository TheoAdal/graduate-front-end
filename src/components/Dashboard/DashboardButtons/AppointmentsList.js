import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Button.scss";

import Sidebar from "../DashboardNav/Sidebar";
import TopNav from "../DashboardNav/TopNav";
import Footer from "../DashboardNav/Footer";

import { AuthContext } from "../../Content/LoginPage/AuthContext";

export default function ListAppointments() {
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
  const appointmentsPerPage = 5;

  useEffect(() => {
    if (!token && !userRole) {
      navigate("/login");
    } else if (userRole === "admin" || userRole === "manager") {
      getAppointments();
    } else if (userRole === "volunteer") {
      navigate("/volunteerdash");
    } else if (userRole === "olduser") {
      navigate("/olduserdash");
    }
  }, [navigate]);

  const getAppointments = async () => {
    try {
      const response = await axios.get(
        "https://graduate-back-end.onrender.com/requests/getallrequests"
      );
      console.log("Response data:", response.data);
      response.data.sort((a, b) => {
        const dateA = new Date(a.appointmentDate);
        const dateB = new Date(b.appointmentDate);
        return dateA - dateB;
      });

      setVisits(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
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

  if (state === "future") {
    filteredRequests = visits.filter((visit) => {
      const appointmentDate = new Date(visit.appointmentDate);
      return appointmentDate >= currentDate; // Check if appointment date is greater than or equal to the current date
    });
  } else if (state === "passed") {
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

const handleDateChange = (e) => {
  const date = e.target.value;
  setSelectedDate(date);
  setCurrentPage(1); // Reset page number when filter changes

  filterAppointmentsByDate(date);
};

const filterAppointmentsByDate = (date) => {
  let filteredAppointments = [];

  if (date !== "") {
    filteredAppointments = visits.filter((visit) => {
      return visit.appointmentDate === date;
    });
  } else {
    // If no date is selected, show all appointments based on the current appointment state
    // filteredAppointments(appointmentState);
    return;
  }

  setFilteredAppointments(filteredAppointments);
};

  // const deleteAppointment = (id) => {
  //   axios
  //     .delete(`http://localhost:5000/volunteers/delete/${id}`)
  //     .then(function (response) {
  //       console.log(response.data);
  //       getAppointments();
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting appointment:", error);
  //     });
  // };

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
                {/* <div className="card bg-danger text-white mb-4">
                  <div className="card-body">Create Appointment</div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
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
                </div> */}
                <div className="col-xs-12">
                  <h3 className="mt-4">Appointments List</h3>
                  <div className="filters-container">
                    <div className="filters-state">
                      <label>Appointment State:</label>
                      <select
                        value={appointmentState}
                        onChange={handleStateChange}
                      >
                        <option value="future">Future Appointments</option>
                        <option value="passed">Past Appointments</option>
                        <option value="all">All Appointments</option>
                      </select>
                    </div>
                    <div className="filters-date">
                      <label>Select Date:</label>
                      <input
                        type="date"
                        // id="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                      />
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
                          <th>Date</th>
                          <th>Time</th>
                          <th>Type of Appointment</th>
                          {/* <th>Options</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {currentAppointments.map((visit, key) => (
                          <tr key={key}>
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
                            {/* <td>
                              <div className="button-container">
                                <button
                                  className="delete"
                                  onClick={() => deleteAppointment(visit._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td> */}
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
