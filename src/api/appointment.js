import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

export const createAppointment = async (appointmentData) => {
  const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData);
  return response.data;
};

// API call to get appointments
export const getAppointments = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/appointments/${userId}`);
  return response.data;
};

export const updateAppointment = async (appointmentId, appointmentData) => {
  const response = await axios.put(`${API_BASE_URL}/appointments/${appointmentId}`, appointmentData);
  return response.data;
};

export const deleteAppointment = async (appointmentId) => {
  const response = await axios.delete(`${API_BASE_URL}/appointments/${appointmentId}`);
  return response.data;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// export const getDoctorAppointments = async (doctorId) => {
//   const response = await axios.get(`${API_BASE_URL}/appointments/${doctorId}`);

//   return response.data;
// };

export const getDoctorAppointments = async (doctorId) => {
  const url = `${API_BASE_URL}/doctor-appointments/${doctorId}`;
  console.log('Fetching appointments from URL:', url); 
  const response = await axios.get(url);
  return response.data;
};

export const addTimeSlots = async (doctorId, date) => {
  try {
    // Send the date directly as a string
    const response = await axios.post(`${API_BASE_URL}/appointments/${doctorId}/add-time-slots`, { date:date });
    return response.data;
  } catch (error) {
    console.error('Error adding time slots:', error);
    throw error;
  }
};

// API call to add default slots
export const addDefaultSlots = async (doctorId, date) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/appointments/${doctorId}/add-default-slots`, { date:date });
    return response.data;
  } catch (error) {
    console.error('Error adding default slots:', error);
    throw error;
  }
};


export const bookSlot = async (doctorId, date, timeSlot) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/appointments/${doctorId}/book-slot`, { date, timeSlot });
    return response.data;
  } catch (error) {
    console.error('Error booking slot:', error);
    throw error;
  }
};

export const updateDoctorAppointment = async (appointmentId, appointmentData) => {
  const response = await axios.put(`${API_BASE_URL}/doctor-appointments/${appointmentId}`, appointmentData);
  return response.data;
};