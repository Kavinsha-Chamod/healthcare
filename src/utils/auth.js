import {jwtDecode} from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return false; // No token found
  }

  try {
    const decodedToken = jwtDecode(token);

    // Check if the token is expired
    const currentTime = Date.now() / 1000; // Convert to seconds
    if (decodedToken.exp < currentTime) {
      // Token has expired, so remove it from localStorage
      localStorage.removeItem('token');
      alert('Token expired, please log in again.');
      return false;
    }

    return true; // Token is valid and not expired
  } catch (error) {
    // In case of an error (e.g., invalid token), consider the user not authenticated
    return false;
  }
};
