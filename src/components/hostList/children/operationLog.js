import React from 'react';
import styles from '../index.scss';
import { List, message, Avatar, Spin, Divider } from 'antd';
import reqwest from 'reqwest';
import axios from '@/request/axiosConfig';
import api_logs from '@/request/api/api_logs';
import moment from 'moment';
import './operationLog.css';

import InfiniteScroll from 'react-infinite-scroller';

const fakeDataUrl =
  'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

export default class OperationLog extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true
  };

  async componentDidMount() {
    await this.getOperationLogs();

    // this.fetchData(res => {
    //   this.setState({
    //     data: res.results
    //   });
    // });
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
    await this.setState(
      {
        data: res.data.data
      },
      () => {
        console.log(this.state);
      }
    );
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
    if (data.length > 6) {
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
    data = data.concat(res.data.data);
    await this.setState({
      data,
      loading: false
    });
    console.log('res----2', res);

    // this.fetchData(res => {
    //   data = data.concat(res.results);
    //   this.setState({
    //     data,
    //     loading: false
    //   });
    // });
  };

  render() {
    return (
      <div className='demo-infinite-container'>
        <Divider orientation='left'>操作日志</Divider>
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
                    avatar={
                      <Avatar src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADwElEQVRYR7WXTWwTVxDH/7Pe9Qf+ahyaOAmBUKeBAyqXSlUrUM/0A6lHxAWE1PbSG+IIoceKG5e2EqKXimMlWtpzRdWqgkurHiDEJTgkcQJx8Bf+2I9Bb8kG2/H6PRL7XfbwZub9dmbezDzCa6z5fH7EqTQ/AuFDZhwBMAUgvmmiDGCBCP+B8bsWC/46nU6vqZonFcFsdvmYCesCHJwggq6iwwwLGn4zoH+TyYz/IdPpCXJvIX9Qs82rzPyxzFCvfSK65QSMrw5PpR/6yfmCzGWXTjFb3wHkuX43LAC4TKR/MZOZuNHNUFeQ+9nFiwTMMrNS6FQJiYgZmD2Umfy6U2fbQQICzJdVje9IjuhSJ0wbiAgH4PzYb09s+3siBrTTrWHaAhGJSVbjH5WcCGga3kjGEI1GEDReXqKmaaFareFZsQLbcRQcxWXWQ0e9BN4Cmcsu/qJyO2LRCEZHUhAw3ZaAWF0roFKtSWHEbZrJTH4iBF0QUScstm7LNAXE2OgwiHrnMDNjZXVdCUYn/bioM67Fe9ncTWJ82gtEeGDqwJivJzp1hWcWHq1Iw8SEnw9n9p8kUbatcnNJVjGHhxIYTiVlTmvbXy8Usb5R6qkjKrAeD07Q3HzuDAPXZSfs3zeKcCgoE2vbrzeayD1eleoQcJbmsrnrzDgjk54+OAHNJ0H9dB3HwfzDJZlpEOEHuj+fuwPgXZn0IEEA3BUgTwDslYEMMjQAngqQOoCQDGRQybp5bkMZZFDXtxVEKTRCYRAFbRPEDY1Ssnqh62eJb0mHu8rXtzWH+tP0Xll0r69qQZMl82723YKmWuJ3c1AvXbfEU3BCuel5xiLhEEIhA8GgAT0Q2OrEouNato1m00SjYaJWbyixbzU9lTFAtP3UUALJeBS6HlA6wLJsFMtVFDZKEJB+q20MEEJ+g5Fh6Ng39ibEdyfLNC08XnkC8e1c2wYjIdBtVBRNbmoyrewFP1DhnYXFPEQTfLV8RsWXXmkfnkf2DrmzaT+WmGXXnm64psSzwnd49g7znhOaRnjrwPhrt34/aOGN/x8tw3FYkPR+TrTCxPZEZsfTw319YC3n17nyvKb2wPJgStXquWg48q2m0c6ytMM1jsNWtV77MhGNXuvmtZ5/XCgU3onHE9/reuC93eSJZdl/l8ulz1Op1L9+dpRcXyo9/ywcNs4bhv6+9wRRAGPTtP6q180ricSen2TySiCekbVi8e2YYZwMGMZxAj4IaNoQkeZWOGbHth1ng4E/bdO8XTHNmyPJ5AMZgLf/At/j2PAbUsw0AAAAAElFTkSuQmCC' />
                    }
                    title={<a href='https://ant.design'>批量{item.type}主机</a>}
                    description={`受影响主机ID：${item.hids}`}
                  />
                  {/* 操作时间 */}
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
