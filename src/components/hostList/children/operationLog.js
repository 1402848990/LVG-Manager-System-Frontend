import React from 'react';
import styles from '../index.scss';
import { List, message, Avatar, Spin, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from '@/request/axiosConfig';
import api_logs from '@/request/api/api_logs';
import moment from 'moment';
import './operationLog.css';

import InfiniteScroll from 'react-infinite-scroller';

export default class OperationLog extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true
  };

  async componentDidMount() {
    await this.getOperationLogs();
  }

  // 获取所有操作日志
  getOperationLogs = async () => {
    const { id: uid } = JSON.parse(localStorage.getItem('userInfo'));
    const res = await axios({
      url: api_logs.getOperationLogs,
      method: 'post',
      data: {
        uid
      }
    });
    console.log('res', res);
    await this.setState({
      data: res.data.data
    });
  };

  handleInfiniteOnLoad = async () => {
    let { data } = this.state;
    this.setState({
      loading: true
    });
    if (data.length > 0) {
      message.warning('正在加载...');
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
    const { id: uid } = JSON.parse(localStorage.getItem('userInfo'));
    const res = await axios({
      url: api_logs.getOperationLogs,
      method: 'post',
      data: {
        uid
      }
    });
    // data = data.concat(res.data.data);
    await this.setState({
      data: res.data.data,
      loading: false
    });
  };

  render() {
    return (
      <div className='demo-infinite-container'>
        <Divider orientation='left'>操作日志</Divider>
        {/* <InfiniteScroll
          initialLoad={true}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        > */}
        <List
          dataSource={this.state.data}
          renderItem={item => {
            return (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={
                    item.log ? (
                      <font color='#ff981d'>{item.type}</font>
                    ) : (
                      <font color='#1890ff'>批量{item.type}主机</font>
                    )
                  }
                  description={`受影响主机ID：${item.hids}；${item.log || ''}`}
                />
                {/* 操作时间 */}
                <div style={{ color: '#656262' }}>
                  {moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                </div>
              </List.Item>
            );
          }}
        >
          {this.state.loading && this.state.hasMore && (
            <div className='demo-loading-container'>
              <Spin />
            </div>
          )}
        </List>
        {/* </InfiniteScroll> */}
      </div>
    );
  }
}
