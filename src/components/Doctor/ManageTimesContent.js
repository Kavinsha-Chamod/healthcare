import React, { useState } from 'react';
import { Button, DatePicker, notification } from 'antd';
import { addDefaultSlots } from '../../api/appointment';

const ManageTimesContent = ({ doctorId }) => {
  const [date, setDate] = useState(null);

  const handleAddSlots = async () => {
    if (!date) {
      notification.error({
        message: 'Error',
        description: 'Please select a date before adding slots.',
      });
      return;
    }

    // Convert the moment object to a string directly
    const formattedDate = date.toISOString(); // Use toISOString() if you need the ISO format
    console.log('Selected Date:', date);

    try {
      const response = await addDefaultSlots(doctorId, date);
      console.log('Response:', response);
      notification.success({
        message: 'Success',
        description: 'Time slots added successfully!',
      });
    } catch (error) {
      console.error('Error adding default slots:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to add time slots.',
      });
    }
  };

  return (
    <div>
      <h3>Add and Manage Time Slots</h3>
      <DatePicker 
        onChange={(value) => setDate(value)} 
        format="YYYY-MM-DD" 
      />
      <Button 
        type="primary" 
        onClick={handleAddSlots} 
        style={{ marginTop: '10px' }}
      >
        Add Time Slots
      </Button>
    </div>
  );
};

export default ManageTimesContent;
