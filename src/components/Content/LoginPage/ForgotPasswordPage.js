import React, { useState } from "react";
import axios from "axios";
import "./PasswordPage.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{const response = await axios.post(
      "http://localhost:5000/users/forgot-password",
      { email }
    );
    alert("An email has been sent to you, please check your inbox!");
    setMessage(response.data.message);
  } catch (error) {
    // alert("Failed to sent email.");
    if (error.response && error.response.status === 404) {
      alert("There is no account with this email address");
    } else {
      alert("An error occurred. Please try again later.");
    }
}
    
  };

  return (
    <div className="verification-container">
      <form className="verification-windown" onSubmit={handleSubmit}>
          <h2>Forgot Your Password?</h2>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            className=""
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="green_btn">
            Send Reset Link
          </button>
        
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
