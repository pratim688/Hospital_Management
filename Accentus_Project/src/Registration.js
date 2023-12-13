
import React, { useState } from 'react';
import './CSSFile/Registration.css';
import axios from 'axios';

const Registration = () => {
  const [registrationType, setRegistrationType] = useState('patient'); // Default to patient registration
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'registrationType') {
      setRegistrationType(value);
    }else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit =  (e) => {
    e.preventDefault();

    // Check for empty value
    for (const key in formData) {
      if (!formData[key]) {
        alert(`Please fill out ${key} field`);
        return;
      }
    }
      // Check if password and confirm password match
     if (formData.password !== formData.confirmPassword) {
       alert('Password and Confirm Password must match');
       return;
    }
         // Check password strength
       const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
       if (!passwordRegex.test(formData.password)) {
       alert('Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.');
       return;
    }

     // Reset after register successfully
    const resetFormData = {};
      for (const key in formData) {
      resetFormData[key] = '';
     }
    setFormData(resetFormData);

    alert('Registration successful!');


    console.log(`Form submitted for ${registrationType}:`, formData);

     //database connection
     axios.post('http://localhost:5000/register', { ...formData, registrationType})
     .then(res => console.log(res))
     .catch(err => console.log(err));
   

    
    
    
  };

  return (
    <div className="registration-page">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Registration Type:
            <select
              name="registrationType"
              value={registrationType}
              onChange={handleChange}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </label>
        </div>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </label>
         {registrationType === 'doctor' && (
          <div>
            <label>
              Specialization:
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
              >
                <option value="cardiologist">Cardiologist</option>
                <option value="dermatologist">Dermatologist</option>
                <option value="dermatologist">Neurologist</option>
              </select>
            </label>
          </div>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
