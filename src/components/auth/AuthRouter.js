import React from 'react';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import store from '@/redux/store';

const AuthRouter = ({ component: Component, ...rest }) => {
  // const {}
  // 是否登录
  const { userName } = store.getState();
  const isLogged = localStorage.getItem('isLogin') === '1' ? true : false;
  return (
    <Route
      {...rest}
      render={props =>
        isLogged ? <Component {...props} /> : <Redirect to={'/login'} />
      }
    />
  );
};

export default withRouter(AuthRouter);
