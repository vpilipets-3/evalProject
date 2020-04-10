import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
    console.log(panel);
    setExpanded(isExpanded ? panel : false);
  };

  return (
    
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded === `panel${props.expanded}`} onChange={handleChange(`panel${props.expanded}`)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          id={props.city._id}
        >
          <Typography className={classes.heading}>{props.city.name}</Typography>
          <Typography className={classes.secondaryHeading}>{props.city.description}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Form {...props.city}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
