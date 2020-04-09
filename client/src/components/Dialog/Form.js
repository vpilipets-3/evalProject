import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox'
import api from '../../api/api'


export default class Form extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: props.name,
      description: props.description,
      hotels: props.hotels,
      avaliableIn: props.avaliableIn,
      isCapital: props.isCapital,
      countryId: props.countryId,

    }
    this.isCapitalCheck = this.isCapitalCheck.bind(this)
    this.seasonChange = this.seasonChange.bind(this)
  };

  validate = () => {
    /*
        switch (name) {
          case 'nameError':
            errors.nameError =  ? 'Field must be filled xD' : '';
            break;
          case 'descriptionError':
            errors.descriptionError = value.length < 1 ? 'Field must be filled xD' : '';
            break;
          case 'hotelsError':
            errors.hotelsError = value.length < 1 ? 'Field must be filled xD' : '';
            break;
          default:
            break;
        }
        */
  };

  isCapitalCheck(e) {
    this.setState({
      [e.target.name]: e.target.checked
    })
  };

  hotelsChange(e) {
    this.setState({
      [e.target.name]: (e.target.value).split(',')
    });
  };

  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  seasonChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit(e) {
    e.preventDefault();
    if (!this.props._id && this.state.countryId) {
      api.createCity(this.state);
    }
    else {
      api.updateCity(this.state, this.props._id);
    }
  }

  render() {
    return (
      <form>
        <Grid container>
          <TextField
            error={false}
            name="name"
            label="City Title"
            defaultValue={this.state.name}
            onChange={e => this.inputChange(e)}
            fullWidth={true}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="isCapital"
                checked={this.state.isCapital}
                onChange={this.isCapitalCheck}
                color="primary"
              />
            }
            label="isCapital"
          />
          <TextField
            error={false}
            name="description"
            label="Description"
            multiline
            rowsMax="4"
            defaultValue={this.state.description}
            onChange={e => this.inputChange(e)}
            fullWidth={true}
          />
          <TextField
            error={false}
            name="hotels"
            label="Hotels" inputChange
            defaultValue={this.state.hotels}
            onChange={e => this.hotelsChange(e)}
            fullWidth={true}
          />
          <FormControl
            style={{ marginTop: 20 }}
            fullWidth={true}
            component="seasons">
            <FormLabel component="legend">Best time to visit</FormLabel>
            <RadioGroup row aria-label="position"
              name={"avaliableIn"}
              defaultValue={this.state.avaliableIn}
              onChange={this.seasonChange}>
              <FormControlLabel
                value="Winter"
                control={<Radio color="primary" />}
                label="Winter"
                labelPlacement="end"
              />
              <FormControlLabel
                value="Summer"
                control={<Radio color="primary" />}
                label="Summer"
                labelPlacement="end"
              />
              <FormControlLabel
                value="Both"
                control={<Radio color="primary" />}
                label="Both"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
          <Button
            fullWidth={true}
            style={{ marginTop: 10 }}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={fields => this.onSubmit(fields)}>
            Save
      </Button>
        </Grid>
      </form>
    )
  }

}
