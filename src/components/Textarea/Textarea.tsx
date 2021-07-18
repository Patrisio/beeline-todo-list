import React from 'react';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { useStyles } from './styles';

interface TextareaProps {
  placeholder?: string,
  onChange: (e: React.ChangeEvent<{ value: unknown }>) => void,
  error?: boolean,
  value: string,
}

export default function Textarea({ error, ...restProps }: TextareaProps) {
  const classes = useStyles();

  return (
    <div className={`
      ${classes.textareaContainer}
      ${error && classes.textareaContainerError}
    `}>
      <TextareaAutosize
        aria-label='task description'
        style={{
          width: '100%',
          boxSizing: 'border-box',
        }}
        minRows={5}
        { ...restProps }
      />
    </div>
  );
}