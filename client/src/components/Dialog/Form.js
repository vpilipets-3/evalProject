import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';



export default class Form extends Component {
  state = {
    name: '',
    description: '',
    hotels: ["test1", "test2"],
    avaliableIn: '',
    isCapital: false,
    countryId: '',
  }

  async postData(data) {
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

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.onSubmit(this.postData(this.state));
  }

  render() {
    return (
      <form>
        <Grid container>
        <TextField
          name="name"
          label="City Title"
          defaultValue= {this.state.name}
          onChange={e => this.change(e)} 
          fullWidth = {true}
          />
        <br />
        <TextField
          name="name"
          label="Description"
          multiline
          rowsMax="4"
          defaultValue= {this.state.description}
          onChange={e => this.change(e)} 
          fullWidth = {true}
          />
        <br />
        <TextField
          name="name"
          label="Hotels"
          defaultValue= {this.state.hotels}
          onChange={e => this.change(e)} 
          fullWidth = {true}
          />
        <br />
        <TextField
          name="name"
          label="Season"
          defaultValue= {this.state.name}
          onChange={e => this.change(e)} 
          fullWidth = {true}
          />
                    <Button
        style={{ marginTop: 5}}
        variant="contained"
        color="primary"
        size="small"
        startIcon={<SaveIcon />}
        onClick={fields => this.onSubmit(fields)}>
        Save
      </Button>
        <br />
        </Grid>
      </form>
    )
  }

}