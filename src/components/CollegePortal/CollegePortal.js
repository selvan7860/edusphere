import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import CollegeCard from '../CollegeCard/CollegeCard';  // Update path if necessary

const CollegePortal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [colleges, setColleges] = useState([]); // State to store colleges data

  // Fetch colleges data from backend API when the component mounts
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/colleges');
        if (response.data.success) {
          setColleges(response.data.data); // Store the fetched colleges data in state
        }
      } catch (error) {
        console.error('Error fetching colleges:', error);
      }
    };

    // Fetch data initially
    fetchColleges();

    // Set interval to fetch data every 5 seconds (adjust as needed)
    const intervalId = setInterval(() => {
      fetchColleges();
    }, 5000); // 5000ms = 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures it runs only once

  // Filter colleges based on the search term
  const filteredColleges = colleges.filter((college) =>
    college.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        College Portal
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 3 }}>
        <TextField
          label="College Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
        />
        <Button variant="contained" color="primary" onClick={() => {}}>
          Filter
        </Button>
      </Box>
      <Grid container spacing={3}>
        {filteredColleges.map((college) => (
          <Grid item xs={12} key={college.id}> {/* Use unique id as key */}
            <CollegeCard college={college} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CollegePortal;
