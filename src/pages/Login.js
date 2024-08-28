import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, sendMFA } from '../api/users';
import { Button,Input, Alert } from 'antd'; 
import '../stylesheets/Login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await sendMFA(email, password);
      setStep(2); 
      setError(''); 
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setLoading(false); 
    }
  };

  const handleMFA = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email, password, mfaCode);
      setError(''); 
      navigate('/dashboard'); 
    } catch (error) {
      setError('Invalid MFA code');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container">
      <h2>{step === 1 ? 'Login' : 'Verify MFA'}</h2>
      
      {/* Error Alert */}
      {/* {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )} */}

      <form onSubmit={step === 1 ? handleLogin : handleMFA}>
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
            <Input
              type="text"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
              required
            />
          </div>
        )}
        {error && <Alert message={error} type="error" showIcon />}
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          { step === 1 ? 'Login' : 'Verify'}
        </Button>
      </form>

      {step === 1 && (
        <a href="/forgot-password" className="forgot-password">
          Forgot Password?
        </a>
      )}

      <a href="/register" className="forgot-password">
        Don't have an account? Register here
      </a>
    </div>
  );
}

export default Login;
