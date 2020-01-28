import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const regex = RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

// validation, returns true if invalid
const emailInvalid = value => {
  return !regex.test(value);
};

const Email = ({ handleChange, ...props }) => {
  const [error, setError] = useState(false);

  const onChange = event => {
    setError(emailInvalid(event.target.value));
    handleChange(event.target.value);
  };

  return (
    <TextField
      {...props}
      onChange={onChange}
      error={error}
      id="standard-basic"
      label="Email"
      helperText={error ? 'Invalid email' : ''}
      placeholder="example@gmail.com"
    />
  );
};

export default Email;
