import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Button, Container, TextField, Typography} from '@mui/material';
import {Auth} from 'aws-amplify';

const SignupConfirmationPage = () => {
  const router = useRouter();
  const [confirmationCode, setConfirmationCode] = useState('');
  const [username, setUsername] = useState('');

  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    const initialFetch = async () => {
      const nameQuery = router.query.username;
      console.log(nameQuery)
      setUsername(nameQuery)
      console.log(`Post set username`)
      console.log(username)
    }
    if (!router.isReady) return
    initialFetch()
  }, [router.isReady])

  const handleChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleConfirmSignUp = async () => {
    try {
      // Call the Amplify Auth API to confirm the sign-up
      await Auth.confirmSignUp(username, confirmationCode);

      // Set the confirmation message
      setConfirmationMessage('Your sign-up is confirmed!');

      // Redirect to the home page after successful confirmation
      router.push('/');
    } catch (error) {
      console.log('Error confirming sign-up:', error);
      setConfirmationMessage('Error confirming sign-up. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up Confirmation
      </Typography>
      <TextField
        label="Confirmation Code"
        value={confirmationCode}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <Typography variant="body1" align="center" gutterBottom>
        {confirmationMessage}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleConfirmSignUp}
      >
        Confirm Sign Up
      </Button>
    </Container>
  );
};

export default SignupConfirmationPage;
