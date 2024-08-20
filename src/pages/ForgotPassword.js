import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, verifyOtp } from '../api/users'; // Import API functions

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Send OTP to the provided email
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email); // Send OTP
      setOtpSent(true); // Enable OTP input
      setMessage('OTP has been sent to your email');
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Verify the OTP and redirect to reset password page
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp(email, otp); // Verify OTP
      setMessage('OTP verified successfully');
      navigate(`/reset-password?email=${email}`); // Redirect to reset password page
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>{otpSent ? 'Verify OTP' : 'Forgot Password'}</h2>
      {!otpSent ? (
        <form onSubmit={handleForgotPassword}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
