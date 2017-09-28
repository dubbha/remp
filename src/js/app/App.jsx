import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SearchPage from '../searchPage';
import FilmPage from '../filmPage';
import './style.sass';

const App = () => (
  <div className="app">
    <Switch>
      <Route path="/search/:query?" component={SearchPage} />
      <Route path="/film/:title" component={FilmPage} />
      <Redirect from="/" to="/search" />
    </Switch>
  </div>
);

export default App;
