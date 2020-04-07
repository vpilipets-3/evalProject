const apiController = {
  clickHandler: async (index) => {
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
};

export default apiController;
