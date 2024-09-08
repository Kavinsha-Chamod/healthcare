import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { getAvailableDoctors } from '../../api/users';
import BookAppointmentContent from './BookAppointmentContent';
import '../../stylesheets/DoctorList.css';

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
    <div className="doctor-list-container">
    <h2>Available Doctors</h2>
    {doctors.length > 0 ? (
    <ul className="doctor-list">
      {doctors.map((doctor) => (
        <li key={doctor._id} onClick={() => handleDoctorClick(doctor)}>
          <p className='name'>Name: Dr.{doctor.fullName}</p>
          <p>Specialization: {doctor.specialization}</p>
        </li>
      ))}
    </ul>
    ) : (
      <p className="no-appointments">No doctors available</p>
    )}

      {/* Modal for booking appointment */}
      <Modal
        title={`Book Appointment with Dr. ${selectedDoctor?.fullName}`}
        visible={isModalVisible}
        onCancel={handleCloseAppointment}
        footer={null} 
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
