import React from 'react';
import styles from '../index.scss';
import { List, message, Avatar, Spin, Divider } from 'antd';
import IconFont from '@/assets/icon';
import axios from '@/request/axiosConfig';
import api_logs from '@/request/api/api_logs';
import reqwest from 'reqwest';
import moment from 'moment';
import './warnLog.css';

import InfiniteScroll from 'react-infinite-scroller';

const fakeDataUrl =
  'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

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
      <div className='screen-warn-log'>
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
              <List.Item style={{ padding: '4px 0' }} key={item.id}>
                <List.Item.Meta
                  title={<span style={{ color: 'white' }}>{item.type}</span>}
                  description={
                    <span style={{ color: 'white' }}>{`预警条件:${
                      item.settingValue
                    }%；触发值：${item.warnValue}${
                      item.type === '网络占用率预警' ? 'KB/S' : '%'
                    }`}</span>
                  }
                />
                <div style={{ color: 'white' }}>
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
