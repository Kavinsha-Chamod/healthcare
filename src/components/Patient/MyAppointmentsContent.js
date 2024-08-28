import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, DatePicker, Alert, Spin, message } from 'antd';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode correctly
import { getAppointments, updateAppointment, deleteAppointment } from '../../api/appointment'; 
import { getDoctorAvailability } from '../../api/users';
import moment from 'moment';
import '../../stylesheets/AppointmentsContent.css';

const MyAppointmentsContent = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableTimes, setAvailableTimes] = useState([]);
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

  const handleDateChange = async (date) => {
    setFormData({ ...formData, date });
  
    try {
      // Fetch availability for the specific doctor
      const times = await getDoctorAvailability(editAppointment.doctor._id);
      
      // Filter available times based on the selected date and isBooked status
      const availableTimes = times.filter(slot => 
        new Date(slot.date).toISOString().split('T')[0] === date.format('YYYY-MM-DD') && !slot.isBooked
      );
      
      setAvailableTimes(availableTimes); // Set filtered available times
    } catch (error) {
      console.error('Error fetching available time slots:', error);
    }
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
        time: formData.time || editAppointment.time,
        notes: formData.notes || editAppointment.notes,
      };
      
      await updateAppointment(editAppointment._id, updatedData);
      message.success('Appointment updated successfully');
  
      // Refetch appointments after update
      const updatedAppointments = await getAppointments(userId);
      setAppointments(updatedAppointments);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  // Handle appointment delete with confirmation
  const handleDeleteAppointment = (appointmentId) => {
    Modal.confirm({
      title: 'Are you sure you want to cancel this appointment?',
      content: 'Once cancelleed, the appointment cannot be recovered.',
      okText: 'Yes, Cancel',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteAppointment(appointmentId);
          message.success('Appointment cancelled successfully');
          const updatedAppointments = await getAppointments(userId);
          setAppointments(updatedAppointments);
        } catch (error) {
          console.error('Error canceling appointment:', error);
        }
      },
    });
  };

  if (loading) {
    return <Spin tip="Loading appointments..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  // Filter out appointments with the status "completed"
  const filteredAppointments = appointments.filter(appointment => appointment.status !== 'completed');

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
                <Button className='btn' onClick={() => handleEditAppointment(appointment)}>Edit</Button>
                <Button onClick={() => handleDeleteAppointment(appointment._id)} danger>Cancel</Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='no-appointments'>No appointments found.</p>
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
        <select name="time" value={formData.time} onChange={e => handleTimeChange(e.target.value)}>
          <option value="">Select Time</option>
          {availableTimes.length > 0 ? (
            availableTimes.map(slot => (
              <option key={slot._id} value={slot.time}>
                {slot.time}
              </option>
            ))
          ) : (
            <option disabled>No available slots</option>
          )}
        </select>

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
