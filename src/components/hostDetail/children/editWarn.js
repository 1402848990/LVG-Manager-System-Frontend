/**
 * @description 主机预警设置modal
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
  // 发生变化的字段
  const [changeValue, setChangeValue] = useState({});

  const [form] = Form.useForm();

  const valuesChange = async value => {
    console.log('value', value);
    const newValue = Object.assign(changeValue, value);
    await setChangeValue(newValue);
    console.log('changeValue', changeValue);
  };

  // 确认修改主机按钮
  const onFinish = async values => {
    await setLoading(true);
    console.log(values);

    // 取出uid
    // const { id: uid } = JSON.parse(localStorage.getItem('userInfo'));
    // values.uid = uid;
    // values.system.includes('Windows') ? (values.dDisk = undefined) : null;

    const data = {
      hostInfo: { ...changeValue },
      id: props.hid
    };
    console.log('data', data);

    // 修改主机接口
    const res = await axios({
      url: api.editHost,
      method: 'post',
      data
    });

    // if (res.data.success) {
    //   // 操作日志写入
    //   const { id: uid } = JSON.parse(localStorage.getItem('userInfo'));
    //   props.saveOperation(uid, '创建', JSON.stringify([res.data.id]));
    // }
    // console.log('res', res);

    setTimeout(() => {
      setLoading(false);
    }, 500);

    // 关闭Modal并弹出message
    props.closeModal();
    message.success(`主机：${values.hostName}，配置修改成功！`);
    // props.getAllHost(); // 刷新数据
  };

  return (
    <Modal
      title='主机预警设置'
      onCancel={props.closeWarnModal}
      cancelText='取消'
      visible={props.warnModalVisible}
      footer={null}
    >
      <Spin size='large' tip='预警设置生效中...' spinning={loading}>
        <Form
          form={form}
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
          onValuesChange={valuesChange}
          validateMessages={validateMessages}
          initialValues={{
            ramUsed: 90,
            cpuUsed: 90,
            netWidthUsed: 90,
            cDiskUsed: 90
          }}
        >
          {/* CPU使用率 */}
          <Form.Item
            name='cpuUsed'
            label='CPU使用率'
            rules={[{ required: true }]}
          >
            <Slider
              tipFormatter={value => `${value}%`}
              min={50}
              max={100}
              tooltipPlacement='right'
            />
          </Form.Item>
          {/* 内存使用率 */}
          <Form.Item
            name='ramUsed'
            label='内存使用率'
            rules={[{ required: true }]}
          >
            <Slider
              tipFormatter={value => `${value}%`}
              defaultValue={80}
              min={50}
              max={100}
              tooltipPlacement='right'
            />
          </Form.Item>

          {/* 带宽使用率 */}
          <Form.Item
            name='netWidthUsed'
            label='带宽占用率'
            rules={[{ required: true }]}
          >
            <Slider
              tipFormatter={value => `${value}%`}
              max={100}
              tooltipPlacement='right'
              min={50}
            />
          </Form.Item>

          {/* C盘使用率 */}
          <Form.Item
            noStyle
            shouldUpdate={true}
            shouldUpdate={(prevValues, currentValues) => {
              return prevValues.system !== currentValues.system;
            }}
          >
            {({ getFieldValue }) => (
              <Form.Item
                name='cDiskUsed'
                label={
                  getFieldValue('system') !== 'CentOS' &&
                  getFieldValue('system') !== 'Ubuntu'
                    ? 'C盘占用率'
                    : '磁盘容量'
                }
                rules={[{ required: true }]}
              >
                <Slider
                  tipFormatter={value => `${value}%`}
                  min={50}
                  max={100}
                  tooltipPlacement='right'
                />
              </Form.Item>
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              style={{ borderRadius: '8px' }}
              type='primary'
              size='large'
              htmlType='submit'
            >
              确认启动预警
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}
