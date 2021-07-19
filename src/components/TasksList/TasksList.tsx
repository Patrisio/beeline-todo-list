import React, { Dispatch, SetStateAction } from 'react';

import TaskCard from '../TaskCard/TaskCard';
import Spinner from '../Spinner/Spinner';

import { TaskData } from '../../types';

interface TaskListProps {
  tasks: TaskData[],
  isLoading: boolean,
  deleteTask: (id: string) => void,
  editTask: (id: string) => void,
  updateTasks: Dispatch<SetStateAction<TaskData[]>>,
}

export default function TasksList({ tasks, isLoading, ...taskActions }: TaskListProps) {
  return (
    <div>
      {
        isLoading ?
        <Spinner /> :
        tasks.map(({
          id, name, description, priority,
          deadline, status, dateCompletion
        }: TaskData) => (
          <TaskCard
            key={id}
            id={id}
            name={name}
            description={description}
            priority={priority}
            deadline={deadline}
            status={status}
            dateCompletion={dateCompletion}
            { ...taskActions }
          />
        ))
      }
    </div>
  );
}