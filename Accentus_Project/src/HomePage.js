import React, { useState } from 'react';
import './CSSFile/HomePage.css';
import Registration from './Registration';
import LoginPage from './LoginPage';

const HomePage = (props) => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleRegistrationClick = () => {
    setCurrentPage('registration');
  };

  const handleLoginClick = () => {
    setCurrentPage('login');
  };
  const handleType =()=>{
    setCurrentPage(null);
  }
  return (
    <>
    <div className="home-page">
      <nav className="navbar">
        <div className="logo">
          Healthcare Hospital
        </div>
        <div className="nav-buttons">
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleRegistrationClick}>Register</button>
        </div>
      </nav>

      {currentPage === 'home' && (
        <div className="welcome-message">
          <h2>Welcome to Healthcare Hospital</h2>
        </div>
      )
       }
    

      {currentPage === 'registration' && <Registration />}
      {currentPage === 'login' && <LoginPage handleLoginType={props.handleLoginType} handleType={handleType}/>}
    </div>
  
    </>
  );
};

export default HomePage;
