import React, { useState } from "react";
import "./RegisterComponent.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// anti gia function RegisterVolunteerComponent() kanoume export to list //
export default function VolunteerListComponent() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
  }
  const handleSubmit = (event) => {
      event.preventDefault();

      axios.post('http://localhost/graduate-config/api/', inputs);
      console.log(inputs); //4306

      axios.post('http://localhost/graduate-config/api/', inputs).then(function(response){
          console.log(response.data);
          navigate('/');
      });
      
  }
  return (
    <div>
      <div className="form-container">
        <h2>Participate as a Volunteer</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name"  onChange={handleChange}/>
          </div>
          <div>
            <label>Surname:</label>
            <input type="text" name="surname"  onChange={handleChange}/>
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email"  onChange={handleChange}/>
          </div>
          <div>
            <label>Phone Number:</label>
            <input type="tel" name="mobile"  maxLength="15" onChange={handleChange}/>
          </div>
          <div>
            <label>City:</label>
            <input type="text" name="city"  onChange={handleChange}/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}


