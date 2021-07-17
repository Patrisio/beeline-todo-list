import React, { memo, Dispatch, SetStateAction } from 'react';

import TaskCard from '../TaskCard/TaskCard';

import { TaskData } from '../../types';
import styles from './TasksList.module.css';

interface TaskListProps {
  tasks: TaskData[],
  deleteTask: (id: string) => void,
  editTask: (id: string) => void,
  updateTasks: Dispatch<SetStateAction<{ [key: string]: string; }[]>>,
}

function TasksList({ tasks, ...taskActions }: TaskListProps) {
  return (
    <div className={styles.tasksListContainer}>
      {
        tasks.map(({ id, name, priority, deadline, status }: TaskData, idx: number) => {
          return (
            <TaskCard
              key={idx}
              id={id}
              name={name}
              priority={priority}
              deadline={deadline}
              status={status}
              { ...taskActions }
            />
          );
        })
      }
    </div>
  );
}

export default memo(TasksList);