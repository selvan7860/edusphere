import React, { useState, useEffect } from 'react';
import { CssBaseline, Box } from '@mui/material';
import Navbar from '../NavBar/NavBar';
import CollegePortal from '../CollegePortal/CollegePortal';
import CollegeRegistration from '../CollegeResigration/CollegeRegistration';

const EduSphere = () => {
  const [activePage, setActivePage] = useState('portal');
  const [userRole, setUserRole] = useState('');  // State to store the user's role

  useEffect(() => {
    // Retrieve the role from localStorage (or wherever it was saved after login)
    const role = localStorage.getItem('role');
    setUserRole(role);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Conditionally render the Navbar only if userRole is set */}
      {userRole && <Navbar onMenuClick={setActivePage} />}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Render content based on the user's role */}
        {userRole === 'STUDENT' && activePage === 'portal' && <CollegePortal />}
        {userRole === 'UNIVERSITY' && (activePage === 'portal' || activePage === 'register') && (
          <>
            {activePage === 'portal' && <CollegePortal />}
            {activePage === 'register' && <CollegeRegistration />}
          </>
        )}
      </Box>
    </Box>
  );
};

export default EduSphere;

