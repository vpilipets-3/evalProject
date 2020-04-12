import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

import Form from '../Dialog/Form'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 2,
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {props.cities.map(city => (
        <ExpansionPanel key={city._id} expanded={expanded === `panel${city.name}`} onChange={handleChange(`panel${city.name}`)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            key={city._id}
          >
            <Typography key={city._id} className={classes.heading}> {city.name} </Typography>
            <Typography key={city._id} className={classes.secondaryHeading}>{city.description}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Form key={city._id} {...city} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )).concat( <ExpansionPanel expanded={expanded === `panelNewCity`} onChange={handleChange(`panelNewCity`)}>
      <ExpansionPanelSummary
        expandIcon={<AddIcon color={"primary"} />}
      >
        <Typography color={"primary"}> Add new city </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Form countryId = {props.countryId}></Form>
    </ExpansionPanelDetails>
  </ExpansionPanel>)}

    </div>
  );
}
