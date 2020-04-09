import React from 'react';
import { Tabs, Tab } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Loading from '../Loader/Loading'
import CityList from '../Locations/CityList';
import NewCityForm from '../Dialog/NewCityForm';
import api from '../../api/api'

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
    currCountryId: "",
    loading: true,
    countries: [],
    cities: [],
  };

  logger(data) {
    console.log(data)
  }

  async clickHandler(id) {
    const data = await api.getCities(id);
    this.setState({ cities: data, currCountryId: id })
    console.log(this.state.cities);
  }

  async componentDidMount() {
    const data = await api.getCountries();
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
        <Grid item lg={2} sm={6}>
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
        <Grid item lg={5} sm={6}>
          <Paper style={styles.City} elevation={3}>
            {[this.state.currCountryId ? <NewCityForm countryId={this.state.currCountryId} /> : ""]
            .concat(this.state.cities.map(city => (
              <CityList city={city} key={city._id} />)))
            }
          </Paper >
        </Grid>
      </Grid>
    );
  }
}
