/**
 * @description 用户资料的 登录日志
 */
import React from 'react';
import { List, message, Avatar, Spin, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from '@/request/axiosConfig';
import api_user from '@/request/api/api_user';
import moment from 'moment';
import './loginLog.css';

import InfiniteScroll from 'react-infinite-scroller';

export default class LoginLog extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    loginLog: []
  };

  async componentDidMount() {
    await this.getLoginLog();
  }

  /**
   * 获取登录日志
   */
  getLoginLog = async () => {
    const { userInfo } = localStorage;
    const id = userInfo ? JSON.parse(userInfo).id : null;
    const res = await axios({
      url: api_user.loginLog,
      method: 'post',
      data: {
        id
      }
    });
    // 用户登录日志存到state中
    await this.setState({
      loginLog: res.data.data
    });
    // const { ip, address, createdAt, total } = res.data.data;
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
    const { id } = JSON.parse(localStorage.getItem('userInfo'));
    const res = await axios({
      url: api_user.loginLog,
      method: 'post',
      data: {
        id
      }
    });
    data = data.concat(res.data.data);
    await this.setState({
      data,
      loading: false
    });
    // console.log('res----2', res);
  };

  render() {
    return (
      <div className='infinite-container'>
        <Divider orientation='left'>登录日志</Divider>
        <InfiniteScroll
          initialLoad={true}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={this.state.data}
            renderItem={item => {
              return (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <a href='https://ant.design'>
                        {item.type === 'userName'
                          ? '用户名密码登录'
                          : '手机验证码登录'}
                      </a>
                    }
                    description={`登录IP:${item.ip}  地点:${item.address}`}
                  />
                  {/* 登录时间 */}
                  <div>
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
        </InfiniteScroll>
      </div>
    );
  }
}
