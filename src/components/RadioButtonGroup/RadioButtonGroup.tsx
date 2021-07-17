import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import styles from './RadioButtonGroup.module.css';

interface Option {
  value: string,
  label: string,
}

interface RadioButtonGroupProps {
  items: Option[],
  onChange: (value: string) => void,
}

export default function RadioButtonGroup({ items, onChange }: RadioButtonGroupProps) {
  const [selectedRadioButtonValue, setValue] = React.useState<string>('all');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedRadioButtonValue = event.target.value;

    setValue(selectedRadioButtonValue);
    onChange(selectedRadioButtonValue);
  };

  const useDefaultStyles = makeStyles({
    label: {
      '&:hover': {
        opacity: '.7',
      },
      backgroundColor: 'transparent',
      transition: '.3s all',
    },
  })

  const useActiveStyles = makeStyles({
    label: {
      backgroundColor: '#3f51b5;',
    },
  })

  const formControlLabelDefaultClasses = useDefaultStyles();
  const formControlLabelActiveClasses = useActiveStyles();

  return (
    <RadioGroup
      aria-label='filters'
      value={selectedRadioButtonValue}
      onChange={handleChange}
    >
      {
        items.map(({ value, label }) => {
          return (
            <FormControlLabel
              classes={selectedRadioButtonValue === value ? formControlLabelActiveClasses : formControlLabelDefaultClasses}
              key={value}
              value={value}
              control={<Radio icon='' checkedIcon='' />}
              label={label}
            />
          );
        })
      }
    </RadioGroup>
  );
}