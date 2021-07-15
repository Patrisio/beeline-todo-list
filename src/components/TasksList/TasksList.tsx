import React, { memo } from 'react';

import TaskCard from '../TaskCard/TaskCard';

import { TaskData } from '../../types';
import styles from './TasksList.module.css';

interface TaskListProps {
  tasks: TaskData[],
  deleteTask: (id: string) => void,
  editTask: (id: string) => void,
}

function TasksList({ tasks, ...taskActions }: TaskListProps) {
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
              { ...taskActions }
            />
          );
        })
      }
    </div>
  );
}

export default memo(TasksList);