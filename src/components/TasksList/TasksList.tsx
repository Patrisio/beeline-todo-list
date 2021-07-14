import React, { memo, useCallback } from 'react';

import TaskCard from '../TaskCard/TaskCard';

import { removeTask } from '../../database/api';
import { TaskData } from '../../types';
import styles from './TasksList.module.css';

interface TaskListProps {
  tasks: TaskData[],
}

function TasksList({ tasks }: TaskListProps) {
  const deleteTask = useCallback((id: string) => {
    removeTask(id);
  }, [tasks]);

  return (
    <div className={styles.tasksListContainer}>
      {
        tasks.map(({ id, name, priority, deadline }: TaskData, idx: number) => {
          return (
            <TaskCard
              key={idx}
              id={id}
              name={name}
              priority={priority}
              deadline={deadline}
              deleteTask={deleteTask}
            />
          );
        })
      }
    </div>
  );
}

export default memo(TasksList);