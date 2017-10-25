import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Search from '../search';
import Film from '../film';
import './style.sass';

const App = () => (
  <div className="app">
    <Switch>
      <Route path="/search/:query?" component={Search} />
      <Route path="/film/:id/:title?" component={Film} />
      <Redirect from="/" to="/search" />
    </Switch>
  </div>
);

export default App;
