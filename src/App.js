import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages//ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard'; // Protected
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute element={Login} />} />
        <Route path="/register" element={<PublicRoute element={Register} />} />
        <Route path="/forgot-password" element={<PublicRoute element={ForgotPassword} />} />
        <Route path="/reset-password" element={<PublicRoute element={ResetPassword} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
        
      </Routes>
    </Router>
  );
}

export default App;
