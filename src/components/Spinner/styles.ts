import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    spinnerContainer: {
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
    },
  }),
);