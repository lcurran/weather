import React from 'react';
import {
  Container,
  Typography,
  makeStyles,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core';
import CloudIcon from '@material-ui/icons/Cloud';
import Form from './components/form';

const useStyles = makeStyles({
  container: {
    marginTop: '5%'
  }
});

function App() {
  const styles = useStyles();
  return (
    <ThemeProvider theme={createMuiTheme()}>
      <Container className={styles.container} maxWidth="md">
        <Typography color="textPrimary" align="left" variant="h2">
          WeatherApp <CloudIcon fontSize="large" />
        </Typography>
        <Form />
      </Container>
    </ThemeProvider>
  );
}

export default App;
