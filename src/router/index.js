import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from '../components/layout/Index';
import Login from '../components/login/component';
import BigScreen from '../components/bigScreen';
import AuthRouter from '../components/auth/AuthRouter';
const Router = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} exact path='/login' />
        <Route component={BigScreen} exact path='/bigScreen/:hid' />
        <AuthRouter path='/' component={Layout} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
