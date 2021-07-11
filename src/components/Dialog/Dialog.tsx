import React from 'react';

import { Dialog as MaterialDialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

interface DialogProps {
  isOpenDialog: boolean,
  isLoading?: boolean,
  title: string,
  onClose: () => void,
  children: React.ReactElement,
  actions: React.ReactElement,
}

export default function Dialog({
  isOpenDialog,
  isLoading,
  title,
  onClose,
  children,
  actions
}: DialogProps) {
  return (
    <MaterialDialog
      open={isOpenDialog}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
    >
      {
        isLoading ?
        <CircularProgress disableShrink /> :
        <>
          <DialogTitle>{ title }</DialogTitle>

          <DialogContent>
            <DialogContentText>
              { children }
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            { actions }
          </DialogActions>
        </>
      }
    </MaterialDialog>
  );
}