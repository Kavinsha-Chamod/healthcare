import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Alert } from 'antd'; // Import Ant Design components
import { registerUser } from '../api/users';
import '../stylesheets/Register.css'; // Import the CSS file

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('Select');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Regular expression for strong password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(''); 
    setSuccess('');

    // Validate password
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate other fields
    if (!firstName || !lastName || !phoneNumber || !address || !dob || gender === 'Select' || !email) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }

    // Validate phone number (example: should be a 10-digit number)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Phone number should be a 10-digit number');
      setLoading(false);
      return;
    }

    try {
      await registerUser({
        firstName,
        lastName,
        phoneNumber,
        address,
        dob,
        gender,
        email,
        password,
        role: 'patient',
      });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setError('Error during registration. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {success && <Alert message={success} type="success" showIcon />}
      <form onSubmit={handleRegister}>
        <div className='txtLabel'>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className='txtLabel'>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className='txtLabel'>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className='txtLabel'>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className='txtLabel'>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="Select">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className='txtLabel'>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='txtLabel'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        {error && <Alert message={error} type="error" showIcon />}
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          {'Register'}
        </Button>
      </form>

      <a href="/login" className="login">
        Already have an account? Login
      </a>
    </div>
  );
}

export default Register;
