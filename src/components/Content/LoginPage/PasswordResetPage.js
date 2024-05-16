import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./PasswordPage.scss";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');  // State to hold the confirmed password
    const [message, setMessage] = useState('');
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if passwords match
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;  // Stop the form submission if passwords do not match
        }

        // Attempt to reset password if they do match
        try {
            const response = await axios.post(`http://localhost:5000/users/reset-password/${token}`, { password });
            setMessage(response.data.message);
            alert("Your password has been changed.");
            navigate("/login");
        } catch (error) {
            setMessage("Failed to reset password. Please try again later.");
            console.error("Error resetting password:", error);
        }
    };

    return (
        <div className='verification-container'>
            
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
                <button type="submit" className="green_btn">Update Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
