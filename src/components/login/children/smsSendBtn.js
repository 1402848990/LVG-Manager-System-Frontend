/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { useCountDown } from '@minax/countdown';
import axios from '../../../request/axiosConfig';
import api from '../../../request/api/api_sms';

const Btn1 = props => {
  const { phone } = props;
  const [restTime, resetCountdown] = useCountDown('cnt1', {
    total: 10,
    lifecycle: 'session'
  });

  /**
   * send sms
   */
  const sendCode = () => {
    console.log('send code', phone);
    axios({
      url: api.sendSmsCheckCode,
      method: 'post',
      data: {
        phone,
        way: 'register'
      }
    });
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
  const { phone } = props;
  // console.log('props', props);
  return (
    <>
      <Btn1 phone={phone} />
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
