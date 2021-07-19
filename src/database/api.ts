import firebase from '../database/config';
import { TaskData } from '../types';
import { formatTasks } from '../lib/utils';

const db = firebase.database();

export function addTask(taskData: TaskData, successCallback: (taskId: string, newTaskData: TaskData) => void) {
  try {
    const todoRef = db.ref('Todo');

    todoRef.push(taskData)
      .then(({ key }) => {
        if (key) successCallback(key, taskData);
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  } catch (e) {
    console.log(e);
  }
};

export function removeTask(id: string) {
  try {
    const todoRef = db.ref('Todo').child(id);
    todoRef.remove()
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  } catch (e) {
    console.log(e);
  }
}

export function getTasks(successCallback: (tasks: any) => void) {
  try {
    const todoRef = db.ref('Todo');

    todoRef.once('value', (snapshot) => {
      const todos = snapshot.val();
      const formattedTasks = formatTasks(todos);
  
      successCallback(formattedTasks);
    })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  } catch (e) {
    console.log(e);
  }
}

export function updateTaskById(id: string, taskData: TaskData, successCallback: (taskData: TaskData) => void) {
  try {
    const todoRef = db.ref('Todo').child(id);
    todoRef.update(taskData)
      .then(() => {
        successCallback(taskData);
      })
      .catch((err: any) => {
        console.log('ERROR: ', err);
      });
  } catch (e) {
    console.log(e);
  }
}

export function getTasksByFilter(filterValue: string, successCallback?: (tasks: any) => void) {
  try {
    const todoRef = db.ref('Todo');

    todoRef
      .orderByChild('priority')
      .equalTo(filterValue)
      .once('value', (snapshot) => {
        const todos = snapshot.val();
        const formattedTasks = formatTasks(todos);
  
        successCallback && successCallback(formattedTasks);
      })
        .catch((err) => {
          console.log('ERROR: ', err);
        });
  } catch (e) {
    console.log(e);
  }
}