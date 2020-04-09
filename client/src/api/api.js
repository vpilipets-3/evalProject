const apiController = {
  getCities: async (index) => {
    try {
      const url = `http://localhost:5000/api/citiesIn/${index}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  getCountries: async () => {
    try {
      const url = "http://localhost:5000/api/showCountries/";
      const response = await fetch(url);
      const data = await response.json();
      return data;
      //this.setState({ countries: data, loading: false });
    } catch (e) {
      console.log(e);
    }
  },
  async updateCity(data, cityId) {
    try {
      const result = await fetch(`http://localhost:5000/api/cities/${cityId}`, {
        method: 'put',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  },
  async createCity(data) {
    try {
      const result = await fetch('http://localhost:5000/api/createCity', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
};

export default apiController;