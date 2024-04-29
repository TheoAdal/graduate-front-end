import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Button.scss";

import Sidebar from "../DashboardNav/Sidebar";
import TopNav from "../DashboardNav/TopNav";
import Footer from "../DashboardNav/Footer";

import { AuthContext } from "../../Content/LoginPage/AuthContext";

// Define your functional component
const RegisterManager = () => {
  const userName = localStorage.getItem("userName");
  const userSurname = localStorage.getItem("userSurname");
  const userRole = localStorage.getItem("userRole");

  const navigate = useNavigate(); // Access navigate function for navigation
  const { token } = useContext(AuthContext);

  const { id } = useParams(); // Access the user ID from URL parameters

  useEffect(() => {
    console.log("Effect is running");
    if (!token && !userRole) {
      navigate("/login");
    } else if (userRole === "admin") {
    } else if (userRole === "manager") {
      navigate("/managerdash");
    } else if (userRole === "volunteer") {
      navigate("/volunteerdash");
    } else if (userRole === "olduser") {
      navigate("/olduserdash");
    }
  }, [navigate, token, userRole]);

  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    email: "",
    mobile: "",
    gender: "male", // Default value
    country: "Cyprus",
    city: "",
    dateofbirth: "",
    password: "",
    nid: "",
    confirmPassword: "",
  });

  // const [countries, setCountries] = useState([]);

  // useEffect(() => {
  //   // Fetch list of countries from an API or a local file
  //   axios
  //     .get("https://restcountries.com/v3.1/all")
  //     .then((response) => {
  //       const countries = response.data.map((country) => country.name.common);
  //       setCountries(countries);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching countries:", error);
  //     });
  // }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if password matches confirm password
    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/managers/registermanager",
        inputs
      ); 
      console.log(response.data);
      alert("Manager registered succesfully, proceed for verification");
      navigate("/employeelist"); // Navigate to the manager list page after successful registration
    } catch (error) {
      console.error("Error registering manager:", error);
      if (error.response && error.response.status === 400) {
        alert("Email address already exists");
      } else {
        alert("An error occurred. Please try again later.");
      }
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
            <h1 className="mt-4">Create Manager</h1>
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
                          value={inputs.name}
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
                          value={inputs.surname}
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
                          value={inputs.email}
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
                          value={inputs.mobile}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {/* <div className="column">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <select
                          className="form-control"
                          name="country"
                          value={inputs.country}
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
                    </div> */}
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
                          value={inputs.city}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="column">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="gender" className="form-label">
                          Gender
                        </label>
                        <select
                          className="form-control"
                          name="gender"
                          value={inputs.gender}
                          onChange={handleChange}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="column">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="date" className="form-label">
                          Date of birth
                        </label>
                        <input
                          className="form-control"
                          type="date"
                          name="dateofbirth"
                          value={inputs.dateofbirth}
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
                          name="nid"
                          value={inputs.nid}
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
                          type={inputs.showPassword ? "text" : "password"}
                          name="password"
                          value={inputs.password}
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
                          name="confirmPassword"
                          value={inputs.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Register Manager
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

// Export the component
export default RegisterManager;
