import React from 'react';
import '../stylesheets/SideNavBar.css';

const SideNavBar = ({ role, setSelectedContent }) => {
  return (
    <div className="sidenav">
      <h2>{role === 'doctor' ? 'Doctor Dashboard' : 'Patient Dashboard'}</h2>
      <ul>
        {role === 'doctor' ? (
          <>
            <li onClick={() => setSelectedContent('appointments')}>View Appointments</li>
            <li onClick={() => setSelectedContent('patients')}>Manage Patients</li>
            <li onClick={() => setSelectedContent('treatment-plans')}>Treatment Plans</li>
            <li onClick={() => setSelectedContent('history')}>Patient Medical History</li>
          </>
        ) : (
          <>
            <li onClick={() => setSelectedContent('my-appointments')}>My Appointments</li>
            <li onClick={() => setSelectedContent('medical-records')}>Medical Records</li>
            <li onClick={() => setSelectedContent('book-appointment')}>Book Appointment</li>
            <li onClick={() => setSelectedContent('contact-doctor')}>Contact Doctor</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideNavBar;
