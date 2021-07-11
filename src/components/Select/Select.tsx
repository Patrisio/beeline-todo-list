import React from 'react';

import { Select as MaterialSelect } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './Select.module.css';

interface Option {
  name: string,
  value: string,
}

interface SelectProps {
  onChange: (e: React.ChangeEvent<{ value: unknown }>) => void,
  options: Option[],
  defaultValue: string,
}

export default function Select({ options, ...restProps }: SelectProps) {
  const selectOptions = options.map(({ value, name }) => <MenuItem key={value} value={value}>{ name }</MenuItem>);

  return (
    <FormControl className={styles.formControl}>
      <InputLabel id="demo-simple-select-label">Приоритет</InputLabel>
      <MaterialSelect
        { ...restProps }
      >
        { selectOptions }
      </MaterialSelect>
    </FormControl>
  );
}