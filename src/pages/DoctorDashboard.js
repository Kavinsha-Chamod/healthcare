import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import SideNavBar from '../components/SideNavBar';
import AppointmentsContent from '../components/Doctor/AppointmentsContent';
import ManageTimesContent from '../components/Doctor/ManageTimesContent';
import TreatmentPlansContent from '../components/Doctor/TreatmentPlansContent';
import MedicalHistoryContent from '../components/Doctor/MedicalHistoryContent';
import { Spin, Alert } from 'antd';

function DoctorDashboard() {
  const [selectedContent, setSelectedContent] = useState('appointments'); // Default content
  const [doctorId, setDoctorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch doctorId from token
  useEffect(() => {
    const fetchDoctorIdFromToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          return decoded?.id || null; // Assuming doctorId is in the token payload as "id"
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      }
      return null;
    };

    const id = fetchDoctorIdFromToken();
    if (id) {
      setDoctorId(id);
    } else {
      setError('Doctor ID not found');
    }
    setLoading(false);
  }, []);

  const renderContent = () => {
    switch (selectedContent) {
      case 'appointments':
        return <AppointmentsContent doctorId={doctorId} />;
      case 'times':
        return <ManageTimesContent doctorId={doctorId} />;
      case 'treatment-plans':
        return <TreatmentPlansContent doctorId={doctorId} />;
      case 'history':
        return <MedicalHistoryContent doctorId={doctorId} />;
      default:
        return <AppointmentsContent doctorId={doctorId} />;
    }
  };

  if (loading) {
    return <Spin tip="Loading dashboard..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

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
