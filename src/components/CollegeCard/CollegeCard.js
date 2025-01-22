import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const CollegeCard = ({ college }) => {
  return (
    <a href={college.collegeWebSiteLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <Card sx={{ borderRadius: 2, boxShadow: 2, cursor: 'pointer' }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            {college.collegeName}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
            {college.collegeDescription}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Typography variant="body2">📍 {college.collegeLocation}</Typography>
            <Typography variant="body2">📧 {college.collegeEmail}</Typography>
            <Typography variant="body2">📞 {college.collegePhone}</Typography>
          </Box>
        </CardContent>
      </Card>
    </a>
  );
};

export default CollegeCard;

