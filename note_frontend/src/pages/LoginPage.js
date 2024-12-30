import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Paper } from '@mui/material';
import { loginUser } from '../services/api';
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    if (!username || !password) {
      setError('Both fields are required');
      return;
    }
    setError('');
    handleLogin();
  };

   const handleLogin = async () => {
      try {
        const data =await loginUser(formData);
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        navigate('/notes')
      } catch (error) {
      }
    };
    

  return (
    <Grid
      container
      sx={{
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(135deg, #D9E4F5 0%, #A3C4F7 100%)', // Soft periwinkle gradient
      }}
    >
      <Grid item xs={12} sm={8} md={5} lg={4}>
        <Paper
          elevation={16}
          sx={{
            padding: 4,
            borderRadius: 4,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)', // Light white background
          }}
        >
          <Box textAlign="center" mb={4}>
            <Box
              component="img"
              src="https://img.icons8.com/fluency/96/000000/task.png"
              alt="Daily Notes Logo"
              sx={{ width: 80, height: 80, marginBottom: 2 }}
            />
            <Typography
              variant="h3"
              fontWeight="700"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                color: '#5E4B8B', 
              }}
            >
              Daily Notes
            </Typography>
            <Typography variant="body1" color="textSecondary" mt={1}>
              Your daily productivity partner
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="User Name"
              type="text"
              variant="outlined"
              margin="normal"
              name="username"
              value={formData.email}
              onChange={handleInputChange}
              sx={{
                '& .MuiInputLabel-root': { color: '#5E4B8B' }, 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#5E4B8B' }, 
                  '&.Mui-focused fieldset': { borderColor: '#5E4B8B' },
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              sx={{
                '& .MuiInputLabel-root': { color: '#5E4B8B' }, 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#5E4B8B' }, 
                  '&.Mui-focused fieldset': { borderColor: '#5E4B8B' }, 
                },
              }}
            />
            {error && (
              <Typography color="error" sx={{ textAlign: 'center', marginTop: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              size="large"
              sx={{
                marginTop: 3,
                background: 'linear-gradient(90deg, #F4A300, #D97904)', 
                color: '#fff',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': {
                  background: 'linear-gradient(90deg, #D97904, #F4A300)', 
                },
              }}
            >
              Log In
            </Button>
          </form>
          <Typography mt={3} textAlign="center" fontSize={14} color="textSecondary">
          </Typography>
          <Typography mt={2} textAlign="center" fontSize={14}>
            Don't have an account?{' '}
            <a
              href="/signup"
              style={{
                textDecoration: 'none',
                color: '#5E4B8B',
                fontWeight: '500',
              }}
            >
              Sign up
            </a>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
