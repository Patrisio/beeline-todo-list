import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '../../components/Select/Select';

import { TaskData } from '../../types';
import { getPriority, statuses } from '../../lib/utils/constants';
import { updateTask } from '../../database/api';


interface TaskCardProps {
  id: string,
  name: string,
  deadline: string,
  priority: string,
  status: string,
  deleteTask: (id: string) => void,
  editTask: (id: string) => void,
}

export default function TaskCard({ id, name, deadline, priority, status, deleteTask, editTask }: TaskCardProps) {
  const getDeadline = (dateString: string) => {
    const [date, time] = dateString.split('T');
    return `${date} ${time}`;
  };

  const onDeleteTask = () => {
    deleteTask(id);
  };

  const onEditTask = () => {
    editTask(id);
  };

  const updateTaskStatus = (e: React.ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as string;
    const successCallback = () => {};
    updateTask(id, { name, deadline, priority, status: value }, successCallback);
  };

  return (
    <div>
      <Typography variant='h5'>
        { name }
      </Typography>
      <Typography variant='subtitle2'>
        {`Дедлайн: ${deadline ? getDeadline(deadline) : 'не установлен'}`}
      </Typography>
      <Typography variant='subtitle2'>
        {`Приоритет: ${getPriority(priority)}`}
      </Typography>
      <Select
        onChange={updateTaskStatus}
        label='Статус'
        options={statuses}
        value={status}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={onDeleteTask}
      >
        Удалить
      </Button>
      <Button
        variant='contained'
        color='primary'
        onClick={onEditTask}
      >
        Редактировать
      </Button>
    </div>
  );
}