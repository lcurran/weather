import React, { useState } from 'react';
import { Box, makeStyles, Button } from '@material-ui/core';
import Search from './search';
import Email from './email';
import Alert from './alert';
import { createUser } from '../services/api';

const useStyles = makeStyles({
  box: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    marginTop: '10%'
  },
  spacing: {
    marginBottom: '5%',
    marginTop: '5%'
  }
});

const Form = () => {
  const styles = useStyles();
  const [payload, setPayload] = useState({});
  const [error, setError] = useState({ email: false, location: false });
  const [alert, setAlert] = useState({ open: false });

  // change handler for search input
  const handleSearchChange = (value, hasError) => {
    setPayload({ location: value, email: payload.email });
    setError({ location: hasError });
  };

  // change handler for email input
  const handleEmailChange = (value, hasError) => {
    setPayload({ email: value, location: payload.location });
    setError({ email: hasError });
  };

  const handleSubmit = () => {
    if (error.email || error.location) {
      return setAlert({
        open: true,
        message: 'Please enter valid email and location',
        status: 'error'
      });
    }
    return createUser(payload).then(res => {
      if (res.status === 201) {
        setAlert({
          status: 'success',
          message: 'You have been subscribed to the mailing list',
          open: true
        });
      } else {
        const dupError = res.data.includes('duplicate key error');
        setAlert({
          status: 'error',
          message: dupError
            ? 'That email is already registered.'
            : 'There was a problem, please try again.',
          open: true
        });
      }
    });
  };

  return (
    <Box className={styles.box}>
      <Email
        handleChange={handleEmailChange}
        className={styles.spacing}
        error={error.email}
      />
      <Search handleChange={handleSearchChange} />
      <Button
        onClick={handleSubmit}
        className={styles.spacing}
        variant="contained"
        color="primary"
      >
        Subscribe
      </Button>
      {alert.open && (
        <Alert
          key={alert.key}
          onClose={() => setAlert({ open: false })}
          status={alert.status}
        >
          {alert.message}
        </Alert>
      )}
    </Box>
  );
};

export default Form;
