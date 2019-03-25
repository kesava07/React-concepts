import React, { Component, Suspense, lazy } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import asyncComponent from './Hoc/AsyncComponent';


const asyncHome = asyncComponent(() => {
  return import('./Containers/Home');
});

const asyncAbout = asyncComponent(() => {
  return import('./Containers/Wizard');
})
const asyncLogin = asyncComponent(() => {
  return import('./Containers/Auth/Login');
})

const newLazyUsers = lazy(() => import('./Containers/Users/Users'))

class App extends Component {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={asyncHome} />
          <Route path="/user" component={asyncAbout} />
          <Route path="/login" component={asyncLogin} />
          <Route path="/users" component={newLazyUsers} />
        </Switch>
      </Suspense>
    );
  }
}

export default withRouter(App);
