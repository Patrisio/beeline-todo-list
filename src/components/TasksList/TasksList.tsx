import React, { memo, Dispatch, SetStateAction } from 'react';

import TaskCard from '../TaskCard/TaskCard';

import { TaskData } from '../../types';

interface TaskListProps {
  tasks: TaskData[],
  deleteTask: (id: string) => void,
  editTask: (id: string) => void,
  updateTasks: Dispatch<SetStateAction<{ [key: string]: string; }[]>>,
}

function TasksList({ tasks, ...taskActions }: TaskListProps) {
  return (
    <div>
      {
        tasks.map(({ id, name, description, priority, deadline, status, dateCompletion }: TaskData, idx: number) => {
          return (
            <TaskCard
              key={idx}
              id={id}
              name={name}
              description={description}
              priority={priority}
              deadline={deadline}
              status={status}
              dateCompletion={dateCompletion}
              { ...taskActions }
            />
          );
        })
      }
    </div>
  );
}

export default memo(TasksList);