import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Link, Card, CardContent, IconButton, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('STUDENT'); // Default role
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT', // Default role
  });

  // Handle role selection
  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
    setFormData((prevFormData) => ({
      ...prevFormData,
      role: selectedRole,
    }));
  };

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validate form fields on input
    if (name === 'name') {
      const hasNumber = /\d/;
      if (value.trim() === '') {
        setNameError('Fill your name');
      } else if (hasNumber.test(value)) {
        setNameError('Name should not contain numbers');
      } else {
        setNameError('');
      }
    }

    if (name === 'confirmPassword' || name === 'password') {
      if (name === 'confirmPassword' && value !== formData.password) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError('');
      }
    }

    if (name === 'password') {
      if (value.trim() === '') {
        setPasswordError('Please fill password');
      } else {
        setPasswordError('');
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields or errors
    if (nameError || confirmPasswordError || passwordError || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fix the errors before submitting.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/users', {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
      });
      console.log(response.data);
      setIsSuccess(true);
      setError('');
    } catch (err) {
      console.error('There was an error with the sign-up process', err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Sign-up failed. Please try again.');
      } else {
        setError('Sign-up failed. Please try again.');
      }
    }
  };

  // Handle navigating back
  const handleBackClick = () => {
    navigate(-1);
  };

  // Navigate to Login page
  const handleClickLoginPage = () => {
    navigate('/Login');
  };

  return (
    <Grid
      container
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f7',
      }}
    >
      <Card style={{ display: 'flex', maxWidth: '960px', width: '100%' }}>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            backgroundImage: `url(${require('../Images/college2.jpg')})`,
            width: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
          }}
        ></Grid>

        <Grid
          item
          xs={12}
          md={6}
          container
          alignItems="center"
          justifyContent="center"
          style={{ padding: '40px' }}
        >
          <CardContent style={{ width: '100%' }}>
            {isSuccess ? (
              <CardContent>
                <Typography variant="h4" align="center" gutterBottom>
                  Success!
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>
                  Your account has been created successfully.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '20px', backgroundColor: '#0F67B1' }}
                  onClick={() => navigate('/Login')}
                >
                  Go to Login
                </Button>
              </CardContent>
            ) : (
              <>
                {/* Back Button */}
                <IconButton style={{ marginBottom: '20px' }} onClick={handleBackClick}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" align="left" gutterBottom>
                  Create an Account
                </Typography>
                <Typography variant="subtitle1" align="left" gutterBottom>
                  Let's get started!
                </Typography>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Email ID"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!error}
                    helperText={error}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!passwordError}
                    helperText={passwordError}
                  />
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    required
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!confirmPasswordError}
                    helperText={confirmPasswordError}
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={formData.role}
                      onChange={handleRoleChange}
                      label="Role"
                      name="role"
                    >
                      <MenuItem value="STUDENT">Student</MenuItem>
                      <MenuItem value="UNIVERSITY">University</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ margin: '20px 0', backgroundColor: '#0F67B1' }}
                  >
                    Sign Up
                  </Button>
                </form>
                <Typography variant="body2" align="center">
                  Already have an account?{' '}
                  <Link href="#" variant="body2" style={{ color: '#0F67B1' }} onClick={handleClickLoginPage}>
                    Login
                  </Link>
                </Typography>
              </>
            )}
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
}
