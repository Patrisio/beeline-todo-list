import React from 'react';
import { Input as MaterialInput } from '@material-ui/core';


interface InputProps {
  onChange: (e: React.ChangeEvent<{ value: unknown }>) => void,
  placeholder?: string,
  fullWidth?: boolean,
  error?: boolean,
  value: string,
}

export default function Input(props: InputProps) {
  return (
    <div>
      <MaterialInput
        { ...props }
      />
    </div>
  );
}