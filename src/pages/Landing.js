import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Landing.css'; // Optional: Add some CSS for styling

const Landing = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1>My Doc Appointment System</h1>
        <div className="nav-buttons">
          <Link to="/doctor-login">
            <button className="nav-btn">Doctor</button>
          </Link>
          <Link to="/login">
            <button className="nav-btn">Patient</button>
          </Link>
        </div>
      </nav>
      <div className="content">
        <h2>Welcome to the My Doc Appointment System</h2>
        <p>Register as a doctor or patient to access our appointment services.</p>
      </div>
    </div>
  );
};

export default Landing;
