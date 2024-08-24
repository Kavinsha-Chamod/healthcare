import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd'; // Import Modal and Button from Ant Design
import { getAvailableDoctors } from '../../api/users';
import BookAppointmentContent from './BookAppointmentContent';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getAvailableDoctors();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalVisible(true); // Show the modal when a doctor is clicked
  };

  const handleCloseAppointment = () => {
    setSelectedDoctor(null);
    setIsModalVisible(false); // Hide the modal when closed
  };

  return (
    <div>
      <h2>Available Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id} onClick={() => handleDoctorClick(doctor)}>
            {doctor.fullName} - {doctor.specialization}
          </li>
        ))}
      </ul>

      {/* Modal for booking appointment */}
      <Modal
        title={`Book Appointment with Dr. ${selectedDoctor?.fullName}`}
        visible={isModalVisible}
        onCancel={handleCloseAppointment}
        footer={null} // You can customize the footer if needed
      >
        {selectedDoctor && (
          <BookAppointmentContent
            doctorId={selectedDoctor._id}
            onClose={handleCloseAppointment}
          />
        )}
      </Modal>
    </div>
  );
};

export default DoctorList;
