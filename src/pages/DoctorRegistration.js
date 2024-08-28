import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerDoctor } from '../api/users'; // Import the API call
import { Button, Alert } from 'antd'; // Import Ant Design components
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
  const [loading, setLoading] = useState(false); // Loading state for the button
  const [success, setSuccess] = useState(''); // Success state for the alert
  const navigate = useNavigate();

  // Regular expression for strong password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Regular expression for phone number validation (example: should be a 10-digit number)
  const phoneRegex = /^\d{10}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({
      ...doctorData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate password
    if (!passwordRegex.test(doctorData.password)) {
      setError('Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.');
      return;
    }

    // Check if password and confirmPassword match
    if (doctorData.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate email format
    if (!emailRegex.test(doctorData.email)) {
      setError('Invalid email format');
      return;
    }

    // Validate phone number
    if (!phoneRegex.test(doctorData.phone)) {
      setError('Phone number should be a 10-digit number');
      return;
    }

    // Validate other fields
    if (!doctorData.fullName || !doctorData.specialization || !doctorData.licenseNumber || !doctorData.clinicAddress) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true); // Set loading to true during the API request

    try {
      await registerDoctor({
        ...doctorData,
        role: 'doctor',
      });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/doctor-login'), 3000); // Redirect after 3 seconds
    } catch (error) {
      setError('Error during registration. Please try again.');
    } finally {
      setLoading(false); // Stop the loading state
    }
  };

  return (
    <div className="container">
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className='txtLabel'>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={doctorData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='txtLabel'>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={doctorData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='txtLabel'>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={doctorData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='txtLabel'>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className='txtLabel'>
          <label>Specialization:</label>
          <input
            type="text"
            name="specialization"
            value={doctorData.specialization}
            onChange={handleChange}
            required
          />
        </div>
        <div className='txtLabel'>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={doctorData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className='txtLabel'>
          <label>License Number:</label>
          <input
            type="text"
            name="licenseNumber"
            value={doctorData.licenseNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className='txtLabel'>
          <label>Clinic Address:</label>
          <input
            type="text"
            name="clinicAddress"
            value={doctorData.clinicAddress}
            onChange={handleChange}
            required
          />
        </div>

        {error && <Alert message={error} type="error" showIcon  />}
        {success && <Alert message={success} type="success" showIcon  />}
        <Button type="primary" htmlType="submit" loading={loading}>
          Register
        </Button>
        <a href="/doctor-login" className="login">
          Already have an account? Login
        </a>
      </form>
    </div>
  );
};

export default DoctorRegistration;
