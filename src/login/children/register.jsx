import React from 'react';
import { Button } from 'antd';
import { LockOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import axios from '../../request/axiosConfig';
import api from '../../request/api/api_user';
import api_sms from '../../request/api/api_sms';
import styles from '../conpenent.scss';
import SmsSendBtn from './smsSendBtn';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      passWord: '',
      passWordCheck: '',
      phone: '',
      code: ''
    };
  }

  /**
   * 注册
   */
  submit = async () => {
    const { userName, passWord, passWordCheck, code, phone } = this.state;
    console.log(this.state);

    // 用户名或者密码为空
    if (!userName || !passWord) {
      this.props.handleAlert(true, '请输入用户名或密码！');
      return;
    } else if (passWord !== passWordCheck) {
      this.props.handleAlert(true, '两次密码输入不一致！');
      return;
    } else if (!phone) {
      this.props.handleAlert(true, '请输入手机号！');
      return;
    } else if (!code) {
      this.props.handleAlert(true, '请输入验证码！');
      return;
    }

    // 验证短信验证码是否正确有效
    const codeCheck = await this.checkSmsCode();
    console.log('codeCheck', codeCheck);
    if (!codeCheck.data.success) {
      this.props.handleAlert(true, codeCheck.data.message);
      return;
    }

    const res = await axios({
      url: api.registerUser,
      method: 'post',
      data: this.state
    });
    console.log('注册res', res);

    // 是否注册成功
    if (!res.data.success) {
      this.props.handleAlert(true, res.data.message);
      return;
    }
    this.props.handleAlert(true, res.data.message, 'success');
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
    const { userName, passWord, sub, passWordCheck, phone, code } = this.state;
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
              onChange={this.handleInput}
              name='passWordCheck'
              value={passWordCheck}
              className={styles.name}
              type='password'
              placeholder='确认密码'
            />
          </div>
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
            <SmsSendBtn phone={phone} />
          </div>
          <Button
            className={styles.submit}
            onClick={this.submit}
            type='primary'
            shape='round'
            block={true}
          >
            注册
          </Button>
        </div>
      </>
    );
  }
}
