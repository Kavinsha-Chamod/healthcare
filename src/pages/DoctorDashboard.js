// DoctorDashboard.js
import React, { useState } from 'react';
import SideNavBar from '../components/SideNavBar';
import AppointmentsContent from '../components/Doctor/AppointmentsContent';
import ManageTimesContent from '../components/Doctor/ManageTimesContent';
import TreatmentPlansContent from '../components/Doctor/TreatmentPlansContent';
import MedicalHistoryContent from '../components/Doctor/MedicalHistoryContent';


function DoctorDashboard() {
  const [selectedContent, setSelectedContent] = useState('appointments'); // Default content

  const renderContent = () => {
    switch (selectedContent) {
      case 'appointments':
        return <AppointmentsContent />;
      case 'times':
        return <ManageTimesContent />;
      case 'treatment-plans':
        return <TreatmentPlansContent />;
      case 'history':
        return <MedicalHistoryContent />;
      default:
        return <AppointmentsContent />;
    }
  };

  return (
    <div className="dashboard-container">
      <SideNavBar role="doctor" setSelectedContent={setSelectedContent} /> {/* Pass setSelectedContent */}
      <div className="dashboard-content">
        {renderContent()} {/* Display content based on selected option */}
      </div>
    </div>
  );
}

export default DoctorDashboard;
