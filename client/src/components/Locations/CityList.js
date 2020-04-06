import React from 'react';
import { Tabs, Tab } from '@material-ui/core'
import Loading from '../Loader/Loading'

export default class FetchData extends React.Component {

  state = {
    loading: true,
    cities: [],
  };

 async componentDidMount() {
    const url = "http://localhost:5000/api/citiesIn/5e8490a3f88bf750f00bb330";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({cities: data, loading: false});
  }

  render() {

    if(this.state.loading) {
      return <div>
        <Loading></Loading>
      </div>
    }

    if(!this.state.cities.length) {
      return <div>No data</div>
    }

    return (
      <div>
         {this.state.cities.map(city=> (
           <Tabs orientation="vertical"
           variant="scrollable"
           onChange={null}
           >
          <Tab label ={city.name} key={city._id }>
          </Tab>
          </Tabs>
         ))};
    </div>
    );
  }
}
