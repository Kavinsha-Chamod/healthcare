import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const PublicRoute = ({ element: Element, ...rest }) => {
  return !isAuthenticated() ? <Element {...rest} /> : <Navigate to="/dashboard" />;
};

export default PublicRoute;
