import React from 'react';
import { Tabs, Tab } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Loading from '../Loader/Loading'
import CityList from '../Locations/CityList';
import NewCityForm from '../Dialog/NewCityForm';

const styles = {
  Country: {
    padding: 20,
    marginRight: 20,
    marginTop: 10,
  },
  City: {
    padding: 5,
    marginRight: 20,
    marginTop: 10,
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
    this.setState({ cities: data, loading: false })
  }

  async componentDidMount() {
    const url = "http://localhost:5000/api/showCountries/";
    const response = await fetch(url);
    const data = await response.json();
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
        <Grid item>
          <Paper style={styles.Country} elevation={3}>
            <Tabs orientation="vertical"
              variant="scrollable"
              value={0}
              onChange={null}
            >
              {this.state.countries.map(country => (
                <Tab label={country.name} key={country._id} onClick={() => this.clickHandler(country._id)} />
              ))};
         </Tabs>
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={styles.City} elevation={3}>
          <NewCityForm {...this.state.countries}/>
            {this.state.cities.map(city => (
              <CityList city={city} key={city._id}/>
            ))};
              </Paper >
        </Grid>
      </Grid>
    );
  }
}
