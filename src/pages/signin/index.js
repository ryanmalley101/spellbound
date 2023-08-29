// pages/LoginPage.js
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Auth} from 'aws-amplify';
import {Button, TextField, Typography, Container, Box} from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await Auth.signIn(username, password);

      await router.push('/'); // Redirect to the dashboard page after successful login
    } catch (error) {
      console.log('Error signing in:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" noValidate onSubmit={handleLogin} sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
            Log in
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
