import React from 'react';
import Status from './children/status';
import HostDesc from './children/hostDesc';
import Websocket from 'react-websocket';
import axios from '@/request/axiosConfig';
import api_host from '@/request/api/api_host';
import { withRouter } from 'react-router-dom';
import Plot from './children/plot';
import styles from './index.scss';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hid: this.props.match.params.hid || 30,
      hostDetail: {},
      cpuData: {},
      netData: {}
    };
  }

  async componentDidMount() {
    await this.getHostDetail();
  }

  // 根据hid获取主机详情
  getHostDetail = async () => {
    const { hid } = this.state;
    const res = await axios({
      url: api_host.getHost,
      method: 'post',
      data: {
        id: hid
      }
    });
    await this.setState({
      hostDetail: res.data.data
    });
  };

  handleCpuData = async data => {
    // cpu数据存入state中
    await this.setState({
      cpuData: (data && !data.includes('连接成功') && JSON.parse(data)) || {}
    });
  };

  handleNetData = async data => {
    // NET数据存入state中
    await this.setState({
      netData: (data && !data.includes('连接成功') && JSON.parse(data)) || {}
    });
  };

  render() {
    const { hid, hostDetail, cpuData } = this.state;
    const urlCpu = `ws://localhost:8088/CpuWsOne/hid=${hid}`;
    return (
      <div className={styles.hostDetail}>
        <Websocket
          url={urlCpu}
          onMessage={this.handleCpuData}
          reconnectIntervalInMilliSeconds={10000}
          sendMessage='111'
          ref={this.ws}
        />
        {/* 顶部状态图表 */}
        <Status cpuData={cpuData} hid={hid} hostDetail={hostDetail} />
        <HostDesc cpuData={cpuData} hid={hid} hostDetail={hostDetail} />
        <Plot hostDetail={hostDetail} cpuData={cpuData} hid={hid} />
      </div>
      // </div>
    );
  }
}

export default withRouter(IndexPage);
