import React from 'react';
import Grid from '@material-ui/core/Grid'
import AppBar from './components/AppBar/AppBar'
import Paper from '@material-ui/core/Paper'
import CountryList from './components/Locations/CountryList'
import CityList from './components/Locations/CityList'

const styles = {
  Country: {
    padding: 20,
    marginRight: 20,
    marginTop: 10
  },
  City: {
    padding: 20,
    marginRight: 20,
    marginTop: 70
  }
}

function App() {
  return (
    <Grid container>
      <AppBar />
      <Grid container>
        <Grid item lg={3} xs={6}>
          <Paper style={styles.Country} elevation={3}>
            <CountryList />
          </Paper >
        </Grid>
        <Grid item lg={9} xs={6}>
          <Paper style={styles.City} elevation={3}>
            <CityList />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;

