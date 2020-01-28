import React from 'react';
import { Alert } from '@material-ui/lab';

const CustomAlert = ({ children, status, onClose }) => {
  return (
    <Alert onClose={onClose} severity={status}>
      {children}
    </Alert>
  );
};

export default CustomAlert;
