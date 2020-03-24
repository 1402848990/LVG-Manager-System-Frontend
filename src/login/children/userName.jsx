/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styles from '../conpenent.scss';
import axios from '../../request/axiosConfig';
import api from '../../request/api/api_user';
import { Button, Alert } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Verification from '../../verification';
import { withRouter } from 'react-router-dom';

class UserName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      passWord: '',
      sub: ''
    };
    this.checkCode = React.createRef();
  }

  /**
   * 处理用户名密码输入
   */
  handleInput = event => {
    event.persist();
    const { name, value } = event.target;
    console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  /**
   * 登录
   */
  submit = async () => {
    console.log(this.props);
    const { userName, passWord } = this.state;
    // 验证码
    const checkRes = this.checkCode.current.getCheckRes();
    // 用户名或者密码为空
    if (!userName || !passWord) {
      this.props.handleAlert(true, '请输入用户名或密码！');
      return;
    }
    // 验证码不正确
    else if (!checkRes) {
      this.props.handleAlert(true, '验证码不正确！');
      return;
    }

    const res = await axios({
      url: api.login,
      method: 'post',
      data: {
        userName,
        passWord
      }
    });
    console.log('res', res);

    const { data } = res;
    if (!data.success) {
      this.props.handleAlert(true, data.message);
      return;
    } else {
      await this.props.handleAlert(true, data.message, 'success');
      // 登录成功跳转首页
      setTimeout(() => {
        this.props.history.push('/index');
      }, 1000);
    }
  };

  render() {
    const { userName, passWord, sub } = this.state;
    return (
      <>
        <div className={styles.form}>
          <div className={styles.inputline}>
            <UserOutlined className={styles.icon} />
            <input
              value={userName}
              maxLength={20}
              onChange={this.handleInput}
              name='userName'
              className={styles.name}
              type='text'
              placeholder='用户名'
            />
          </div>
          <div className={styles.inputline}>
            <LockOutlined className={styles.icon} />
            <input
              onChange={this.handleInput}
              name='passWord'
              value={passWord}
              className={styles.name}
              type='password'
              placeholder='密码'
            />
          </div>
          <div className={styles.inputline}>
            <LockOutlined className={styles.icon} />
            <input
              className={styles.check}
              value={sub}
              onChange={this.handleInput}
              name='sub'
              type='number'
              placeholder='验证码'
            />
            <Verification ref={this.checkCode} sub={sub} />
          </div>
          <Button
            className={styles.submit}
            onClick={this.submit}
            type='primary'
            shape='round'
            block={true}
          >
            登陆
          </Button>
          <p className={styles.register}>
            还没账户？
            <a onClick={() => this.props.tabChange('3')}>去注册</a>{' '}
          </p>
        </div>
      </>
    );
  }
}

export default withRouter(UserName);
