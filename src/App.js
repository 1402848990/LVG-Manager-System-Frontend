import React from 'react';
import axios from './request/axiosConfig';
import api from './request/api/api_user';
import Login from './components/login/component';
import IndexPage from './components/indexPage';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './global.css';
import 'antd/dist/antd.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  /**
   * 获取user信息
   */
  queryUserInfo = async () => {
    const res = await axios({
      url: api.getUserInfo,
      method: 'get'
    });
    console.log('res', res);
  };

  /**
   * 注册
   */
  registerUser = async () => {
    const { username, password } = this.state;
    const data = {
      username,
      password
    };
    const res = await axios({
      url: api.addUser,
      method: 'post',
      data
    });
    console.log(res);
  };

  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            {/* 登录 */}
            <Route exact path='/login' component={Login} />
            {/* 首页 */}
            <Route exact path='/index' component={IndexPage} />
            <Redirect to='/login' />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
