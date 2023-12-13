// PatientDashboard.js
import React, { useEffect, useState } from 'react';
import './CSSFile/PatientDashboard.css';
import axios from 'axios';

const PatientDashboard = (props) => {

  
 
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleRequestAppointment = () => {
    console.log('Requesting appointment with:',props.userName+"  "+selectedDoctor.firstName);
    axios.post('http://localhost:5000/appointments',{
      userName: props.userName,
      selectedDoctor: selectedDoctor,
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
   
    

  };
   
  //fetch the data from doctor table
  const [userData,setUserData] = useState([]);
  useEffect(()=>{
    const getUserdata= async()=>{
      const reqData = await fetch('http://localhost:5000/api/doctor');
      const resData = await reqData.json();
      setUserData(resData);
      console.log(resData);
    }
    getUserdata();
  },[]);
  //fetch 

  
  return (
    <div className="patient-dashboard">
      <h1>Welcome, {props.userName}!</h1>
      <h2>Patient Dashboard</h2>
      <div className="doctor-list">
        <h3>Available Doctors</h3>
        <ul>
          {userData.map((doctor) => (
            <li key={doctor.doctor_id} onClick={() => handleSelectDoctor(doctor)}>
              {doctor.firstName} - {doctor.specialization}
            </li>
          ))}
        </ul>
      </div>
      {selectedDoctor && (
        <div className="appointment-request">
          <h3>Appointment Request</h3>
          <p>Selected Doctor: {selectedDoctor.firstName}</p>
          <button onClick={handleRequestAppointment}>Request Appointment</button>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
