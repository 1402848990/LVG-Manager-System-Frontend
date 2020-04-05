import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from '../components/layout/Index';
import Login from '../components/login/component';
import AuthRouter from '../components/auth/AuthRouter';
const Router = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} exact path='/login' />
        <AuthRouter path='/' component={Layout} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
