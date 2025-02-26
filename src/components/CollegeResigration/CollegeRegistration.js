import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box, Chip, Snackbar, Alert } from "@mui/material";
import axios from "axios";

const CollegeRegistration = () => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState({ courseName: "", seatAvailable: "" });
  const [formData, setFormData] = useState({
    collegeName: "",
    collegeCode: "",
    collegeLocation: "",
    collegeEmail: "",
    collegePhone: "",
    collegeWebSiteLink: "",
    collegeDescription: "",
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseAdd = () => {
    if (currentCourse.courseName.trim() !== "" && currentCourse.seatAvailable.trim() !== "") {
      if (!courses.some((course) => course.courseName === currentCourse.courseName.trim())) {
        setCourses((prev) => [...prev, { ...currentCourse }]);
        setCurrentCourse({ courseName: "", seatAvailable: "" });
      } else {
        setSnackbar({ open: true, message: "Duplicate course not allowed.", severity: "warning" });
      }
    } else {
      setSnackbar({ open: true, message: "Please enter both course name and seat availability.", severity: "error" });
    }
  };

  const handleCourseDelete = (chipToDelete) => {
    setCourses((prev) => prev.filter((course) => course.courseName !== chipToDelete.courseName));
  };

  const validateForm = () => {
    const requiredFields = ["collegeName", "collegeCode", "collegeLocation", "collegeEmail", "collegePhone"];
    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        setSnackbar({ open: true, message: `Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()} field.`, severity: "error" });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = {
      ...formData,
      courses,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/v1/colleges", payload);
      if (response.data.success && response.data.message === "Success") {
        setSnackbar({ open: true, message: "College registered successfully!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: "Unexpected response from the server.", severity: "warning" });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to register college. Please try again.";
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        College Registration
      </Typography>
      <Grid container spacing={2}>
        {["collegeName", "collegeCode", "collegeEmail", "collegePhone", "collegeWebSiteLink", "collegeLocation", "collegeDescription"].map((name) => (
          <Grid item xs={12} sm={6} key={name}>
            <TextField
              fullWidth
              label={name.replace(/([A-Z])/g, " $1").trim()}
              name={name}
              variant="outlined"
              value={formData[name]}
              onChange={handleInputChange}
            />
          </Grid>
        ))}

        <Grid item xs={12} sm={6}>
          <Typography sx={{ marginBottom: 1 }}>Course</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, border: "1px solid #ccc", borderRadius: 1, padding: 1 }}>
            {courses.map((course, index) => (
              <Chip key={index} label={`${course.courseName} (${course.seatAvailable} seats)`} onDelete={() => handleCourseDelete(course)} color="primary" />
            ))}
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                label="Course Name"
                name="courseName"
                variant="outlined"
                size="small"
                value={currentCourse.courseName}
                onChange={handleCourseChange}
              />
              <TextField
                label="Seats Available"
                name="seatAvailable"
                variant="outlined"
                size="small"
                type="number"
                value={currentCourse.seatAvailable}
                onChange={handleCourseChange}
              />
              <Button variant="contained" color="primary" onClick={handleCourseAdd}>
                Add
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CollegeRegistration;
