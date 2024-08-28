import React, { useState, useEffect } from 'react';
import { Button, Alert, Spin } from 'antd';
import { createAppointment, bookSlot } from '../../api/appointment';
import { getDoctorAvailability } from '../../api/users';
import {jwtDecode} from 'jwt-decode';

const BookAppointmentContent = ({ doctorId }) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    patient: '',
    doctor: doctorId,
    date: '',
    time: '',
    status: 'confirmed',
    notes: '',
  });

  // Fetch doctor's available times
  useEffect(() => {
    const fetchDoctorAvailability = async () => {
      try {
        const times = await getDoctorAvailability(doctorId);

        // Format times and ensure date is in YYYY-MM-DD format
        const formattedTimes = times.map(slot => ({
          ...slot,
          date: new Date(slot.date).toISOString().split('T')[0],
        }));

        setAvailableTimes(formattedTimes);

        // Get unique dates
        const uniqueDates = [...new Set(formattedTimes.map(slot => slot.date))];
        setDates(uniqueDates);
      } catch (error) {
        console.error('Error fetching doctor availability:', error);
      }
    };

    fetchDoctorAvailability();

    // Set the patient ID from the token
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.id) {
          setAppointmentData((prevData) => ({
            ...prevData,
            patient: decoded.id,
          }));
        } else {
          console.error('userId not found in token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [doctorId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'date') {
      setSelectedDate(value);
      setAppointmentData((prevData) => ({
        ...prevData,
        date: value,
        time: '', // Reset time when date changes
      }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createAppointment(appointmentData);
      await bookSlot(doctorId, selectedDate, appointmentData.time);

      // Mark the time slot as booked and show success message
      setAvailableTimes((prevTimes) =>
        prevTimes.map(slot =>
          slot.date === selectedDate && slot.time === appointmentData.time
            ? { ...slot, isBooked: true }
            : slot
        )
      );
      setAlertMessage({ type: 'success', message: 'Appointment created successfully' });

      // Clear form data
      setAppointmentData({
        patient: appointmentData.patient,
        doctor: doctorId,
        date: '',
        time: '',
        status: 'confirmed',
        notes: '',
      });
      setSelectedDate('');
    } catch (error) {
      setAlertMessage({ type: 'error', message: 'Error creating appointment' });
      console.error('Error creating appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter available times to exclude booked slots
  const filteredTimes = availableTimes.filter(slot => slot.date === selectedDate && !slot.isBooked);

  return (
    <div>
      {alertMessage && (
        <Alert
          message={alertMessage.message}
          type={alertMessage.type}
          closable
          onClose={() => setAlertMessage(null)}
          style={{ marginBottom: 20 }}
        />
      )}

      {/* {loading && <Spin tip="Creating appointment..." />} */}

      {!loading && (
        <form onSubmit={handleSubmit}>
          <label>Date</label>
          <select name="date" value={selectedDate} onChange={handleChange} required>
            <option value="">Select Date</option>
            {dates.map(date => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>

          <label>Available Times</label>
          <select name="time" value={appointmentData.time} onChange={handleChange} required disabled={!selectedDate}>
            <option value="">Select Time</option>
            {selectedDate && filteredTimes.map(slot => (
              <option key={slot._id} value={slot.time}>
                {slot.time}
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
          <Button type="primary"
          htmlType="submit"
          loading={loading}  disabled={!appointmentData.time}>Create Appointment</Button>
        </form>
      )}
    </div>
  );
};

export default BookAppointmentContent;
