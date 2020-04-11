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
      nameErr: "",
      descriptionErr: "",
      hotelsErr: ""
    }
    this.isCapitalCheck = this.isCapitalCheck.bind(this)
    this.seasonChange = this.seasonChange.bind(this)
  };

  validate = () => {
    let isError = false;
    const errors = {};

    const format = /[`!@#$%^&*()_+\-={};':"\\|,.<>?~1234567890]/;
    this.setState({
      nameErr: "",
      descriptionErr: "",
      hotelsErr: ""
    });
    // switch case needed
    if (!this.state.name) {
      isError = true;
      errors.nameErr = "Title can't be empty!"
    }

    if(format.test(this.state.name))
    {
      isError = true;
      errors.nameErr = "Title can't contain special charachters and numbers!"
    }

    if (!this.state.description) {
      isError = true;
      errors.descriptionErr = "Description can't be empty!"
    }

    if (!this.state.hotels) {
      isError = true;
      errors.hotelsErr = "Must contain hotels!"
    }
       this.setState({
         ...this.setState,
         ...errors
       });

     return isError;
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
    const err = this.validate();
    if(err) {
      console.log(this.state, err);
      return 0;
    }
    if (!this.props._id && this.state.countryId) {
      api.createCity(this.state);
    } else {
      api.updateCity(this.state, this.props._id);
    }
  }

  render() {
    return (
      <form>
        <Grid container>
          <TextField
            error={this.state.nameErr}
            helperText={this.state.nameErr}
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
            error={this.state.descriptionErr}
            helperText={this.state.descriptionErr}
            name="description"
            label="Description"
            multiline
            rowsMax="4"
            defaultValue={this.state.description}
            onChange={e => this.inputChange(e)}
            fullWidth={true}
          />
          <TextField
            error={this.state.hotelsErr}
            helperText={this.state.hotelsErr}
            name="hotels"
            label="Hotels"
            defaultValue={this.state.hotels}
            onChange={e => this.hotelsChange(e)}
            fullWidth={true}
          />
          <FormControl
            style={{ marginTop: 20 }}
            fullWidth={true}
            >
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
