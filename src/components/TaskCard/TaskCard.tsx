import React, { Dispatch, SetStateAction } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '../../components/Select/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { TaskData } from '../../types';
import { useStyles } from './styles';
import { getPriority, statuses, getDateTime, getFormattedDateTime, checkDeadlineBroken } from '../../lib/utils/constants';
import { updateTaskById } from '../../database/api';
import styles from './TaskCard.module.css';


interface TaskCardProps {
  id: string,
  name: string,
  description: string,
  deadline: string,
  priority: string,
  status: string,
  dateCompletion: string,
  deleteTask: (id: string) => void,
  editTask: (id: string) => void,
  updateTasks: Dispatch<SetStateAction<{ [key: string]: string; }[]>>,
}

export default function TaskCard({ id, name, description, deadline, priority, status, dateCompletion, deleteTask, editTask, updateTasks }: TaskCardProps) {
  const classes = useStyles();

  const onDeleteTask = () => {
    deleteTask(id);
  };

  const onEditTask = () => {
    editTask(id);
  };

  const getDateCompletion = (selectedStatus: string) => {
    return selectedStatus === 'done' ? getDateTime() : '';
  };

  const updateTaskStatus = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedStatus = e.target.value as string;
    const successCallback = () => updateTasks(prev => {
      const foundTask = prev.find(task => task.id === id);
      const foundTaskIndex = prev.findIndex(task => task.id === id);

      prev.splice(foundTaskIndex, 1, { ...foundTask, status: selectedStatus, dateCompletion: getDateCompletion(selectedStatus) });

      return [...prev];
    });
    updateTaskById(id, { name, deadline, priority, status: selectedStatus, dateCompletion: getDateCompletion(selectedStatus) }, successCallback);
  };

  const isDeadlineBroken = deadline && checkDeadlineBroken(deadline, Date.now());

  return (
    <div
      className={`
        ${isDeadlineBroken ? styles.taskCardContainerError : styles.taskCardContainer}
        ${classes.taskCard}
      `}
    >
      <Typography variant='h5'>
        { name }
      </Typography>
      <Typography variant="body2" gutterBottom>
        { description }
      </Typography>

      <div className={classes.taskDetails}>
        <div>
          <Typography variant='subtitle2'>
            {`Дедлайн: ${deadline ? getFormattedDateTime(deadline) : 'не установлен'}`}
          </Typography>
          <Typography variant='subtitle2'>
            {`Приоритет: ${getPriority(priority)}`}
          </Typography>
          {
            isDeadlineBroken &&
            <span className={classes.deadlineTitle}>
              {`ПРОСРОЧЕНА`}
            </span>
          }
          {
            dateCompletion &&
            <Typography variant='subtitle2'>
              {`Завершена: ${getFormattedDateTime(dateCompletion)}`}
            </Typography>
          }
        </div>
        <Select
          onChange={updateTaskStatus}
          label='Статус'
          options={statuses}
          value={status}
        />
      </div>

      <div>
        <Button
          variant='contained'
          onClick={onDeleteTask}
          startIcon={<DeleteIcon />}
          className={classes.deleteButton}
        >
          Удалить
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={onEditTask}
          startIcon={<EditIcon />}
        >
          Редактировать
        </Button>
      </div>
    </div>
  );
}