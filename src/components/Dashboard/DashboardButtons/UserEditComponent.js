import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Button.scss";

// Define your functional component
const UserEditComponent = () => {
    const { id } = useParams(); // Access the user ID from URL parameters
    const navigate = useNavigate(); // Access navigate function for navigation

    // State variables
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        mobile: '',
        country: '',
        city: '',
        role: ''
    });

    
    useEffect(() => {
        
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/users/${id}`); // Replace 
                setUser(response.data); // Update state with fetched user data
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        
        fetchUser();
    }, [id]); // Dependency array ensures useEffect runs whenever the 'id' parameter changes

    // Function to handle form input changes
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/users/patch${id}`, user); // Replace 
            navigate('/volunteerlist'); // Navigate to the volunteer list page after successful update
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="container">
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="surname" className="form-label">Surname</label>
                    <input type="text" className="form-control" id="surname" name="surname" value={user.surname} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile</label>
                    <input type="text" className="form-control" id="mobile" name="mobile" value={user.mobile} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input type="text" className="form-control" id="country" name="country" value={user.country} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" name="city" value={user.city} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

// Export the component
export default UserEditComponent;