/**
 * @description 主机预警设置modal
 */
import React, { useState } from 'react';
import { Form, Button, Modal, Select, Slider, Spin, message } from 'antd';
import axios from '@/request/axiosConfig';
import api_warn from '@/request/api/api_warn';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

export default function createHostModal(props) {
  // state
  const [loading, setLoading] = useState(false);
  // 发生变化的字段
  const [changeValue, setChangeValue] = useState({});

  const [form] = Form.useForm();

  // 确认启动预警
  const onFinish = async values => {
    await setLoading(true);
    const { cpuUsed, ramUsed, netWidthUsed, cDiskUsed } = values;
    console.log(values);

    const data = {
      setting: { ...values },
      hid: props.hid
    };
    console.log('data', data);

    // 预警设置接口
    const res = await axios({
      url: api_warn.warnSetting,
      method: 'post',
      data
    });

    if (res.data.success) {
      // 操作日志写入
      const { id: uid } = JSON.parse(localStorage.getItem('userInfo'));
      props.saveOperation(
        uid,
        '预警设置',
        JSON.stringify([res.data.hid]),
        `触发条件--CPU使用率:${cpuUsed}%,RAM使用率${ramUsed}%,带宽使用率:${netWidthUsed}%,C盘使用率:${cDiskUsed}%`
      );
    }

    setTimeout(() => {
      setLoading(false);
    }, 500);

    // 关闭Modal并弹出message
    props.closeWarnModal();
    message.success(`主机：${props.hid}，预警启动成功！`);
    // props.getAllHost(); // 刷新数据
  };

  return (
    <Modal
      title='主机预警设置'
      onCancel={props.closeWarnModal}
      cancelText='取消'
      visible={props.warnVisible}
      footer={null}
    >
      <Spin size='large' tip='预警设置生效中...' spinning={loading}>
        <Form
          form={form}
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
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
