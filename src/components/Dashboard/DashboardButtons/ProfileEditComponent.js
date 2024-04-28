import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Button.scss";

import Sidebar from "../DashboardNav/Sidebar";
import TopNav from "../DashboardNav/TopNav";
import Footer from "../DashboardNav/Footer";

import { AuthContext } from "../../Content/LoginPage/AuthContext";

//UPDATE USER PROFILE TUTORIAL
//https://www.youtube.com/watch?v=ShejXVOTmKs&ab_channel=SmartSystemSolutions

// Define your functional component
const ProfileEditComponent = () => {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("userSurname");
  const userRole = localStorage.getItem("userRole");

  const navigate = useNavigate(); // Access navigate function for navigation
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token && !userRole) {
      navigate("/login");
    }
  }, [navigate, token]);

  // State variables
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    mobile: "",
    country: "",
    city: "",
    gender: "",
    dateofbirth: "",
    nid: "", //national id number
    medpapers: "",
    password: "",
    confirmpassword: "",
  });

  const [countries, setCountries] = useState([]);

  function fetchUserData() {
    let getUserEndpoint = "";

    switch (userRole) {
      case "admin":
        getUserEndpoint = `http://localhost:5000/admins/get/${userId}`;
        break;
      case "manager":
        getUserEndpoint = `http://localhost:5000/managers/get/${userId}`;
        break;
      case "volunteer":
        getUserEndpoint = `http://localhost:5000/volunteers/get/${userId}`;
        break;
      case "olduser":
        getUserEndpoint = `http://localhost:5000/oldsusers/get/${userId}`;
        break;
      default:
        console.error("Error updating user:");
        return;
    }

    axios
      .get(getUserEndpoint)
      .then(function (response) {
        console.log(response.data);
        const userData = response.data;
        setUser((prevUser) => ({
          ...prevUser,
          ...userData,
        }));
      })
      .catch(function (error) {
        console.error("Error fetching user data:", error);
      });
  }

  useEffect(() => {
    // Fetch list of countries from an API or a local file
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countries = response.data.map((country) => country.name.common);
        setCountries(countries);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });

    fetchUserData();
  }, []);

  // Function to handle form input changes
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/patch/${userId}`, user);
      // Redirect based on userRole after successful update
      switch (userRole) {
        case "admin":
          navigate("/admindash");
          break;
        case "manager":
          navigate("/managerdash");
          break;
        case "volunteer":
          navigate("/volunteerdash");
          break;
        case "olduser":
          navigate("/olduserdash");
          break;
        default:
          console.error("Invalid user role:", userRole);
      }
    } catch (error) {
      console.error("Error updating user:", error);
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
          <div className="container-fluid px-4">
            <h1 className="mt-4">Edit Profile</h1>
            <div className="card-body">
              <div className="form edit">
                <form onSubmit={handleSubmit}>
                  <div className="two-column-form">
                    <div className="column">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={user.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="column">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="surname" className="form-label">
                          Surname
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="surname"
                          name="surname"
                          value={user.surname}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="column">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="column">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="mobile" className="form-label">
                          Mobile
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="mobile"
                          name="mobile"
                          value={user.mobile}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="column">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <select
                          className="form-control"
                          name="country"
                          value={user.country}
                          onChange={handleChange}
                        >
                          <option value="">Select Country</option>
                          {countries.map((country, index) => (
                            <option key={index} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="column">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="city" className="form-label">
                          City
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          name="city"
                          value={user.city}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {/* <div class="column">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="gender" className="form-label">
                          Gender
                        </label>
                        <select
                          className="form-control"
                          name="gender"
                          value={user.gender}
                          onChange={handleChange}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div> */}
                    <div className="column">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="date" className="form-label">
                          Date of birth
                        </label>
                        <input
                          className="form-control"
                          type="date"
                          name="dateofbirth"
                          value={user.dateofbirth}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="column">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="id" className="form-label">
                          National ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nid"
                          name="nid"
                          value={user.nid}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="column">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="column">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="password" className="form-label">
                          Confirm Password
                        </label>
                        <input
                          className="form-control"
                          type="password"
                          name="confirmpassword"
                          value={user.confirmpassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProfileEditComponent;
