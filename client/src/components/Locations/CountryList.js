import React from 'react';
import { Tabs, Tab } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Loading from '../Loader/Loading'
import CityList from '../Locations/CityList';
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
    value: "",
    currCountryId: "",
    loading: true,
    countries: [],
    cities: [],
    shown: {}
  };

  toggle(panelNumber) {
    this.setState({
      shown: {
        ...this.state.shown,
        [panelNumber]: !this.state.shown[panelNumber]
      }
    });
  }

  async clickHandler(id, index) {
    try {
      const data = await api.getCities(id);
      this.setState({ cities: data, currCountryId: id, value: index })
      console.log(this.state.currCountryId)
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    try {
      const data = await api.getCountries();
      this.setState({ countries: data, loading: false });
    } catch (e) {
      console.log(e);
    }
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
              value={this.state.value}
              onChange={null}
            >
              {this.state.countries.map((country, i) => (
                <Tab label={country.name} key={country._id} onClick={() => this.clickHandler(country._id, i)} />
              ))};
         </Tabs>
          </Paper>
        </Grid>
        <Grid item lg={5} sm={6}>
          <Paper style={styles.City} elevation={3}>
            <CityList countryId={this.state.currCountryId} cities={this.state.cities} />
          </Paper >
        </Grid>
      </Grid>
    );
  }
}
