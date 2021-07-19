import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    taskCard: {
      position: 'relative',
      width: '542px',
      padding: '24px',
      marginTop: '20px',
      margin: '0 auto',
      borderRadius: '5px',
      boxShadow: 'rgb(46 41 51 / 8%) 0px 1px 2px, rgb(71 63 79 / 8%) 0px 2px 4px'
    },
    taskCardContainerError: {
      background: 'rgba(255,0,0,.1) !important',
    },
    deadlineTitle: {
      position: 'absolute',
      right: '10px',
      top: '10px',
      color: '#982424',
    },
    taskDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '30px 0',
    },
    deleteButton: {
      background: '#b53f3f',
      color: '#fff',
      marginRight: '10px',
    },
  }),
);