import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import TodoList from './pages/TodoList/TodoList';
import TaskEdit from './pages/TaskEdit/TaskEdit';

import 'normalize.css';

function App() {
  return (
    <Switch>
      <Route
        exact={true}
        path='/'
        component={TodoList}
      />

      <Route
        exact={true}
        path='/task/:taskId/edit'
        component={TaskEdit}
      />
    </Switch>
  );
}

export default App;
