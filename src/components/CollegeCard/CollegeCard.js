import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const CollegeCard = ({ college, selectedCourse }) => {
  const selectedCourseData = college.courses?.find(
    (course) => course.courseName === selectedCourse
  );

  return (
    <a
      href={college.collegeWebSiteLink || "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <Card sx={{ borderRadius: 2, boxShadow: 2, cursor: 'pointer', marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            {college.collegeName || "Unknown College"}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
            {college.collegeDescription || "No description available."}
          </Typography>

          {selectedCourse && selectedCourseData ? (
            <Box sx={{ marginTop: 1, padding: 1, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
              <Typography variant="body1" fontWeight="bold">
                {selectedCourseData.courseName} - Seats Available: {selectedCourseData.seatAvailable}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Select a course to see seat availability.
            </Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Typography variant="body2">📍 {college.collegeLocation || "Unknown Location"}</Typography>
            <Typography variant="body2">📧 {college.collegeEmail || "No email available"}</Typography>
            <Typography variant="body2">📞 {college.collegePhone || "No phone available"}</Typography>
          </Box>
        </CardContent>
      </Card>
    </a>
  );
};

export default CollegeCard;
