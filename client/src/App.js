import React from 'react';
import Grid from '@material-ui/core/Grid'
import AppBar from './components/AppBar/AppBar'
import CountryList from './components/Locations/CountryList'


function App() {
  return (
    <Grid container>
      <AppBar />
            <CountryList />
    </Grid>
  );
}

export default App;

