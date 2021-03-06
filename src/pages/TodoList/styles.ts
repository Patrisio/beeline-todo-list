import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    todoListTitle: {
      textAlign: 'center',
      padding: '20px',
    },
    button: {
      border: '2px solid #3f51b5',
      width: '542px',
      marginTop: '20px',
      color: '#3f51b5',
    },
    modalContainer: {
      width: '500px',
    },
    modalContent: {
      width: '500px',
    },
    taskField: {
      marginBottom: '20px',
    },
    priorityAndDate: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    makeTaskButtonContainer: {
      margin: '0 auto',
      width: 'fit-content',
    },
  }),
);