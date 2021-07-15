import firebase from '../database/config';
import { TaskData } from '../types';

export function addTask(taskData: TaskData, successCallback: (taskData: TaskData) => void) {
  const db = firebase.database();
  const todoRef = db.ref('Todo');

  todoRef.push(taskData)
    .then(() => {
      console.log('SUCCESS');
      successCallback(taskData);
    })
    .catch((err: any) => {
      console.log('ERROR: ', err);
    });
};

export function removeTask(id: string) {
  const todoRef = firebase.database().ref('Todo').child(id);
  todoRef.remove();
}

export function getTasks(successCallback: (tasks: any) => void): void {
  const todoRef = firebase.database().ref('Todo');

  todoRef.on('value', (snapshot) => {
    const todos = snapshot.val();
    const tasks: {[key: string]: string}[] = [];

    for (let id in todos) {
      tasks.push({ id, ...todos[id] });
    }

    successCallback(tasks);
  });
}

export function updateTask(id: string, taskData: TaskData, successCallback: () => void) {
  console.log(taskData, 'taskData');
  const todoRef = firebase.database().ref('Todo').child(id);
  todoRef.update(taskData)
    .then(() => {
      console.log('SUCCESS');
      successCallback();
    })
    .catch((err: any) => {
      console.log('ERROR: ', err);
    });
}