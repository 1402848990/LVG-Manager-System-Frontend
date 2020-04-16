import React from 'react';
import SmsSendBtn from '../../login/children/smsSendBtn';
import axios from '../../../request/axiosConfig';
import api from '../../../request/api/api_user';
import api_sms from '../../../request/api/api_sms';
import { Modal, Form, Input, Button, message } from 'antd';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 9, span: 16 }
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.from = React.createRef();
  }
  onFinish = async values => {
    const { passWord, checkPassWord, checkCode } = values;
    const codeCheck = await this.checkSmsCode(checkCode);
    if (!codeCheck.data.success) {
      message.error(codeCheck.data.message);
      return;
    }
    if (passWord !== checkPassWord) {
      message.error('两次密码输入不一致');
      return;
    }
    const res = await axios({
      url: api.changePassWord,
      method: 'post',
      data: {
        passWord,
        id: this.props.id
      }
    });
    if (res.data.success) {
      message.success('密码修改成功！');
    }
    console.log('Success:', passWord, checkPassWord, checkCode, values);
  };
  /**
   * 验证smscode
   */
  checkSmsCode = async code => {
    const res = await axios({
      url: api_sms.checkSmsCode,
      method: 'post',
      data: {
        code,
        phone: this.props.phone
      }
    });
    return res;
  };
  render() {
    return (
      <>
        <Modal onCancel={this.props.close} visible={this.props.visible}>
          <Form
            ref={this.from}
            {...layout}
            name='basic'
            onFinish={this.onFinish}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label='验证码'
              rules={[{ required: true, message: '请输入验证码!' }]}
            >
              <Form.Item noStyle name='checkCode'>
                <Input name='checkCode' style={{ width: '58%' }} />
              </Form.Item>{' '}
              <SmsSendBtn phone={this.props.phone} way='changePass' />
            </Form.Item>

            <Form.Item
              label='密码'
              name='passWord'
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input type='passWord' />
            </Form.Item>
            <Form.Item
              label='确认密码'
              name='checkPassWord'
              rules={[{ required: true, message: '请再次输入密码!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type='primary' htmlType='submit'>
                确定修改
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
