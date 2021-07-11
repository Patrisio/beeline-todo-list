import React from 'react';
import TextField from '@material-ui/core/TextField';

interface DatePickerProps {
  label?: string
  onChange: (e: React.ChangeEvent<{ value: unknown }>) => void,
  disabled?: boolean,
  error?: boolean,
}

export default function DatePicker(props: DatePickerProps) {
  return (
    <form noValidate>
      <TextField
        { ...props }
        type='datetime-local'
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}