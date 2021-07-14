import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { TaskData } from '../../types';
import { getPriority } from '../../lib/utils/priority';

interface TaskCardProps {
  id: string,
  name: string,
  deadline: string,
  priority: string,
  deleteTask: (id: string) => void,
}

export default function TaskCard({ id, name, deadline, priority, deleteTask }: TaskCardProps) {
  const getDeadline = (dateString: string) => {
    const [date, time] = dateString.split('T');
    return `${date} ${time}`;
  };

  const onDeleteTask = () => {
    deleteTask(id);
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
      <Button
        variant='contained'
        color='primary'
        onClick={onDeleteTask}
      >
        Удалить
      </Button>
    </div>
  );
}