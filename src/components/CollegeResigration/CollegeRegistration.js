import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box, Chip, Snackbar, Alert } from "@mui/material";
import axios from "axios";

const CollegeRegistration = () => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState("");
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

  const handleCourseAdd = (e) => {
    if ((e.key === "Enter" || e.key === "Tab") && currentCourse.trim() !== "") {
      e.preventDefault();
      if (!courses.some((course) => course.courseName === currentCourse.trim())) {
        setCourses((prev) => [...prev, { courseName: currentCourse.trim() }]);
        setCurrentCourse(""); // Clear the input
      } else {
        setSnackbar({ open: true, message: "Duplicate course not allowed.", severity: "warning" });
      }
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
      courses, // Send the courses array as-is
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/colleges",
        payload
      );
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
        {[
          { label: "College Name", name: "collegeName" },
          { label: "College Code", name: "collegeCode" },
          { label: "Email", name: "collegeEmail" },
          { label: "Phone Number", name: "collegePhone" },
          { label: "Link", name: "collegeWebSiteLink" },
          { label: "Location", name: "collegeLocation" },
          { label: "Description", name: "collegeDescription" },
        ].map(({ label, name }) => (
          <Grid item xs={12} sm={6} key={name}>
            <TextField
              fullWidth
              label={label}
              name={name}
              variant="outlined"
              value={formData[name]}
              onChange={handleInputChange}
            />
          </Grid>
        ))}
        {/* Course Field */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ marginBottom: 1 }}>Course</Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              border: "1px solid #ccc",
              borderRadius: 1,
              padding: 1,
              alignItems: "center",
            }}
          >
            {courses.map((course, index) => (
              <Chip
                key={index}
                label={course.courseName}
                onDelete={() => handleCourseDelete(course)}
                color="primary"
              />
            ))}
            <TextField
              value={currentCourse}
              onChange={(e) => setCurrentCourse(e.target.value)}
              onKeyDown={handleCourseAdd}
              placeholder="Type a course and press Enter/Tab"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1, minWidth: 120 }}
            />
          </Box>
        </Grid>
        {/* Submit Button */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar for success or error */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CollegeRegistration;
