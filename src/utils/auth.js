import {jwtDecode} from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return false; 
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      alert('Token expired, please log in again.');
      return false;
    }

    return true; 
  } catch (error) {
    return false;
  }
};

export const getUserRole = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return null; 
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role; 
  } catch (error) {
    return null;
  }
};
