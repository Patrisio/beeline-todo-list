import React, { useState, useEffect, useCallback } from 'react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Dialog from '../../components/Dialog/Dialog';
import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';
import Textarea from '../../components/Textarea/Textarea';
import DatePicker from '../../components/DatePicker/DatePicker';
import TasksList from '../../components/TasksList/TasksList';
import RadioButtonGroup from '../../components/RadioButtonGroup/RadioButtonGroup';

import { priorities, filters } from '../../lib/utils/constants';
import { addTask, removeTask, getTasks, updateTaskById, getTasksByFilter } from '../../database/api';
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

interface ModalData {
  title: string,
  actionTitle: string,
  action: (data: any, hasDeadline: boolean) => void,
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
    status: {
      hasError: false,
      value: 'inProgress',
    },
    dateCompletion: {
      hasError: false,
      value: '',
    },
  };

  const defaultModalData: ModalData = {
    title: 'Добавление задачи',
    actionTitle: 'Добавить задачу',
    action: (newTaskData, hasDeadline) => makeTask(newTaskData, hasDeadline),
  };

  const [newTaskData, updateNewTaskData] = useState<NewTask>(defaultNewTask);
  const [tasks, updateTasks] = useState<{[key: string]: string}[]>([]);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [hasDeadline, toggleDeadline] = useState<boolean>(true);
  const [modalData, setModalData] = useState<ModalData>(defaultModalData);
  const [isLoading, toggleLoading] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  function makeTask(newTaskData: NewTask, hasDeadline: boolean) {
    const afterTaskAddedSuccessfullyCallback = (taskId: string, newTaskData: TaskData) => {
      resetNewTaskData();
      closeModal();
      updateTasks(prev => {
        return selectedFilter === newTaskData.priority || selectedFilter === 'all' ?
          [...prev, { id: taskId, ...newTaskData }] : prev;
      });
      toggleLoading(prev => !prev);
    };

    toggleLoading(prev => !prev);
    const hasErrors = validateForm(newTaskData, hasDeadline);

    if (hasErrors) {
      toggleLoading(prev => !prev);
      return;
    }
    console.log(newTaskData, 'NEW__');
    const taskData = extractTaskData(newTaskData);
    addTask(taskData, afterTaskAddedSuccessfullyCallback);
  };

  const openModal = (modalData: ModalData) => {
    setModalData(modalData);
    setOpenModal(true);
  };

  const closeModal = () => {
    resetNewTaskData();
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

  const validateForm = (newTaskData: NewTask, hasDeadline: boolean) => {
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

        if (taskFieldName === 'dateCompletion') continue; 

        updateNewTaskData(prev => {
          return {
          ...prev,
          [taskFieldName]: {
            ...prev[taskFieldName],
            hasError: true,
          }
        }});

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

  const getTaskBySelectedFilter = (selectedFilterValue: string) => {
    setSelectedFilter(selectedFilterValue);

    selectedFilterValue === 'all' ? 
    getTasks((tasks: any) => updateTasks(tasks)) :
    getTasksByFilter(selectedFilterValue, (tasks) => updateTasks(tasks));
  };

  const deleteTask = useCallback((taskId: string) => {
    updateTasks(prev => prev.filter(task => task.id !== taskId));
    removeTask(taskId);
  }, [tasks]);

  const editTask = useCallback((id: string) => {
    const taskData = tasks.find(task => task.id === id);

    if (taskData) {
      const { name, description, priority, deadline, status, dateCompletion } = taskData;
      const afterTaskEditedSuccessfullyCallback = (newTaskData: TaskData) => {
        updateTasks(prev => {
          const foundTaskIndex = tasks.findIndex(task => task.id === id);
          prev.splice(foundTaskIndex, 1, { id, ...newTaskData });
          return [...prev];
        });
        closeModal();
      };

      updateNewTaskData({
        name: {
          hasError: false,
          value: name,
        },
        description: {
          hasError: false,
          value: description,
        },
        priority: {
          hasError: false,
          value: priority,
        },
        deadline: {
          hasError: false,
          value: deadline,
        },
        status: {
          hasError: false,
          value: status,
        },
        dateCompletion: {
          hasError: false,
          value: dateCompletion,
        },
      });
      toggleDeadline(!!deadline);
      openModal({
        title: 'Редактировать задачу',
        actionTitle: 'Изменить',
        action: (newTaskData: NewTask) => updateTaskById(id, extractTaskData(newTaskData), afterTaskEditedSuccessfullyCallback),
      });
    }
  }, [tasks]);

  const taskActions = {
    deleteTask,
    editTask,
    updateTasks,
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
        onClick={() => {
          modalData.action(newTaskData, hasDeadline);
        }}
        color='primary'
      >
        { modalData.actionTitle }
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
      <RadioButtonGroup
        items={filters}
        onChange={getTaskBySelectedFilter}
      />

      <Button
        onClick={() => openModal(defaultModalData)}
      >
        Создать задачу
      </Button>

      <TasksList
        tasks={tasks}
        { ...taskActions }      
      />

      <Dialog
        isOpenDialog={isOpenModal}
        isLoading={isLoading}
        onClose={closeModal}
        title={modalData.title}
        actions={<DialogActions />}
      >
        <div className={styles.modalContent}>
          <div className={styles.taskField}>
            <Input
              placeholder='Введите название задачи'
              onChange={(e: React.ChangeEvent<{ value: unknown }>) => updateNewTask(e, 'name')}
              fullWidth
              error={newTaskData.name.hasError}
              value={newTaskData.name.value}
            />
          </div>

          <div className={styles.taskField}>
            <Textarea
              placeholder='Введите описание задачи'
              onChange={(e: React.ChangeEvent<{ value: unknown }>) => updateNewTask(e, 'description')}
              error={newTaskData.description.hasError}
              value={newTaskData.description.value}
            />
          </div>

          <div className={styles.priorityAndDate}>
            <div className={styles.taskField}>
              <Select
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => updateNewTask(e, 'priority')}
                label='Приоритет'
                options={priorities}
                value={newTaskData.priority.value}
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
                value={newTaskData.deadline.value}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}