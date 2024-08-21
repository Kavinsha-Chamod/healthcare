import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { doctorResetPassword } from '../api/users';

function DoctorResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email from URL query params
  const email = new URLSearchParams(location.search).get('email');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      await doctorResetPassword(email, newPassword); // Send new password
      setMessage('Password has been reset successfully');
      navigate('/doctor-login'); // Redirect to login after success
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DoctorResetPassword;
