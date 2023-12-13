const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pratim@2001',
  database: 'hospital_management',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Endpoint to handle registration
app.post('/register', (req, res) => {
  const { registrationType, firstName, lastName, phone, email, password,specialization} = req.body;

  // Choose the appropriate table based on registrationType
  
  const tableName = registrationType === 'doctor' ? 'doctors' : 'patients';
  const doctorSpecialization = specialization || 'Cardiologist';
 
  // If table name is doctor
   if(tableName == 'doctors'){
    const sql = `INSERT INTO ${tableName} (firstName, lastName, phone, email, password,specialization) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [firstName, lastName, phone, email, password,doctorSpecialization], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      console.log('Registration successful');
      res.status(200).send('Registration successful');
    });
   }else{


     console.log(tableName);
  const sql = `INSERT INTO ${tableName} (firstName, lastName, phone, email, password) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [firstName, lastName, phone, email, password], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log('Registration successful');
    res.status(200).send('Registration successful');
  });
       }
      
});

//login page database connection


app.post('/login', (req, res) => {
  const { loginType, email, password } = req.body;
  const tableName = loginType === 'doctor' ? 'doctors' : 'patients';

  const sql = `SELECT * FROM ${tableName} WHERE email = ? AND password = ?`;
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (result.length > 0) {
      if (loginType === 'patient') {
        // If the login is for a patient, fetch the patient's name
        const patientId = result[0].patient_id; // Adjust the column name accordingly
        const patientNameQuery = 'SELECT firstName FROM patients WHERE patient_id = ?';
        
        db.query(patientNameQuery, [patientId], (errName, resultName) => {
          if (errName) {
            console.error('Error fetching patient name:', errName);
            res.status(500).send('Internal Server Error');
            return;
          }

          if (resultName.length > 0) {
            const patientName = resultName[0].firstName;
            res.json({ status: 'Success', user: { ...result[0], patientName } });
          } else {
            res.json({ status: 'Failed', message: 'Patient name not found' });
          }
        });
      } else {
        // For other login types (e.g., doctor), return the result without fetching the name
        res.json({ status: 'Success', user: result[0] });
      }
    } else {
      res.json({ status: 'Failed' });
    }
  });
});



app.get('/api/doctor', (req, res) => {
  
  const sql = 'SELECT * FROM doctors ';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
       
       return  res.json(results);
  });
});
//appointment database connection
app.post('/appointments', (req, res) => {
  const { userName, selectedDoctor } = req.body;
  const insertQuery = 'INSERT INTO appointments (doctor_name, patient_name) VALUES (?, ?)';
  db.query(insertQuery, [selectedDoctor.firstName, userName], (error, results) => {
    if (error) {
      console.error('Error inserting appointment:', error);
    } else {
      console.log('Appointment requested successfully');
      
    }
  });
});

//Show appointsment in doctor login page
app.get('/api/appointments', (req, res) => {
  
  const sql = 'SELECT * FROM appointments ';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
       
       return  res.json(results);
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
