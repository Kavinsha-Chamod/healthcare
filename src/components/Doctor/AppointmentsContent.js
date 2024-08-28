import React, { useEffect, useState } from 'react';
import { Spin, Alert, Select, Button, message } from 'antd';
import {jwtDecode} from 'jwt-decode';
import { getDoctorAppointments, updateDoctorAppointment } from '../../api/appointment'; // Adjust import path as needed

const { Option } = Select;

const AppointmentsContent = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [doctorId, setDoctorId] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({}); // Store the status updates locally

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

  // Handle status change in the dropdown
  const handleStatusChange = (appointmentId, status) => {
    setStatusUpdates((prev) => ({ ...prev, [appointmentId]: status }));
  };

  // Handle status update submission
  const handleUpdateStatus = async (appointmentId) => {
    const status = statusUpdates[appointmentId];

    if (!status) {
      return message.warning('Please select a status before updating.');
    }

    try {
      await updateDoctorAppointment(appointmentId, { status });
      message.success('Appointment status updated successfully');
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status } : appointment
        )
      );
    } catch (err) {
      console.error('Error updating appointment status:', err);
      message.error('Failed to update appointment status.');
    }
  };

  if (loading) {
    return <Spin tip="Loading appointments..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  // Filter out completed appointments
  const filteredAppointments = appointments.filter(appointment => appointment.status !== 'completed');

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

              {/* Dropdown to select the status */}
              <Select
                defaultValue={appointment.status}
                onChange={(value) => handleStatusChange(appointment._id, value)}
                style={{ width: 120 }}
              >
                <Option value="pending">Pending</Option>
                <Option value="confirmed">Confirmed</Option>
                <Option value="cancelled">Cancelled</Option>
                <Option value="completed">Completed</Option>
              </Select>

              {/* Button to submit the status update */}
              <Button
                type="primary"
                onClick={() => handleUpdateStatus(appointment._id)}
                style={{ marginLeft: '10px' }}
              >
                Update Status
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default AppointmentsContent;
