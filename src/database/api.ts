import firebase from '../database/config';
import { TaskData } from '../types';

export function addTask(taskData: TaskData, successCallback: () => void) {
  const db = firebase.database();
  const todoRef = db.ref('Todo');
  console.log(taskData);
  todoRef.push(taskData)
    .then(() => {
      console.log('SUCCESS');
      successCallback();
    })
    .catch((err: any) => {
      console.log('ERROR: ', err);
    });
};