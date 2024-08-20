import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, sendMFA } from '../api/users';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // Step 1: Login, Step 2: MFA
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await sendMFA(email, password);
      setStep(2); // Proceed to MFA step
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleMFA = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password, mfaCode);
      navigate('/dashboard'); // Navigate to dashboard after successful MFA
    } catch (error) {
      setError('Invalid MFA code');
    }
  };

  return (
    <div>
      <h2>{step === 1 ? 'Login' : 'Verify MFA'}</h2>
      <form onSubmit={step === 1 ? handleLogin : handleMFA}>
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

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{step === 1 ? 'Login' : 'Verify'}</button>
      </form>
      {step === 1 && (
        <button onClick={() => navigate('/forgot-password')}>
          Forgot Password?
        </button>
      )}
    </div>
  );
}

export default Login;
