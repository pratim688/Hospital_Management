
import React, { useState} from 'react';
import './CSSFile/LoginPage.css';
import axios from 'axios';



const LoginPage = (props) => {
  const [loginType, setLoginType] = useState('patient');
  
   
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
 
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      alert('Please fill out all required fields');
      return;
    }
  
    setLoginData({
      email: '',
      password: '',
    });
  
    const loginEndPoint = 'http://localhost:5000/login';
    axios.post(loginEndPoint, { ...loginData, loginType })
      .then(res => {
        if (res.data.status === 'Success') {
          if (loginType === 'doctor') {
           
            props.handleLoginType('doctor', res.data.user.firstName);
          } else {
            props.handleLoginType('patient', res.data.user.firstName);
          }
        } else {
          alert('Invalid Login');
        }
      })
      .catch(err => console.log('error'));
  };
  

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
      <div>
          <label>
            Login Type:
            <select
              name="loginType"
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </label>
        </div>

       <div className="login-form">
        <label htmlFor="emailOrPhone">Email:</label>
        <input
          type="text"
          id="emailOrPhone"
          name="email"
          value={loginData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </div>
      </form>
   

    </div>
    
  );
};

export default LoginPage;

