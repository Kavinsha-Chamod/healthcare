import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Landing.css'; // Optional: Add some CSS for styling

const Landing = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1>Healthcare System</h1>
        <div className="nav-buttons">
          <Link to="/doctor-login">
            <button className="nav-btn">Doctor</button>
          </Link>
          <Link to="/login">
            <button className="nav-btn">Patient</button>
          </Link>
        </div>
      </nav>
      
      {/* Add Content or Description */}
      <div className="content">
        <h2>Welcome to the Healthcare Management System</h2>
        <p>Register as a doctor or patient to access our healthcare services.</p>
      </div>
    </div>
  );
};

export default Landing;
