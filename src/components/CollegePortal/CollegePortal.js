import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, Select, MenuItem, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import CollegeCard from '../CollegeCard/CollegeCard';  // Update path if necessary

const CollegePortal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [colleges, setColleges] = useState([]); 
  const [locations, setLocations] = useState([]); 
  const [courses, setCourses] = useState([]); 
  const [selectedLocation, setSelectedLocation] = useState(''); 
  const [selectedCourse, setSelectedCourse] = useState(''); 
  const [openDialog, setOpenDialog] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          q: searchTerm,  
          filter: [
            selectedLocation && { field: 'collegeLocation.keyword', value: selectedLocation },
            selectedCourse && { field: 'courses.courseName', value: selectedCourse }
          ].filter(Boolean)  
        };

        const response = await axios.post('http://localhost:8080/api/v1/search', params);
        if (response.data.success) {
          setColleges(response.data.data.colleges || []); 
          setLocations(response.data.data.locations || []); 
          setCourses(response.data.data.courses || []); 
        }
      } catch (error) {
        console.error('Error fetching colleges:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000); 

    return () => clearInterval(intervalId);  
  }, [searchTerm, selectedLocation, selectedCourse]); 

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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          Filter
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md">
        <DialogTitle>Filter Colleges</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                label="Location"
              >
                <MenuItem value=""><em>All</em></MenuItem>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Course</InputLabel>
              <Select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                label="Course"
              >
                <MenuItem value=""><em>All</em></MenuItem>
                {courses.map((course) => (
                  <MenuItem key={course} value={course}>
                    {course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
          <Button onClick={() => setOpenDialog(false)} color="primary">Apply</Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3}>
        {colleges.length > 0 ? (
          colleges.map((college) => (
            <Grid item xs={12} key={college.id}>
              <CollegeCard college={college} selectedCourse={selectedCourse} />
            </Grid>
          ))
        ) : (
          <Typography>No colleges found.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default CollegePortal;
