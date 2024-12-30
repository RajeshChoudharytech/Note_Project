import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography, Paper } from "@mui/material";
import { registerUser } from "../services/api";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email:"",
  });

  const [error, setError] = useState("");
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
    const { first_name, last_name, username, password,email } = formData;

    if (!first_name || !last_name || !username || !password || !email) {
      setError("All fields are required");
      return;
    }

    setError("");
    handleSignUp();
  };

  const handleSignUp = async () => {
 
    try {
      await registerUser(formData);
      navigate("/")
     
    } catch (error) {
      
    }
   
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "linear-gradient(135deg, #D9E4F5 0%, #A3C4F7 100%)", // Soft periwinkle gradient
      }}
    >
      <Grid item xs={12} sm={8} md={5} lg={4}>
        <Paper
          elevation={16}
          sx={{
            padding: 4,
            borderRadius: 4,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            backgroundColor: "rgba(255, 255, 255, 0.95)", 
          }}
        >
          <Box textAlign="center" mb={4}>
            <Box
              component="img"
              src="https://img.icons8.com/fluency/96/000000/add-user-male.png"
              alt="Sign Up Logo"
              sx={{ width: 80, height: 80, marginBottom: 2 }}
            />
            <Typography
              variant="h3"
              fontWeight="700"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                color: "#5E4B8B", 
              }}
            >
              Join Daily Notes
            </Typography>
            <Typography variant="body1" color="textSecondary" mt={1}>
              Start organizing your thoughts today!
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              margin="normal"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              sx={{
                "& .MuiInputLabel-root": { color: "#5E4B8B" },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#5E4B8B" },
                  "&.Mui-focused fieldset": { borderColor: "#5E4B8B" },
                },
              }}
            />
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              margin="normal"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              sx={{
                "& .MuiInputLabel-root": { color: "#5E4B8B" },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#5E4B8B" },
                  "&.Mui-focused fieldset": { borderColor: "#5E4B8B" },
                },
              }}
            />
            <TextField
              fullWidth
              label="User Name"
              type="text"
              variant="outlined"
              margin="normal"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              sx={{
                "& .MuiInputLabel-root": { color: "#5E4B8B" },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#5E4B8B" },
                  "&.Mui-focused fieldset": { borderColor: "#5E4B8B" },
                },
              }}
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              sx={{
                "& .MuiInputLabel-root": { color: "#5E4B8B" },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#5E4B8B" },
                  "&.Mui-focused fieldset": { borderColor: "#5E4B8B" },
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
                "& .MuiInputLabel-root": { color: "#5E4B8B" },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#5E4B8B" },
                  "&.Mui-focused fieldset": { borderColor: "#5E4B8B" },
                },
              }}
            />
            {error && (
              <Typography
                color="error"
                sx={{ textAlign: "center", marginTop: 2 }}
              >
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              size="large"
              sx={{
                marginTop: 3,
                background: "linear-gradient(90deg, #F4A300, #D97904)", // Warm amber and golden gradient
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": {
                  background: "linear-gradient(90deg, #D97904, #F4A300)", // Inverse gradient on hover
                },
              }}
            >
              Create Account
            </Button>
          </form>
          <Typography
            mt={3}
            textAlign="center"
            fontSize={14}
            color="textSecondary"
          >
            Already have an account?{" "}
            <a
              href="/"
              style={{
                textDecoration: "none",
                color: "#5E4B8B", 
                fontWeight: "500",
              }}
            >
              Log in
            </a>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
