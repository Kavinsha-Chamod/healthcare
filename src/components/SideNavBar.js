import React from 'react';
import '../stylesheets/SideNavBar.css';
import { Modal, message } from 'antd';

const SideNavBar = ({ role, setSelectedContent }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  const handleLogoutUser = (appointmentId) => {
    Modal.confirm({
      title: 'Are you sure you want to logout?',
      okText: 'Yes, Logout',
      cancelText: 'No',
      onOk: async () => {
        try {
          await handleLogout();
          message.success('Appointment cancelled successfully');
        } catch (error) {
          console.error('Try again!:', error);
        }
      },
    });
  };

  return (
    <div className="sidenav">
      <h2 className="sidenav-title">
        {role === 'doctor' ? 'Doctor Dashboard' : 'Patient Dashboard'}
      </h2>
      <ul className="sidenav-menu">
        {role === 'doctor' ? (
          <>
            <li className="sidenav-item">
              <button className="sidenav-button" onClick={() => setSelectedContent('appointments')}>
                View Appointments
              </button>
            </li>
            <li className="sidenav-item">
              <button className="sidenav-button" onClick={() => setSelectedContent('times')}>
                Manage Appointment Times
              </button>
            </li>
            <li className="sidenav-item">
              <button className="sidenav-button" onClick={() => setSelectedContent('treatment-plans')}>
              Appointment History
              </button>
            </li>
            <li className="sidenav-item">
              <button className="sidenav-buttonL" onClick={() => handleLogoutUser()}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="sidenav-item">
              <button className="sidenav-button" onClick={() => setSelectedContent('my-appointments')}>
                My Appointments
              </button>
            </li>
            <li className="sidenav-item">
              <button className="sidenav-button" onClick={() => setSelectedContent('medical-records')}>
                Appointment History
              </button>
            </li>
            <li className="sidenav-item">
              <button className="sidenav-button" onClick={() => setSelectedContent('book-appointment')}>
                Book Appointment
              </button>
            </li>
            <li className="sidenav-item">
              <button className="sidenav-buttonL" onClick={() => handleLogoutUser()}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideNavBar;
