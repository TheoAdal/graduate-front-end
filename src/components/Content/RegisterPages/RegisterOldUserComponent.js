import React, { useState, useEffect } from "react";
import "./RegisterComponent.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterOldUserComponent() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    email: "",
    mobile: "",
    country: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [countries, setCountries] = useState([]);

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
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  // const togglePasswordVisibility = () => {
  //   setInputs((prevInputs) => ({ ...prevInputs, showPassword: !prevInputs.showPassword }));
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if password matches confirm password
    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/users/registerolduser",
        inputs
      ); //localhost:5000/olduser/register
      console.log(response.data);
      navigate("/olduserdash");
    } catch (error) {
      console.error("Error registering volunteer:", error);
    }
  };

  return (
    <div>
      <div className="form-container">
        <h2>Participate as a Person in Need</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Surname:</label>
            <input
              type="text"
              name="surname"
              value={inputs.surname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="tel"
              name="mobile"
              maxLength="15"
              value={inputs.mobile}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Country:</label>
            <select
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
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={inputs.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type={inputs.showPassword ? "text" : "password"}
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            {/* <button type="button" onClick={togglePasswordVisibility}>
              {inputs.showPassword ? "Hide" : "Show"}
            </button> */}
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
