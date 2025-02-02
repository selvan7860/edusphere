import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, Select, MenuItem, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import CollegeCard from '../CollegeCard/CollegeCard';  // Update path if necessary

const CollegePortal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [colleges, setColleges] = useState([]); // State to store colleges data
  const [locations, setLocations] = useState([]); // State to store locations
  const [courses, setCourses] = useState([]); // State to store courses
  const [selectedLocation, setSelectedLocation] = useState(''); // State for selected location
  const [selectedCourse, setSelectedCourse] = useState(''); // State for selected course
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog open/close

  // Fetch colleges data and filter options from backend API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Constructing the request body based on the filters
        const params = {
          q: searchTerm,  // Passing searchTerm as q
          filter: [
            selectedLocation && { field: 'collegeLocation', value: selectedLocation },
            selectedCourse && { field: 'courses.courseName', value: selectedCourse }
          ].filter(Boolean)  // Filtering out any empty values
        };

        const response = await axios.post('http://localhost:8080/api/v1/search', params);
        if (response.data.success) {
          setColleges(response.data.data.colleges); // Store the fetched colleges data in state
          setLocations(response.data.data.locations); // Set locations
          setCourses(response.data.data.courses); // Set courses
        }
      } catch (error) {
        console.error('Error fetching colleges:', error);
      }
    };

    // Initial fetch when the component mounts
    fetchData();

    // Set an interval to fetch the data every 5 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);

  }, [searchTerm, selectedLocation, selectedCourse]); // Re-fetch when search term or filters change

  const handleDialogOpen = () => setOpenDialog(true); // Open the filter dialog
  const handleDialogClose = () => setOpenDialog(false); // Close the filter dialog

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        College Portal
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 3 }}>
        {/* Search Term Input */}
        <TextField
          label="College Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
        />
        {/* Filter Button to open the Dialog */}
        <Button variant="contained" color="primary" onClick={handleDialogOpen}>
          Filter
        </Button>
      </Box>

      {/* Dialog for Location and Course Filters */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="md">
        <DialogTitle>Filter Colleges</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 3 }}>
            {/* Location Dropdown Filter */}
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                label="Location"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Course Dropdown Filter */}
            <FormControl fullWidth>
              <InputLabel>Course</InputLabel>
              <Select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                label="Course"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
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
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Displaying Filtered Colleges */}
      <Grid container spacing={3}>
        {colleges.map((college) => (
          <Grid item xs={12} key={college.id}>
            <CollegeCard college={college} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CollegePortal;
