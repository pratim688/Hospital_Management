
import React, { useState,useEffect } from 'react';
import './CSSFile/DoctorDashboard.css';

const DoctorDashboard = (props) => {
  const [patients, setPatients] = useState([]);

  
  useEffect(()=>{
    const getDoctordata= async()=>{
      const reqData = await fetch('http://localhost:5000/api/appointments');
      const resData = await reqData.json();
      const doctorPatients = resData.filter(patient => patient.doctor_name === props.userName);

         console.log(resData[0].doctor_name);
         console.log(props.userName);
        setPatients(doctorPatients);
      
      console.log(doctorPatients);
    }
    getDoctordata();
  },[props.userName]);

  

  

  return (
    <>
    <div className="dashboard">
    <nav className="navbar">
    <div className="logo">
      Healthcare Hospital
    </div>      
     </nav>
    </div>
    <div className="doctor-dashboard">
      <h1>Welcome, {props.userName}!</h1>
      <h2>Doctor Dashboard</h2>
      <div className="patient-list">
        <h3>Patient List</h3>
        <ul>
          {patients.length>0? (<p>You have appointment(s).</p>):(<p>No appointment requests at the moment.</p>)}
          {patients.map((patient) => (
            <li key={patient.Id}>
              {patient.patient_name} has requested an appointment
                <div>
                  <button>Accept</button>
                  <button >Reject</button>
                </div>
          
            </li>
          ))}
            
        </ul>
      </div>
    </div>
    </>
  );
};

export default DoctorDashboard;
