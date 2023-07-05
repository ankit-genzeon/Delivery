import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import carImage from './car.jpg';
import './Suv.css'; // Import custom CSS file for additional styles

function Suv() {
  const [prediction, setPrediction] = useState([]);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get customer details from form inputs
    const customerData = {
      age: parseInt(age),
      gender,
      salary: parseInt(salary),
    };

    // Send customer details to the server
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', customerData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const validateAge = (value) => {
    const parsedValue = parseInt(value);
    return parsedValue > 0 && parsedValue < 100;
  };

  const validateSalary = (value) => {
    const parsedValue = parseInt(value);
    return parsedValue > 0;
  };

  const divStyle = {
    backgroundImage: `url(${carImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  return (
    <div style={divStyle}>
      <br></br>
      <br></br>
      <br></br>
      <div className="container text-center">
        <header className="py-4">
          <h1 className="heading">SUV PURCHASE DECISION</h1>
        </header>
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <form onSubmit={handleSubmit} className="form">
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age:
                </label>
                <input
                  type="number"
                  id="age"
                  className={`form-control ${age !== '' && !validateAge(age) ? 'is-invalid' : ''}`}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                 {age !== '' && !validateAge(age) && <div className="invalid-feedback">Age must be between 1 and 100.</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender:
                </label>
                <select
                  id="gender"
                  className="form-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="salary" className="form-label">
                  Estimated Salary:
                </label>
                <input
                  type="number"
                  id="salary"
                  className={`form-control ${salary !== '' && !validateSalary(salary) ? 'is-invalid' : ''}`}
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
                {salary !== '' && !validateSalary(salary) && (
                  <div className="invalid-feedback">Salary must be greater than 0.</div>
                  )}
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                Get Prediction
              </button>
            </form>
          </div>
        </div>
        {/* Display predictions */}
   
    
{prediction.length > 0 && (
          <div className="row justify-content-center mt-4">
            <div className="col-sm-6">
              <h3 className="predictions-heading">Prediction:</h3>
              {prediction.map((prediction, index) => (
                <div key={index} className="custom-prediction">
                  {prediction}
                </div>
              ))} 

            </div>
          </div>
        )}
        <footer className="py-4 mt-4">
          <p className="footer-text">
            &copy; {new Date().getFullYear()} AwsmAnkit. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Suv;
