import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Dialog from '../../components/Dialog/Dialog';
import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';
import Textarea from '../../components/Textarea/Textarea';
import DatePicker from '../../components/DatePicker/DatePicker';
import TasksList from '../../components/TasksList/TasksList';

import { priorities } from '../../lib/utils/priority';
import { addTask, getTasks } from '../../database/api';
import { TaskData } from '../../types';
import styles from './TodoList.module.css';

interface FormattedTask {
  [key: string]: string,
}

interface FormField {
  hasError: boolean,
  value: string,
}

interface NewTask {
  [key: string]: FormField
}

export default function TodoList() {
  const defaultNewTask = {
    name: {
      hasError: false,
      value: '',
    },
    description: {
      hasError: false,
      value: '',
    },
    priority: {
      hasError: false,
      value: 'usual',
    },
    deadline: {
      hasError: false,
      value: '',
    },
  };

  const [newTaskData, updateNewTaskData] = useState<NewTask>(defaultNewTask);
  const [tasks, updateTasks] = useState<{[key: string]: string}[]>([]);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [hasDeadline, toggleDeadline] = useState<boolean>(true);
  const [isLoading, toggleLoading] = useState<boolean>(false);

  const openModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const resetNewTaskData = () => {
    updateNewTaskData(defaultNewTask);
  };

  const updateNewTask = (e: React.ChangeEvent<{ value: unknown }>, taskField: string) => {
    const taskFieldValue = e.target.value as string;

    updateNewTaskData(prev => ({
      ...prev,
      [taskField]: {
        ...prev[taskField],
        value: taskFieldValue
      },
    }));
  };

  const afterTaskAddedSuccessfullyCallback = (newTask: TaskData) => {
    resetNewTaskData();
    closeModal();
    // updateTasks(prev => [...prev, newTask]);
    toggleLoading(prev => !prev);
  };

  const handleDeadline = () => {
    toggleDeadline(prev => {
      if (prev && newTaskData.deadline) {
        updateNewTaskData(prev => ({
          ...prev,
          deadline: {
            ...prev.deadline,
            value: '',
          }
        }));
      }

      return !prev;
    });
  };

  const validateForm = () => {
    let hasErrors = false;

    for (let taskFieldName in newTaskData) {
      const { value } = newTaskData[taskFieldName];
      const isEmptyTaskFieldValue = !value.trim().length;

      if (isEmptyTaskFieldValue) {
        if (taskFieldName === 'deadline' && !hasDeadline) {
          updateNewTaskData(prev => ({
            ...prev,
            deadline: {
              ...prev.deadline,
              hasError: false,
            }
          }));
          continue;
        }

        updateNewTaskData(prev => ({
          ...prev,
          [taskFieldName]: {
            ...prev[taskFieldName],
            hasError: true,
          }
        }));

        hasErrors = true;
        continue;
      }

      updateNewTaskData(prev => ({
        ...prev,
        [taskFieldName]: {
          ...prev[taskFieldName],
          hasError: false,
        }
      }));
    }

    return hasErrors;
  };

  const extractTaskData = (taskData: NewTask): FormattedTask => {
    let formattedTaskData: FormattedTask = {};

    for (let taskFieldName in taskData) {
      formattedTaskData[taskFieldName] = taskData[taskFieldName].value;
    }

    return formattedTaskData;
  }; 

  const makeTask = () => {
    toggleLoading(prev => !prev);
    const hasErrors = validateForm();
    if (hasErrors) {
      toggleLoading(prev => !prev);
      return;
    }
    const taskData = extractTaskData(newTaskData);
    addTask(taskData, afterTaskAddedSuccessfullyCallback);
  };

  const DialogActions = () => (
    <>
      <Button
        onClick={closeModal}
        color='primary'
      >
        Отмена
      </Button>

      <Button
        onClick={makeTask}
        color='primary'
      >
        Создать задачу
      </Button>
    </>
  )

  useEffect(() => {
    getTasks((tasks: any) => {
      updateTasks(tasks);
    });
  }, []);

  return (
    <div>
      <Button
        onClick={openModal}
      >
        Создать задачу
      </Button>

      <TasksList
        tasks={tasks}      
      />

      <Dialog
        isOpenDialog={isOpenModal}
        isLoading={isLoading}
        onClose={closeModal}
        title='Добавление задачи'
        actions={<DialogActions />}
      >
        <div className={styles.modalContent}>
          <div className={styles.taskField}>
            <Input
              placeholder='Введите название задачи'
              onChange={(e: React.ChangeEvent<{ value: unknown }>) => updateNewTask(e, 'name')}
              fullWidth
              error={newTaskData.name.hasError}
            />
          </div>

          <div className={styles.taskField}>
            <Textarea
              placeholder='Введите описание задачи'
              onChange={(e: React.ChangeEvent<{ value: unknown }>) => updateNewTask(e, 'description')}
              error={newTaskData.description.hasError}
            />
          </div>

          <div className={styles.priorityAndDate}>
            <div className={styles.taskField}>
              <Select
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => updateNewTask(e, 'priority')}
                options={priorities}
                defaultValue='usual'
              />
            </div>

            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hasDeadline}
                    onChange={handleDeadline}
                    name='hasDeadline'
                    color='primary'
                  />
                }
                label='Есть дедлайн?'
              />
              <DatePicker
                label='Дата и время выполнения задачи'
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => updateNewTask(e, 'deadline')}
                disabled={!hasDeadline}
                error={newTaskData.deadline.hasError}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}