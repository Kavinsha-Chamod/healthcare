import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerDoctor } from '../api/users'; // Import the API call
import '../stylesheets/DoctorRegistration.css'; // Import the CSS file

const DoctorRegistration = () => {
  const [doctorData, setDoctorData] = useState({
    fullName: '',
    email: '',
    password: '',
    specialization: '',
    phone: '',
    licenseNumber: '',
    clinicAddress: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({
      ...doctorData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if password and confirmPassword match
    if (doctorData.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    console.log('Doctor registration data:', doctorData); // <-- Add this for debugging
  
    try {
      await registerDoctor({
        ...doctorData,
        role: 'doctor',
      });
      navigate('/doctor-login');
    } catch (error) {
      setError(error.message);
      console.log('Error during doctor registration:', error); // <-- Add this for debugging
    }
  };
  

  return (
    <div className="container">
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={doctorData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={doctorData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={doctorData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Specialization:</label>
          <input
            type="text"
            name="specialization"
            value={doctorData.specialization}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={doctorData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>License Number:</label>
          <input
            type="text"
            name="licenseNumber"
            value={doctorData.licenseNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Clinic Address:</label>
          <input
            type="text"
            name="clinicAddress"
            value={doctorData.clinicAddress}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
        <a href="/doctor-login" className="login">
          Already have an account? Login
        </a>
      </form>
    </div>
  );
};

export default DoctorRegistration;
