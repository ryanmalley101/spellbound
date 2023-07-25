// pages/signup.js

import {useState} from 'react';
import {useRouter} from 'next/router';
import {Button, Container, TextField, Typography} from '@mui/material';
import {Auth} from "aws-amplify";

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const {user} = await Auth.signUp({
      username: formData.username,
      password: formData.password,
      attributes: {
        email: formData.email
      },
      autoSignIn: { // optional - enables auto sign in after user is confirmed
        enabled: true,
      }
    });
    // Your sign-up logic here, e.g., using Amplify Auth API or other authentication libraries.
    // For simplicity, we'll just log the form data for now.
    console.log('Confirmed User Data:', user);
    // Redirect to the home page after successful sign-up
    router.push(`/signup/confirm/${formData.username}`);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="email"
          required
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="password"
          required
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="password"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignupPage;
