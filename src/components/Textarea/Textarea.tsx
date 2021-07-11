import React from 'react';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import styles from './Textarea.module.css';

interface TextareaProps {
  placeholder?: string,
  onChange: (e: React.ChangeEvent<{ value: unknown }>) => void,
  error?: boolean,
}

export default function Textarea({ error, ...restProps }: TextareaProps) {
  return (
    <div className={`
      ${styles.textareaContainer}
      ${error && styles.textareaContainerError}
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