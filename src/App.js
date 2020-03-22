import React from "react";
import axios from "./request/axiosConfig";
import api from "./request/api/api_user";
import Login from "./login/component";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  /**
   * 获取user信息
   */
  queryUserInfo = async () => {
    const res = await axios({
      url: api.getUserInfo,
      method: "get"
    });
    console.log("res", res);
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
      method: "post",
      data
    });
    console.log(res);
  };

  /**
   * 处理用户名密码输入
   */
  handleInput = event => {
    event.persist();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            {/* 登录 */}
            <Route exact path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
        </HashRouter>
      </>
    );
  }
}

export default App;
