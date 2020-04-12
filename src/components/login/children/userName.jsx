/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styles from '../conpenent.scss';
import axios from '../../../request/axiosConfig';
import api from '../../../request/api/api_user';
import { Button, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Verification from '../../verification';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserInfo } from '@/redux/actions/userInfo';
import { getIPandAddress } from '../../../utils';

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
    // console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  /**
   * 登录
   */
  submit = async () => {
    // console.log(this.props);
    const { userName, passWord } = this.state;
    // 验证码
    const checkRes = this.checkCode.current.getCheckRes();
    // 用户名或者密码为空
    if (!userName || !passWord) {
      message.error('请输入用户名或密码！');
      return;
    }
    // 验证码不正确
    else if (!checkRes) {
      message.error('验证码不正确！');
      return;
    }

    // 发送登录请求
    const { cip, cname } = await getIPandAddress();
    const res = await axios({
      url: api.login,
      method: 'post',
      data: {
        userName,
        passWord,
        ip: cip,
        address: cname
      }
    });
    // console.log('res', res);

    const { data } = res;
    if (!data.success) {
      message.error(data.message);
      return;
    } else {
      localStorage.setItem('isLogin', '1');
      // 用户信息存入store中
      this.props.setUserInfo(
        Object.assign(
          {},
          { userName, id: data.id },
          { isLogin: 1 },
          { role: { type: 1, name: '超级管理员' } }
        )
      );
      // 用户信息存localStorage中
      localStorage.setItem(
        'userInfo',
        JSON.stringify(
          Object.assign(
            {},
            { userName, id: data.id },
            { role: { type: 1, name: '超级管理员' } }
          )
        )
      );

      // 登录成功跳转首页
      message.success(`${data.message}正在跳转...`, 1, onclose).then(() => {
        this.props.history.push('/index');
      });
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

// export default withRouter(UserName);
const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  setUserInfo: data => {
    dispatch(setUserInfo(data));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserName));
