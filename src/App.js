import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorRegistration from './pages/DoctorRegistration';
import LoginDoctor from './pages/LoginDoctor';
import ForgotPassword from './pages//ForgotPassword';
import DoctorForgotPassword from './pages/DoctorForgotPassword';
import ResetPassword from './pages/ResetPassword';
import DoctorResetPassword from './pages/DoctorResetPassword';
import Dashboard from './pages/Dashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute element={Landing} />} />
        <Route path="/login" element={<PublicRoute element={Login} />} />
        <Route path="/doctor-login" element={<PublicRoute element={LoginDoctor} />} />
        <Route path="/register" element={<PublicRoute element={Register} />} />
        <Route path="/doctor-register" element={<PublicRoute element={DoctorRegistration} />} />
        <Route path="/forgot-password" element={<PublicRoute element={ForgotPassword} />} />
        <Route path="/doctor-forgot-password" element={<PublicRoute element={DoctorForgotPassword} />} />
        <Route path="/reset-password" element={<PublicRoute element={ResetPassword} />} />
        <Route path="/doctor-reset-password" element={<PublicRoute element={DoctorResetPassword} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} allowedRoles={['patient']} />} />
        <Route path="/doctor-dashboard" element={<ProtectedRoute element={DoctorDashboard} allowedRoles={['doctor']} />} />
      </Routes>
    </Router>
  );
}

export default App;
