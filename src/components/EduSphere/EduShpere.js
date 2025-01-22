import React, { useState } from 'react';
import { CssBaseline, Box } from '@mui/material';
import Navbar from '../NavBar/NavBar';
import CollegePortal from '../CollegePortal/CollegePortal';
import CollegeRegistration from '../CollegeResigration/CollegeRegistration';

const EduSphere = () => {
  const [activePage, setActivePage] = useState('portal');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar onMenuClick={setActivePage} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {activePage === 'portal' && <CollegePortal />}
        {activePage === 'register' && <CollegeRegistration/>}
      </Box>
    </Box>
  );
};

export default EduSphere;

