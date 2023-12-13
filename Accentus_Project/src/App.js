import { useState } from 'react';
import HomePage from './HomePage';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';

function App() {
  const [loginType, setLoginType] = useState(null);
  const [userName, setUserName] = useState(null);

  const handleLoginType = (type, name) => {
    setLoginType(type);
    setUserName(name);
  };

  return (
    <>
      {!loginType && <HomePage handleLoginType={handleLoginType} />}
      {loginType === 'doctor' && (
        <DoctorDashboard userName={userName} />
      )}
      {loginType === 'patient' && (
        <PatientDashboard userName={userName} />
      )}
    </>
  );
}

export default App;
