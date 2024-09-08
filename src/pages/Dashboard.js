import React, { useState } from 'react';
import SideNavBar from '../components/SideNavBar';
import MyAppointmentsContent from '../components/Patient/MyAppointmentsContent';
import MedicalRecordsContent from '../components/Patient/MedicalRecordsContent';
import ContactDoctorContent from '../components/Patient/ContactDoctorContent';
import DoctorList from '../components/Patient/DoctorList';

function PatientDashboard() {
  const [selectedContent, setSelectedContent] = useState('my-appointments'); // Default content

  const renderContent = () => {
    switch (selectedContent) {
      case 'my-appointments':
        return <MyAppointmentsContent />;
      case 'medical-records':
        return <MedicalRecordsContent />;
      case 'book-appointment':
        return <DoctorList />;
      case 'contact-doctor':
        return <ContactDoctorContent />;
      default:
        return <MyAppointmentsContent />;
    }
  };

  return (
    <div className="dashboard-container">
      <SideNavBar role="patient" setSelectedContent={setSelectedContent} /> {/* Pass setSelectedContent */}
      <div className="dashboard-content">
        {renderContent()} {/* Display content based on selected option */}
      </div>
    </div>
  );
}

export default PatientDashboard;
