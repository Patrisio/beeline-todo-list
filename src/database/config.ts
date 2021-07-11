import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCqTUjtuP2U1GXZ4eCOkTIHXQN2zR2USr4",
  authDomain: "beeline-todo-list.firebaseapp.com",
  databaseURL: "https://beeline-todo-list-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "beeline-todo-list",
  storageBucket: "beeline-todo-list.appspot.com",
  messagingSenderId: "857819459254",
  appId: "1:857819459254:web:c9e9972306d540cc2b0017"
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

initFirebase();

export default firebase;