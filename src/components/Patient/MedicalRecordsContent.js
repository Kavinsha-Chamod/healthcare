import React, { useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';
import {jwtDecode} from 'jwt-decode';
import { getAppointments } from '../../api/appointment'; 
import '../../stylesheets/AppointmentsContent.css';


const MedicalRecordsContent = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null); 

  // Fetch userId from token
  useEffect(() => {
    const fetchUserIdFromToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded && decoded.id) {
            return decoded.id;
          } else {
            console.error('userId not found in token');
            return null;
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      }
      return null;
    };

    const id = fetchUserIdFromToken();
    setUserId(id);

    if (id) {
      const fetchAppointments = async () => {
        try {
          const data = await getAppointments(id);
          setAppointments(data);
        } catch (err) {
          console.error('Error fetching appointments:', err);
          setError('Error fetching appointments');
        } finally {
          setLoading(false);
        }
      };

      fetchAppointments();
    } else {
      setLoading(false);
      setError('User ID not found');
    }
  }, []);

  if (loading) {
    return <Spin tip="Loading appointments..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  // Filter out appointments with the status "completed"
  const filteredAppointments = appointments.filter(appointment => appointment.status == 'completed');

  return (
    <div className="appointments-container">
      <h3>My Appointments</h3>
      {filteredAppointments.length > 0 ? (
        <ul className="appointments-list">
          {filteredAppointments.map((appointment) => (
            <li key={appointment._id}>
            <div className="appointment-info">
              <p>Appointment ID: {appointment._id}</p>
              <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
              <p>Time: {appointment.time}</p>
              <p>Doctor: {appointment.doctor?.fullName}</p>
              <p>Status: {appointment.status}</p>
              <p>Notes: {appointment.notes}</p>
            </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-appointments">No appointments found.</p>
      )}
    </div>
  );
};

export default MedicalRecordsContent;
