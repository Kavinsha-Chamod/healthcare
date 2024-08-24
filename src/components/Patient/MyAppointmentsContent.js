import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, DatePicker, TimePicker, Alert, Spin } from 'antd';
import {jwtDecode} from 'jwt-decode';
import { getAppointments, updateAppointment, deleteAppointment } from '../../api/appointment'; // Adjust import path as needed
import moment from 'moment';

const MyAppointmentsContent = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null); 
  const [editAppointment, setEditAppointment] = useState(null); 
  const [formData, setFormData] = useState({
    date: null,
    time: null,
    notes: ''
  }); 
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleTimeChange = (time) => {
    setFormData({ ...formData, time });
  };

  // Open modal and set appointment data
  const handleEditAppointment = (appointment) => {
    setEditAppointment(appointment);
    setFormData({
      date: moment(appointment.date),
      time: moment(appointment.time, 'HH:mm'),
      notes: appointment.notes,
    });
    setIsModalVisible(true);
  };

  // Submit updated appointment
  const handleUpdateSubmit = async () => {
    try {
      const updatedData = {
        date: formData.date ? formData.date.format('YYYY-MM-DD') : editAppointment.date,
        time: formData.time ? formData.time.format('HH:mm') : editAppointment.time,
        notes: formData.notes || editAppointment.notes,
      };
      await updateAppointment(editAppointment._id, updatedData);
      alert('Appointment updated successfully');
      // Refetch appointments after update
      const updatedAppointments = await getAppointments(userId);
      setAppointments(updatedAppointments);
      setIsModalVisible(false); // Close modal after updating
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  // Handle appointment delete
  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId);
      alert('Appointment deleted successfully');
      const updatedAppointments = await getAppointments(userId);
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  if (loading) {
    return <Spin tip="Loading appointments..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <div>
      <h3>My Appointments</h3>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              <p>Appointment ID: {appointment._id}</p>
              <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
              <p>Time: {appointment.time}</p>
              <p>Doctor: {appointment.doctor?.fullName}</p>
              <p>Status: {appointment.status}</p>
              <p>Notes: {appointment.notes}</p>
              <Button onClick={() => handleEditAppointment(appointment)}>Edit</Button>
              <Button onClick={() => handleDeleteAppointment(appointment._id)} danger>Delete</Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}

      {/* Modal for Editing Appointment */}
      <Modal
        title="Edit Appointment"
        visible={isModalVisible}
        onOk={handleUpdateSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText="Update"
      >
        <label>Date</label>
        <DatePicker
          value={formData.date}
          onChange={handleDateChange}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <label>Time</label>
        <TimePicker
          value={formData.time}
          onChange={handleTimeChange}
          format="HH:mm"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <label>Notes</label>
        <Input.TextArea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={4}
          style={{ width: '100%' }}
        />
      </Modal>
    </div>
  );
};

export default MyAppointmentsContent;
