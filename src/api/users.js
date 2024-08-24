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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sendMFADoctor = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/send-mfa-doctor`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to send MFA code');
  }
};

// Example of handling token storage
export const loginDoctor = async (email, password, mfaCode) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login-doctor`, { email, password, mfaCode });
    const { token } = response.data;

    if (token) {
      localStorage.setItem('token', token); // Store token in localStorage
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const registerDoctor = async (doctorData) => {
  try {
    console.log('Sending registration request:', doctorData); // Debugging line
    const response = await axios.post(`${API_BASE_URL}/auth/register-doctor`, doctorData);
    console.log('Registration successful:', response.data); // Debugging line
    return response.data; // Returning the response data
  } catch (error) {
    console.error('Error during registration:', error.response?.data); // Debugging line
    throw error.response?.data?.message || 'Registration failed'; // Throwing error message
  }
};

export const doctorForgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/doctor-forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error sending OTP');
  }
};

export const verifyOtpDoctor = async (email, otp) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-otp-doctor`, { email, otp });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'OTP verification failed');
  }
};

export const doctorResetPassword = async (email, newPassword) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/doctor-reset-password`, { email, newPassword });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Password reset failed');
  }
};

export const getAvailableDoctors = async () => {
  const response = await axios.get(`${API_BASE_URL}/auth/doctors`);
  return response.data;
};

export const getDoctorAvailability = async (doctorId) => {
  const response = await axios.get(`${API_BASE_URL}/auth/doctors/${doctorId}/availability`);
  return response.data;
};