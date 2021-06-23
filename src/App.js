import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { Root } from '~/routes/Root';

export const App = () => {
  return (
    <div className="App">
      <Switch
      >
        <Route
          path="/"
        >
          <Root
          />
        </Route>
      </Switch>
    </div>
  );
}

