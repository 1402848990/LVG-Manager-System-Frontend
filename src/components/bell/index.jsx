import React, { Component } from 'react';
import { Tabs, List, Button, Divider } from 'antd';
import Websocket from 'react-websocket';
import axios from '@/request/axiosConfig';
import api_bell from '@/request/api/api_bell';
import '@/assets/css/news.css';
import moment from 'moment';
const { TabPane } = Tabs;

export default class Bell extends Component {
  state = {
    loading: true,
    dataSource: [],
    warnData: [],
    operData: [],
    operDataRead: [],
    warnDataRead: []
  };
  componentDidMount() {}
  // handleChangeTab = key => {
  //   if (parseInt(key) === 1) {
  //     this.setState({ dataSource: news.filter(item => item.status === 0) });
  //   } else if (parseInt(key) === 2) {
  //     this.setState({ dataSource: news.filter(item => item.status === 1) });
  //   }
  // };

  /**
   * WS数据处理
   */
  handleLogsDetail = async data => {
    if (!data.includes('连接成功')) {
      data = JSON.parse(data);
      const { operLogs, warnLogs } = data;
      await this.setState(
        {
          operData: operLogs.filter(item => item.status === 0),
          operDataRead: operLogs.filter(item => item.status === 1),
          warnData: warnLogs.filter(item => item.status === 0),
          warnDataRead: warnLogs.filter(item => item.status === 1)
        }
        // () => {
        //   console.log(this.state.operData);
        // }
      );
      // 取消加载状态
      this.setState({
        loading: false
      });
    }
  };

  /**
   * 阅读消息
   */
  handleRead = async (id, type, hid) => {
    const res = await axios({
      url: api_bell.readBell,
      method: 'post',
      data: {
        id,
        type,
        hid
      }
    });
  };

  /**
   * 删除消息
   */
  handleDelete = async (id, type) => {
    const res = await axios({
      url: api_bell.deleteBell,
      method: 'post',
      data: {
        id,
        type
      }
    });
  };

  render() {
    const { loading, dataSource } = this.state;
    const { id: uid } =
      localStorage.getItem('userInfo') &&
      JSON.parse(localStorage.getItem('userInfo'));
    return (
      <div className='shadow-radius'>
        {/* 所有消息详情WS */}
        <Websocket
          url={`ws://${
            process.env.NODE_ENV === 'production' ? 'wrdemo.cn' : 'localhost'
          }:8088/getLogsDetail/uid=${uid}`}
          onMessage={this.handleLogsDetail}
          reconnectIntervalInMilliSeconds={10000}
          sendMessage='111'
        />
        {/* 预警日志 */}
        <Tabs defaultActiveKey='1'>
          <TabPane tab='预警未读消息' key='1'>
            <List
              pagination={{
                showQuickJumper: true,
                defaultCurrent: 1
                // total: 500
              }}
              loading={loading}
              className='list-news'
              footer={
                <div>
                  <Button type='primary'>全部标为已读</Button>
                </div>
              }
              dataSource={this.state.warnData}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    title={
                      <>
                        <font color='#bf3131'>{item.type} </font>
                        <font color='#1890ff'> -- [主机ID:{item.hid}]</font>
                      </>
                    }
                    description={`设置预警条件为:${
                      item.settingValue
                    }%；触发值为：${item.warnValue}${
                      item.type === '网络占用率预警' ? 'KB/S' : '%'
                    }`}
                  />
                  <div className='list-time'>
                    {moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                  <Button
                    onClick={this.handleRead.bind(
                      this,
                      item.id,
                      'warn',
                      item.hid
                    )}
                  >
                    标为已读
                  </Button>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab='已读消息' key='2'>
            <List
              pagination={{
                showQuickJumper: true,
                defaultCurrent: 1
                // total: 500
              }}
              loading={loading}
              className='list-news'
              footer={
                <div>
                  <Button type='danger'>删除全部</Button>
                </div>
              }
              dataSource={this.state.warnDataRead}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    title={
                      <>
                        {item.type}
                        -- [主机ID:{item.hid}]
                      </>
                    }
                    description={`设置预警条件为:${
                      item.settingValue
                    }%；触发值为：${item.warnValue}${
                      item.type === '网络占用率预警' ? 'KB/S' : '%'
                    }`}
                  />
                  <div className='list-time'>
                    {moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                  <Button
                    type='danger'
                    onClick={this.handleDelete.bind(this, item.id, 'warn')}
                  >
                    删除
                  </Button>
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
        <Divider />
        <Divider />
        {/* 操作消息 */}
        <Tabs defaultActiveKey='1'>
          <TabPane tab='操作未读消息' key='1'>
            <List
              pagination={{
                showQuickJumper: true,
                defaultCurrent: 1
                // total: 500
              }}
              loading={loading}
              className='list-news'
              footer={
                <div>
                  <Button type='primary'>全部标为已读</Button>
                </div>
              }
              dataSource={this.state.operData}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    title={
                      item.log ? (
                        <font color='#ff981d'>主机{item.type}</font>
                      ) : (
                        <font color='#1890ff'>批量{item.type}主机</font>
                      )
                    }
                    description={`受影响主机ID：${item.hids}；${item.log ||
                      ''}`}
                  />
                  <div className='list-time'>
                    {moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                  <Button onClick={this.handleRead.bind(this, item.id, 'oper')}>
                    标为已读
                  </Button>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab='已读消息' key='2'>
            <List
              pagination={{
                showQuickJumper: true,
                defaultCurrent: 1
                // total: 500
              }}
              loading={loading}
              className='list-news'
              footer={
                <div>
                  <Button type='danger'>删除全部</Button>
                </div>
              }
              dataSource={this.state.operDataRead}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    title={
                      item.log ? (
                        <font color='#ff981d'>主机{item.type}</font>
                      ) : (
                        <font color='#1890ff'>批量{item.type}主机</font>
                      )
                    }
                    description={`受影响主机ID：${item.hids}；${item.log ||
                      ''}`}
                  />
                  <div className='list-time'>
                    {moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                  <Button
                    type='danger'
                    onClick={this.handleDelete.bind(this, item.id, 'oper')}
                  >
                    删除
                  </Button>
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
