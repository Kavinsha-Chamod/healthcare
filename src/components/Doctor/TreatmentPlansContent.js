import React, { useEffect, useState } from 'react';
import { Spin, Alert, Select} from 'antd';
import {jwtDecode} from 'jwt-decode';
import { getDoctorAppointments } from '../../api/appointment'; // Adjust import path as needed

const TreatmentPlansContent = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [doctorId, setDoctorId] = useState(null);

  // Fetch doctorId from token and fetch appointments
  useEffect(() => {
    const fetchDoctorIdFromToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          return decoded?.id || null;
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      }
      return null;
    };

    const id = fetchDoctorIdFromToken();
    console.log('Fetched Doctor ID:', id); // Debugging log
    setDoctorId(id);

    if (id) {
      const fetchAppointments = async () => {
        try {
          const data = await getDoctorAppointments(id);
          console.log('Fetched Appointments:', data); // Debugging log
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
      setError('Doctor ID not found');
    }
  }, []);

  if (loading) {
    return <Spin tip="Loading appointments..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  // Filter out completed appointments
  const filteredAppointments = appointments.filter(appointment => appointment.status == 'completed');

  return (
    <div>
      <h3>Doctor's Appointments</h3>
      {filteredAppointments.length > 0 ? (
        <ul>
          {filteredAppointments.map((appointment) => (
            <li key={appointment._id}>
              <p>Appointment ID: {appointment._id}</p>
              <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
              <p>Time: {appointment.time}</p>
              <p>Patient: {appointment.patient?.firstName} {appointment.patient?.lastName}</p>
              <p>Status: {appointment.status}</p>
              <p>Notes: {appointment.notes}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default TreatmentPlansContent;
