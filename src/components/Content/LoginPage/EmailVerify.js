import { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./EmailVerificationStyles.scss";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const { id, token } = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                console.log("ID:", id, "Token:", token); // Add this line
                const url = `http://localhost:5000/users/${id}/verify/${token}`;
                const response = await axios.get(url);
                console.log('API Response:', response);
                if (response.status === 200) {
                    setValidUrl(true);
                } else {
                    console.log('Non-200 response:', response);
                    setValidUrl(false);
                }
            } catch (error) {
                console.log('Error fetching API:', error);
                setValidUrl(false);//kanonika einai false edw
            }
        };

        verifyEmailUrl();
    }, [id, token]);

    return (
        <div className="verification-container">
            {validUrl ? (
                <div > 
                    <h1>Email verified successfully</h1>
                    <Link to="/login">
                        <button className="green_btn">Go to the Login Page</button>
                    </Link>
                </div>
            ) : (
                <h1>URL NOT WORKING</h1>
            )}
        </div>
    );
};

export default EmailVerify;