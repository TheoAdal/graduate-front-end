import { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
// import success from "../../images/success.png";
//import styles from "./EmailVerificationStyles.scss";
// import { Fragment } from "react/cjs/react.production.min";

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
                setValidUrl(true);
            }
        };

        verifyEmailUrl();
    }, [id, token]);

    return (
        <div>
            {validUrl ? (
                <div> 
                    <h1>Email verified successfully</h1>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            ) : (
                <h1>URL NOT WORKING</h1>
            )}
        </div>
    );
};

export default EmailVerify;