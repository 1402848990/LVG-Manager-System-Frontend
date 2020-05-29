/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styles from '../conpenent.scss';
import { Input, Button, message } from 'antd';
import { LockOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import SmsSendBtn from './smsSendBtn';
import axios from '../../../request/axiosConfig';
import api from '../../../request/api/api_user';
import api_sms from '../../../request/api/api_sms';
import { withRouter } from 'react-router-dom';
import { getIPandAddress } from '../../../utils';

class Phone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      code: ''
    };
  }

  /**
   * 登录
   */
  submit = async () => {
    const { phone, code } = this.state;

    // 手机号或验证码为空
    if (!phone) {
      message.error('请输入手机号！');
      return;
    } else if (!code) {
      message.error('请输入验证码！');
      return;
    }

    // 验证短信验证码是否正确有效
    const codeCheck = await this.checkSmsCode();
    console.log('codeCheck', codeCheck);
    if (!codeCheck.data.success) {
      message.error(codeCheck.data.message);
      return;
    }

    // 登录请求
    // const { cip, cname } = await getIPandAddress();
    const res = await axios({
      url: api.login,
      method: 'post',
      data: {
        phone
        // ip: cip,
        // address: cname
      }
    });
    console.log('res', res);

    const { data } = res;
    if (!data.success) {
      message.error(data.message);
      return;
    } else {
      localStorage.setItem('isLogin', '1');
      // 用户信息存入store中
      // this.props.setUserInfo(
      //   Object.assign(
      //     {},
      //     { userName: data.userName, id: data.id },
      //     { isLogin: 1 },
      //     { role: { type: 1, name: '超级管理员' } }
      //   )
      // );
      // 用户信息存localStorage中
      localStorage.setItem(
        'userInfo',
        JSON.stringify(
          Object.assign(
            {},
            { userName: data.userName, id: data.id },
            { role: { type: 1, name: '超级管理员' } }
          )
        )
      );
      // 登录成功跳转首页
      message.success(data.message, 1.5).then(() => {
        this.props.history.push('/index');
      });
    }
  };

  /**
   * 验证smscode
   */
  checkSmsCode = async () => {
    const res = await axios({
      url: api_sms.checkSmsCode,
      method: 'post',
      data: {
        code: this.state.code,
        phone: this.state.phone
      }
    });
    return res;
  };

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

  render() {
    const { phone, code } = this.state;
    return (
      <>
        <div className={styles.form}>
          <div className={styles.inputline}>
            <PhoneOutlined className={styles.icon} />
            <input
              value={phone}
              maxLength={11}
              onChange={this.handleInput}
              name='phone'
              className={styles.name}
              type='phone'
              placeholder='手机号'
            />
          </div>
          <div className={styles.inputline}>
            <LockOutlined className={styles.icon} />
            <input
              value={code}
              onChange={this.handleInput}
              name='code'
              className={styles.check}
              type='number'
              placeholder='验证码'
            />
            <SmsSendBtn phone={phone} way='login' />
          </div>
          <Button
            onClick={this.submit}
            className={styles.submit}
            type='primary'
            shape='round'
            block={true}
          >
            登陆
          </Button>
          <p className={styles.register}>
            还没账户？<a onClick={() => this.props.tabChange('3')}>去注册</a>{' '}
          </p>
        </div>
      </>
    );
  }
}

export default withRouter(Phone);
