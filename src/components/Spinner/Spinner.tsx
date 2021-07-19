import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from './styles';

export default function Spinner() {
  const classes = useStyles();
  
  return (
    <div className={classes.spinnerContainer}>
      <CircularProgress
        disableShrink
      />
    </div>
  );
}