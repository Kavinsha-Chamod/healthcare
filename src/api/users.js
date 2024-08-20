import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export const sendMFA = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/send-mfa`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error('MFA request failed');
  }
};

export const login = async (email, password, mfaCode) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password, mfaCode });
    const { token } = response.data;

    console.log('Token received:', token); // Debugging line

    if (token) {

      localStorage.setItem('token', token);
      console.log('Token saved to localStorage:', token);
    } else {
      throw new Error('No token received');
    }

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error sending OTP');
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { email, otp });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'OTP verification failed');
  }
};

export const resetPassword = async (email, newPassword) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, { email, newPassword });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Password reset failed');
  }
};


