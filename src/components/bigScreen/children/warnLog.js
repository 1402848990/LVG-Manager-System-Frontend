import React from 'react';
import styles from '../index.scss';
import { List, message, Avatar, Spin, Divider } from 'antd';
import IconFont from '@/assets/icon';
import reqwest from 'reqwest';
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
    this.fetchData(res => {
      this.setState({
        data: res.results
      });
    });
  }

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

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
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
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item style={{ padding: '4px 0' }} key={item.id}>
                <List.Item.Meta
                  title={<span style={{ color: 'white' }}>CPU使用率预警</span>}
                  description={
                    <span style={{ color: 'white' }}>触发值为：90%</span>
                  }
                />
                <div style={{ color: 'white' }}>04-10 16:20:13</div>
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
