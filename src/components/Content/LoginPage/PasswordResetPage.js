import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./PasswordPage.scss";

//////////////////MUST ADD TOKEN CHECK/////////////////

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State to hold the confirmed password
  const [message, setMessage] = useState("");
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password strength
    const passwordStrength = checkPasswordStrength(password);
    if (passwordStrength !== "strong") {
      alert(
        "Please choose a stronger password. Try a mix of letters numbers and symbols"
      );
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return; // Stop the form submission if passwords do not match
    }

    // Attempt to reset password if they do match
    try {
      const response = await axios.post(
        `https://graduate-back-end.onrender.com/users/reset-password/${token}`,
        { password }
      );
      setMessage(response.data.message);
      alert("Your password has been changed.");
      navigate("/login");
    } catch (error) {
      setMessage("Failed to reset password. Please try again later.");
      console.error("Error resetting password:", error);
    }
  };

  const checkPasswordStrength = (password) => {
    // Define criteria for a strong password
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Check if the password matches the criteria
    if (strongPasswordRegex.test(password)) {
      return "strong";
    } else {
      return "weak";
    }
  };

  return (
    <div className="verification-container">
      <form className="verification-windown" onSubmit={handleSubmit}>
        <h2>Reset Your Password</h2>
        <label>New Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="green_btn">
          Update Password
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
