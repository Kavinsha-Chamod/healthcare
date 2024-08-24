import React, { useState, useEffect } from 'react';
import { createAppointment } from '../../api/appointment';
import { getDoctorAvailability } from '../../api/users';
import {jwtDecode} from 'jwt-decode';

const BookAppointmentContent = ({ doctorId }) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    patient: '', 
    doctor: doctorId,
    date: '',
    time: '',
    status: 'pending',
    notes: '',
  });

  useEffect(() => {
    const fetchDoctorAvailability = async () => {
      try {
        const times = await getDoctorAvailability(doctorId);
        setAvailableTimes(times);
      } catch (error) {
        console.error('Error fetching doctor availability:', error);
      }
    };
    fetchDoctorAvailability();

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Use userId from the token instead of patientId
        if (decoded && decoded.id) {
          setAppointmentData((prevData) => ({
            ...prevData,
            patient: decoded.id, // Set patient ID from userId
          }));
          console.log('Patient ID set from token:', decoded.id);
          console.log('Doctor ID :', doctorId);
        } else {
          console.error('userId not found in token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAppointment(appointmentData);
      alert('Appointment created successfully');
      // Clear the form after submission
      setAppointmentData({
        ...appointmentData,
        date: '',
        time: '',
        notes: '',
      });
      window.location.reload();
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date</label>
      <input type="date" name="date" value={appointmentData.date} onChange={handleChange} required />
      <label>Available Times</label>
      <select name="time" value={appointmentData.time} onChange={handleChange} required>
        <option value="">Select Time</option>
        {availableTimes.map((slot) => (
          <option key={slot._id} value={slot.time}>
            {slot.date} - {slot.time}
          </option>
        ))}
      </select>
      <textarea
        name="notes"
        value={appointmentData.notes}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <button type="submit">Create Appointment</button>
    </form>
  );
};

export default BookAppointmentContent;
