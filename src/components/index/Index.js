import React, { Component } from 'react';
import Websocket from 'react-websocket';
import { Skeleton } from 'antd';
import UserCard from './children/userCard';
import HostIndex from './children/hostIndex.jsx';
import HostList from './children/hostList';
import axios from '@/request/axiosConfig';
import api_host from '@/request/api/api_host';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      allHost: [],
      healthyScatter: []
    };
    this.ws = React.createRef();
  }

  async componentDidMount() {
    await this.getAllHost();
    // Websocket.sendMessage(11);
    // console.log('refs', this.ws.current.sendMessage('ok'));
  }

  /**
   * 获取所有主机信息
   */
  getAllHost = async () => {
    const { id: uid } = JSON.parse(localStorage.getItem('userInfo'));
    // 接口
    const res = await axios({
      url: api_host.getAllHost,
      method: 'post',
      data: {
        uid
      }
    });
    console.log('res', res);

    await this.setState({
      allHost: res.data.data
    });
  };

  handleData = async data => {
    console.log('data', data);
    await this.setState({
      data
    });
  };

  render() {
    const { allHost, healthyScatter } = this.state;

    return (
      <div className='shadow-radius'>
        <div style={{ overflow: 'hidden' }}>
          <UserCard hostNum={allHost.length} />
          <HostIndex healthyScatter={healthyScatter} allHost={allHost} />
        </div>
        {allHost.length > 0 ? (
          <HostList allHost={allHost} />
        ) : (
          <Skeleton active paragraph={{ rows: 10 }} />
        )}

        {/* <Websocket
            url='ws://localhost:8088/wstest'
            onMessage={this.handleData}
            reconnectIntervalInMilliSeconds={10000}
            sendMessage='111'
            ref={this.ws}
            // onOpen={() => {
            //   this.ws.current.sendMessage('ok');
            // }}
          /> */}
      </div>
    );
  }
}

export default Index;
