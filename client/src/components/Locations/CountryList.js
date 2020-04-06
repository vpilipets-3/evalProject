import React from 'react';
import { Tabs, Tab } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Loading from '../Loader/Loading'
import TextField from '@material-ui/core/TextField';

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

export default class FetchData extends React.Component {

 

  state = {
    loading: true,
    countries: [],
    cities: [],
  };

  async clickHandler(index) {
    const url = `http://localhost:5000/api/citiesIn/${index}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ cities: data })
  }

  async componentDidMount() {
    const url = "http://localhost:5000/api/showCountries/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({ countries: data, loading: false });
  }

  render() {

    if (this.state.loading) {
      return <div>
        <Loading />
      </div>
    }

    if (!this.state.countries.length) {
      return <div>No data</div>
    }

    return (
      <Grid container>
        <Grid item lg={3} xs={6}>
          <Paper style={styles.Country} elevation={3}>
            <Tabs orientation="vertical"
              variant="scrollable"
              onChange={null}
              value={0}
            >
              {this.state.countries.map(country => (
                <Tab label={country.name} key={country._id} onClick={() => this.clickHandler(country._id)}>
                </Tab>
              ))};
         </Tabs>
          </Paper>
          <Grid />
        </Grid>
        <Grid item lg={9} xs={6}>
          <Paper style={styles.Country} elevation={3}>
            {this.state.cities.map(city => (
              <TextField label={city.name} key={city._id} />
            ))};
              </Paper >
        </Grid >
      </Grid >
    );
  }
}




