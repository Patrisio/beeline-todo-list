import React from 'react';

import { Select as MaterialSelect } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { useStyles } from './styles';

interface Option {
  name: string,
  value: string,
}

interface SelectProps {
  onChange: (e: React.ChangeEvent<{ value: unknown }>) => void,
  options: Option[],
  label: string
  value?: string,
}

export default function Select({ options, label, ...restProps }: SelectProps) {
  const classes = useStyles();
  const selectOptions = options.map(({ value, name }) => <MenuItem key={value} value={value}>{ name }</MenuItem>);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">{ label }</InputLabel>
      <MaterialSelect
        { ...restProps }
      >
        { selectOptions }
      </MaterialSelect>
    </FormControl>
  );
}