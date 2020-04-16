/**
 * @description 发送短信验证码按钮组件
 */
/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, message } from 'antd';
import { useCountDown } from '@minax/countdown';
import axios from '../../../request/axiosConfig';
import api from '../../../request/api/api_sms';

const Btn1 = props => {
  const { phone, way } = props;
  const [restTime, resetCountdown] = useCountDown('cnt1', {
    total: 10,
    lifecycle: 'session'
  });

  /**
   * send sms
   */
  const sendCode = async () => {
    console.log('send code', phone);
    // 如果手机号码有问题
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      message.error('手机号码有误！');
      return;
    }
    const res = await axios({
      url: api.sendSmsCheckCode,
      method: 'post',
      data: {
        phone,
        way
      }
    });
    const { data: { success } = {} } = res;
    success ? message.success('短信验证码已发送！') : null;
  };

  return (
    <Button
      style={{ width: '39%' }}
      type='primary'
      disabled={restTime > 0}
      onClick={() => {
        resetCountdown();
        sendCode();
      }}
      shape='round'
    >
      &nbsp;
      {restTime > 0 ? `${restTime}S` : '获取验证码'}
      &nbsp;
    </Button>
  );
};

export default function App(props) {
  const { phone, way } = props;
  // console.log('props', props);
  return (
    <>
      <Btn1 phone={phone} way={way} />
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
