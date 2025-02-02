import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();
  
  // State for form fields, loading, error messages
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth', {
        email: formData.email,
        password: formData.password,
      });

      // On success, navigate to another page (e.g., dashboard or homepage)
      console.log('Login successful:', response.data);
      // You can store the token in localStorage/sessionStorage or context as needed
      localStorage.setItem('authToken', response.data.token); // assuming the API returns a token
      localStorage.setItem('role', response.data.data.role); 
      console.log('role', response.data.data.role)
      navigate('/EduSphere'); // Navigate to the dashboard or home page

    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid credentials, please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back button click (navigate to previous page)
  const handleBackClick = () => {
    navigate(-1);
  };

  // Handle redirect to signup page
  const handleClickSignupPage = () => {
    navigate('/signup');
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
        {/* Image Section */}
        <Grid
          item
          xs={12}
          md={6}
          style={{
            backgroundImage: `url(${require('../Images/college2.jpg')})`, // Adjust the image path
            width: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
          }}
        >
          {/* Image content could be placed here if needed */}
        </Grid>

        {/* Form Section */}
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
            {/* Back Button */}
            <IconButton style={{ marginBottom: '20px' }} onClick={handleBackClick}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" align="left" gutterBottom>
              Welcome Back!
            </Typography>
            <Typography variant="subtitle1" align="left" gutterBottom>
              Login to your account
            </Typography>

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
                error={!!error} // Display error state
                helperText={error} // Display error message
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
                error={!!error} // Display error state
                helperText={error} // Display error message
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      {/* You can add an eye icon here to show/hide password */}
                      <ArrowBackIcon />
                    </IconButton>
                  ),
                }}
              />
              <Grid container justifyContent="space-between" style={{ marginTop: '10px' }}>
                <Link href="#" variant="body2">
                  Forgot Password?
                </Link>
                <Link href="#" variant="body2">
                  Reset Password
                </Link>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ margin: '20px 0', backgroundColor: '#0F67B1' }}
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? <CircularProgress size={24} style={{ color: '#fff' }} /> : 'Login'}
              </Button>
            </form>

            <Typography variant="body2" align="center">
              Don't have an account?{' '}
              <Link href="#" variant="body2" style={{ color: "#0F67B1" }} onClick={handleClickSignupPage}>
                Sign up for Free
              </Link>
            </Typography>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
}
