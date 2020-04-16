import React from 'react';
import styles from '../index.scss';
import { List, message, Avatar, Spin, Divider } from 'antd';
import IconFont from '@/assets/icon';
import reqwest from 'reqwest';
import axios from '@/request/axiosConfig';
import api_logs from '@/request/api/api_logs';
import './warnLog.css';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';

export default class WarnLog extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true
  };

  componentDidMount() {
    this.getWarnLog();
    // this.fetchData(res => {
    //   this.setState({
    //     data: res.results
    //   });
    // });
  }

  // 获取预警日志
  getWarnLog = async () => {
    const { userInfo } = localStorage;
    const { id: uid } = userInfo ? JSON.parse(userInfo) : {};
    const res = await axios({
      url: api_logs.getWarnLogs,
      method: 'post',
      data: {
        hid: this.props.hid
      }
    });
    // 用户登录日志存到state中
    await this.setState({
      warnLog: res.data.data
    });
    console.log(this.state);

    // const { ip, address, createdAt, total } = res.data.data;
  };

  fetchData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res);
      }
    });
  };

  handleInfiniteOnLoad = async () => {
    let { data } = this.state;
    this.setState({
      loading: true
    });
    await this.getWarnLog();
    this.setState({
      loading: false
    });
  };

  render() {
    return (
      <div className='demo-infinite-container' style={{ height: '321px' }}>
        <Divider orientation='left'>预警日志</Divider>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={this.state.warnLog}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{ background: '#a7a2a2' }}
                      icon={<IconFont type='iconwarn' />}
                    />
                  }
                  title={
                    <a href='#'>
                      [{item.hid}]{item.type}
                    </a>
                  }
                  description={`设置预警条件为:${
                    item.settingValue
                  }%；触发值为：${item.warnValue}${
                    item.type === '网络占用率预警' ? 'KB/S' : '%'
                  }`}
                />
                <div>
                  {moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                </div>
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className='demo-loading-container'>
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}
