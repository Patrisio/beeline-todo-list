import firebase from '../database/config';
import { TaskData } from '../types';
import { formatTasks } from '../lib/utils/constants';

const db = firebase.database();
let selectedFilter = 'all';

export function addTask(taskData: TaskData, successCallback: (taskId: string, newTaskData: TaskData) => void) {
  const todoRef = db.ref('Todo');

  todoRef.push(taskData)
    .then(({ key }) => {
      console.log('SUCCESS');
      if (key) successCallback(key, taskData);
    })
    .catch((err: any) => {
      console.log('ERROR: ', err);
    });
};

export function removeTask(id: string) {
  const todoRef = db.ref('Todo').child(id);
  todoRef.remove();
}

export function getTasks(successCallback: (tasks: any) => void) {
  const todoRef = db.ref('Todo');

  todoRef.once('value', (snapshot) => {
    const todos = snapshot.val();
    const formattedTasks = formatTasks(todos);

    successCallback(formattedTasks);
  });
}

export function updateTaskById(id: string, taskData: TaskData, successCallback: (taskData: TaskData) => void) {
  const todoRef = db.ref('Todo').child(id);
  todoRef.update(taskData)
    .then(() => {
      console.log('SUCCESS');
      successCallback(taskData);
    })
    .catch((err: any) => {
      console.log('ERROR: ', err);
    });
}

export function getTasksByFilter(filterValue: string, successCallback?: (tasks: any) => void) {
  const todoRef = db.ref('Todo');
  selectedFilter = filterValue;

  todoRef
    .orderByChild('priority')
    .equalTo(filterValue)
    .once('value', (snapshot) => {
      const todos = snapshot.val();
      const formattedTasks = formatTasks(todos);

      successCallback && successCallback(formattedTasks);
    });
}