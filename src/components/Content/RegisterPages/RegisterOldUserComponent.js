import React, { useState } from "react";
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
    gender: "male", // Default value
    country: "",
    city: "Nicosia",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if name and surname are empty
    if (!inputs.name || !inputs.surname) {
      alert("Name and surname are required");
      return;
    }

    // Check if name and surname are empty
    if (!inputs.email ) {
      alert("Email is required");
      return;
    }

    // Check if mobile number is between 8-10 digits
    if (inputs.mobile.length < 8 || inputs.mobile.length > 10) {
      alert("Phone number must be between 8 to 10 digits");
      return;
    }

    // Check if password matches confirm password
    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check password strength
    const passwordStrength = checkPasswordStrength(inputs.password);
    if (passwordStrength !== "strong") {
      alert("Please choose a stronger password. ");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/oldusers/registerolduser", 
        inputs
      );
      console.log(response.data);
      alert("User registered succesfully, check your email for verification");
      navigate("/login"); //login redirect
    } catch (error) {
      //Email validation
      console.error("Error registering volunteer:", error);
      if (error.response && error.response.status === 400) {
        alert("Email address already exists");
      } else {
        alert("An error occurred.Please try again later.");
      }
    }
  };

  const checkPasswordStrength = (password) => {
    // Define criteria for a strong password
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    // Check if the password matches the criteria
    if (strongPasswordRegex.test(password)) {
      return "strong";
    } else {
      return "weak";
    }
  };

  return (
    <div>
      <div className="form-container">
        <h2>Participate as a Beneficiary</h2>
        <form className="register-form" onSubmit={handleSubmit}>
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
            <label>Gender:</label>
            <select name="gender" value={inputs.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>City:</label>
            <select
              type="text"
              name="city"
              value={inputs.city}
              onChange={handleChange}
            >
              <option value="Nicosia">Nicosia</option>
              <option value="Limassol">Limassol</option>
              <option value="Famagusta">Famagusta</option>
              <option value="Paphos">Paphos</option>
              <option value="Kyrenia">Kyrenia</option>
              <option value="Protaras">Protaras</option>
              <option value="Polis">Polis</option>
              <option value="Ayia Napa">Ayia Napa</option>
              <option value="Troodos">Troodos</option>
            </select>
          </div>
          <div>
            <label>Password:</label>
            <input
              type={inputs.showPassword ? "text" : "password"}
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
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
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
