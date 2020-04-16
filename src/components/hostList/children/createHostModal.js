/**
 * @description 创建主机时弹出的Modal
 */
import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Modal,
  Select,
  Slider,
  Spin,
  message
} from 'antd';
import axios from '@/request/axiosConfig';
import api from '@/request/api/api_host';
import api_logs from '@/request/api/api_logs';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

// 配置From rules
const validateMessages = {
  required: '这是必填项！',
  types: {
    email: 'is not validate email!',
    number: '必须是数字！'
  },
  number: {
    range: ' must be between ${min} and ${max}'
  }
};

// 操作系统类型
const sysType = [
  'Windows Server 2008 R2',
  'Windows Server 2012 R2',
  'Windows Server 2016 R2',
  'CentOS',
  'Ubuntu'
];
const opt = sysType.map(item => (
  <Option key={item} value={item}>
    {item}
  </Option>
));

// 内存大小
const ramSize = [1, 2, 4, 8, 16, 32];
const optRAM = ramSize.map(item => (
  <Option key={item} value={item}>
    {item}G
  </Option>
));

// 处理器核心数
const core = [1, 2, 4, 8];
const optCore = core.map(item => (
  <Option key={item} value={item}>
    {item}核
  </Option>
));

export default function createHostModal(props) {
  // state
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const valuesChange = value => {
    console.log('value', value);
  };

  // 创建主机按钮
  const onFinish = async values => {
    await setLoading(true);
    console.log(values);

    // 取出uid
    const { id: uid } = JSON.parse(localStorage.getItem('userInfo'));
    values.uid = uid;
    values.cDiskUsed = (Math.random() * 15 + 15).toFixed(2); //C盘使用量
    // values.system.includes('Windows') ? (values.dDisk = undefined) : null;

    const data = {
      hostInfo: { ...values }
    };
    console.log('data', data);

    // 创建主机接口
    const res = await axios({
      url: api.createHost,
      method: 'post',
      data
    });
    if (res.data.success) {
      // 操作日志写入
      const { id: uid } = JSON.parse(localStorage.getItem('userInfo'));
      await props.saveOperation(uid, '创建', JSON.stringify([res.data.id]));
    }
    console.log('res', res);

    setTimeout(() => {
      setLoading(false);
    }, 500);

    // 关闭Modal并弹出message
    props.closeModal();
    message.success(`主机：${values.hostName}，创建成功！`);
    props.getAllHost(); // 刷新数据
    props.refreshOperationLogs(); // 刷新操作日志
  };

  return (
    <Modal
      title='新建主机'
      onCancel={props.closeModal}
      cancelText='取消'
      visible={props.visible}
      footer={null}
    >
      <Spin size='large' tip='创建中...' spinning={loading}>
        <Form
          form={form}
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
          onValuesChange={valuesChange}
          validateMessages={validateMessages}
          initialValues={{
            hostName: `主机随机${Math.floor(Math.random() * 900) + 99}`,
            ram: 8,
            netWidth: 5,
            cDisk: 20,
            dDisk: 30
          }}
        >
          {/* 主机名 */}
          <Form.Item
            name='hostName'
            label='主机名'
            rules={[{ required: true }]}
          >
            <Input maxLength={7} />
          </Form.Item>
          {/* 操作系统 */}
          <Form.Item
            name='system'
            label='操作系统'
            rules={[{ required: true }]}
          >
            <Select>{opt}</Select>
          </Form.Item>
          {/* 处理器核数 */}
          <Form.Item
            name='coreNum'
            label='处理器核数'
            rules={[{ type: 'number', min: 1, max: 16, required: true }]}
          >
            <Select>{optCore}</Select>
          </Form.Item>
          {/* ip */}
          <Form.Item name='hostIp' label='ip' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {/* 内存容量 */}
          <Form.Item name='ram' label='内存' rules={[{ required: true }]}>
            <Slider
              tipFormatter={value => `${value}GB`}
              defaultValue={4}
              min={1}
              max={32}
              tooltipPlacement='right'
            />
            {/* <Input addonAfter='GB' /> */}
          </Form.Item>

          {/* 带宽 */}
          <Form.Item name='netWidth' label='带宽' rules={[{ required: true }]}>
            <Slider
              tipFormatter={value => `${value}M`}
              defaultValue={10}
              tooltipPlacement='right'
              min={1}
            />
          </Form.Item>

          {/* C盘容量 */}
          <Form.Item
            noStyle
            shouldUpdate={true}
            shouldUpdate={(prevValues, currentValues) => {
              return prevValues.system !== currentValues.system;
            }}
          >
            {({ getFieldValue }) => (
              <Form.Item
                name='cDisk'
                label={
                  getFieldValue('system') !== 'CentOS' &&
                  getFieldValue('system') !== 'Ubuntu'
                    ? 'C盘容量'
                    : '磁盘容量'
                }
                rules={[{ required: true }]}
              >
                <Slider
                  tipFormatter={value => `${value}GB`}
                  defaultValue={30}
                  min={20}
                  tooltipPlacement='right'
                />
              </Form.Item>
            )}
          </Form.Item>

          {/* D盘容量 */}
          <Form.Item
            noStyle
            shouldUpdate={true}
            shouldUpdate={(prevValues, currentValues) => {
              return prevValues.system !== currentValues.system;
            }}
          >
            {({ getFieldValue }) => {
              return getFieldValue('system') !== 'CentOS' &&
                getFieldValue('system') !== 'Ubuntu' ? (
                <Form.Item
                  name='dDisk'
                  label='D盘容量'
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <Slider
                    tipFormatter={value => `${value}GB`}
                    defaultValue={50}
                    min={30}
                    tooltipPlacement='right'
                  />
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
          {/* 主机备注 */}
          <Form.Item name='desc' label='备注'>
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              style={{ borderRadius: '8px' }}
              type='primary'
              size='large'
              htmlType='submit'
            >
              创建主机
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}
