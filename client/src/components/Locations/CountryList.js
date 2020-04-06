import React from 'react';
import { Tabs, Tab } from '@material-ui/core'
import Loading from '../Loader/Loading'

export default class FetchData extends React.Component {

  state = {
    loading: true,
    countries: [],
  };

 async componentDidMount() {
    const url = "http://localhost:5000/api/showCountries/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({countries: data, loading: false});
  }

  render() {

    if(this.state.loading) {
      return <div>
        <Loading></Loading>
      </div>
    }

    if(!this.state.countries.length) {
      return <div>No data</div>
    }

    return (
      <div>
         {this.state.countries.map(country=> (
           <Tabs orientation="vertical"
           variant="scrollable"
           onChange={null}
           >
          <Tab label ={country.name} key={country._id }>
          </Tab>
          </Tabs>
         ))};
    </div>
    );
  }
}
