import React from 'react';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';

const AuthRouter = ({ component: Component, ...rest }) => {
  console.log('rest', rest);
  // 是否登录
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
