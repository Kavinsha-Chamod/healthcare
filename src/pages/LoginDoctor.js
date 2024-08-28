import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginDoctor, sendMFADoctor } from '../api/users';
import { Button, Input, Alert} from 'antd';
import '../stylesheets/Login.css'; 

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); 
  const navigate = useNavigate();

  const handleDoctorLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendMFADoctor(email, password); 
      setStep(2); 
      setError(''); 
    } catch (error) {
      setError(error.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleMFADoctor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginDoctor(email, password, mfaCode); 
      console.log('Login successful:', data); 
      navigate('/doctor-dashboard'); 
      setError(''); 
    } catch (error) {
      setError(error.message || 'Invalid MFA code');
    } finally {
      setLoading(false);
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
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <Input.Password
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
            <Input
              type="text"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
              required
            />
          </div>
        )}

        {error && <Alert message={error} type="error" showIcon />}
        <Button type="primary" htmlType="submit" loading={loading}>
          {step === 1 ? 'Login' : 'Verify'}
        </Button>
      </form>
      {step === 1 && (
        <a href="/doctor-forgot-password" className="forgot-password">
          Forgot Password?
        </a>
      )}
      <a href="/doctor-register" className="forgot-password">
        Don't have an account? Register here
      </a>
    </div>
  );
};

export default DoctorLogin;
