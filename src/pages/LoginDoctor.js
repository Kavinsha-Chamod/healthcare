import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginDoctor, sendMFADoctor } from '../api/users'; // Ensure this path is correct
import '../stylesheets/Login.css'; // Import the CSS file

function DoctorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // Step 1: Login, Step 2: MFA
  const navigate = useNavigate();

  const handleDoctorLogin = async (e) => {
    e.preventDefault();
    try {
      await sendMFADoctor(email, password); // Request MFA code
      setStep(2); // Proceed to MFA step
    } catch (error) {
      setError(error.message || 'Invalid email or password');
    }
  };

  const handleMFADoctor = async (e) => {
    e.preventDefault();
    try {
      const data = await loginDoctor(email, password, mfaCode); // Verify MFA code
      console.log('Login successful:', data); // Debug output
      navigate('/doctor-dashboard'); // Navigate to the doctor’s dashboard
      
    } catch (error) {
      setError(error.message || 'Invalid MFA code');
    }
  };

  return (
    <div className="container">
      <h2>{step === 1 ? 'Doctor Login' : 'Verify MFA Code'}</h2>
      <form onSubmit={step === 1 ? handleDoctorLogin : handleMFADoctor}>
        {step === 1 && (
          <>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {step === 2 && (
          <div>
            <label>MFA Code:</label>
            <input
              type="text"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
              required
            />
          </div>
        )}

        {error && <p className="error">{error}</p>}
        <button type="submit">{step === 1 ? 'Doctor Login' : 'Verify'}</button>
      </form>
      {step === 1 && (
        <a href="/forgot-password" className="forgot-password">
          Forgot Password?
        </a>
      )}
      <a href="/doctor-register" className="register">
        Don't have an account? Register here
      </a>
    </div>
  );
}

export default DoctorLogin;
