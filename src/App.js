import React from 'react';
import Login from './components/login/component';
// import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Router from './router/index';
import './assets/css/app.css';
import './assets/css/common.css';
import './global.css';
import 'antd/dist/antd.css';

class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <Router />
        </Provider>
      </>
    );
  }
}

export default App;
