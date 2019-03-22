import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import asyncComponent from './Hoc/AsyncComponent';
import Users from './Containers/Users/Users';

const asyncHome = asyncComponent(() => {
  return import('./Containers/Home');
});

const asyncAbout = asyncComponent(() => {
  return import('./Containers/Wizard');
})
const asyncLogin = asyncComponent(() => {
  return import('./Containers/Auth/Login');
})

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={asyncHome} />
        <Route path="/user" component={asyncAbout} />
        <Route path="/login" component={asyncLogin} />
        <Route path="/users" component={Users} />
      </Switch>
    );
  }
}

export default withRouter(App);
