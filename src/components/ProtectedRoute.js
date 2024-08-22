import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const ProtectedRoute = ({ element: Element, allowedRoles, ...rest }) => {
  const role = getUserRole();

  return isAuthenticated() && allowedRoles.includes(role) ? <Element {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
