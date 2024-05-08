import React, { useState } from "react";
import axios from "axios";
import "./PasswordPage.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/users/forgot-password",
      { email }
    );
    setMessage(response.data.message);
  };

  return (
    <div className="verification-container">
      <form className="verification-windown" onSubmit={handleSubmit}>
          <h1>Forgot Your Password?</h1>
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
