// import React from 'react';
// import '../stylesheets/SideNavBar.css';

// const SideNavBar = ({ role, setSelectedContent }) => {
//   return (
//     <div className="sidenav">
//       <h2>{role === 'doctor' ? 'Doctor Dashboard' : 'Patient Dashboard'}</h2>
//       <ul>
//         {role === 'doctor' ? (
//           <>
//             <li onClick={() => setSelectedContent('appointments')}>View Appointments</li>
//             <li onClick={() => setSelectedContent('times')}>Manage Appointment Times</li>
//             <li onClick={() => setSelectedContent('treatment-plans')}>Treatment Plans</li>
//             <li onClick={() => setSelectedContent('history')}>Patient Medical History</li>
//           </>
//         ) : (
//           <>
//             <li onClick={() => setSelectedContent('my-appointments')}>My Appointments</li>
//             <li onClick={() => setSelectedContent('medical-records')}>Medical Records</li>
//             <li onClick={() => setSelectedContent('book-appointment')}>Book Appointment</li>
//             <li onClick={() => setSelectedContent('contact-doctor')}>Contact Doctor</li>
//           </>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default SideNavBar;

import React from 'react';
import '../stylesheets/SideNavBar.css';

const SideNavBar = ({ role, setSelectedContent }) => {
  return (
    <div className="sidenav">
      <h2 className="sidenav-title">
        {role === 'doctor' ? 'Doctor Dashboard' : 'Patient Dashboard'}
      </h2>
      <ul className="sidenav-menu">
        {role === 'doctor' ? (
          <>
            <li className="sidenav-item">
              <button className="sidenav-button" onClick={() => setSelectedContent('appointments')}>
                View Appointments
              </button>
            </li>
            <li className="sidenav-item">
              <button className="sidenav-button" onClick={() => setSelectedContent('times')}>
                Manage Appointment Times
              </button>
            </li>
            <li className="sidenav-item">
              <button className="sidenav-button" onClick={() => setSelectedContent('treatment-plans')}>
              Appointment History
              </button>
            </li>
            {/* <li className="sidenav-item">
              <button className="sidenav-button" onClick={() => setSelectedContent('history')}>
                Patient Medical History
              </button>
            </li> */}
          </>
        ) : (
          <>
            <li className="sidenav-item">
              <button className="sidenav-button" onClick={() => setSelectedContent('my-appointments')}>
                My Appointments
              </button>
            </li>
            <li className="sidenav-item">
              <button className="sidenav-button" onClick={() => setSelectedContent('medical-records')}>
                Appointment History
              </button>
            </li>
            <li className="sidenav-item">
              <button className="sidenav-button" onClick={() => setSelectedContent('book-appointment')}>
                Book Appointment
              </button>
            </li>
            {/* <li className="sidenav-item">
              <button className="sidenav-button" onClick={() => setSelectedContent('contact-doctor')}>
                Contact Doctor
              </button>
            </li> */}
          </>
        )}
      </ul>
    </div>
  );
};

export default SideNavBar;
