import React from 'react';
import { AreaChart } from 'bizcharts-plot';
import Websocket from 'react-websocket';
import { Row, Col } from 'antd';
import Cpu from './cpu';
import Gpu from './gpu';
import Ram from './ram';
import Net from './net';
import axios from '@/request/axiosConfig';
import api_logs from '@/request/api/api_logs';
import styles from '../index.scss';
import moment from 'moment';

class PoltList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    await this.getCpuData();
    await this.getNetData();
  }

  // 获取cpu数据
  getCpuData = async () => {
    const res = await axios({
      url: api_logs.cpuLogs,
      method: 'post',
      data: {
        hid: 41
      }
    });
    const d = res.data.data.map(x => {
      x.createdAt = moment(x.createdAt).format('MM-DD HH:mm:ss');
      return x;
    });
    await this.setState({
      cpuData: d
    });
  };

  // 获取net数据
  getNetData = async () => {
    const res = await axios({
      url: api_logs.getNetLogs,
      method: 'post',
      data: {
        hid: 41
      }
    });
    const formatList = [];
    res.data.data.map(x => {
      const time = moment(x.createdAt).format('MM-DD HH:mm:ss');
      const d = {};
      const u = {};
      d.createdAt = time;
      d.type = '下行';
      d.speed = x.down;
      u.createdAt = time;
      u.type = '上行';
      u.speed = x.up;
      formatList.push(u);
      formatList.push(d);
    });

    await this.setState(
      {
        netData: formatList
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    const { cpuData, netData } = this.state;
    return (
      <div className={styles.plotList}>
        <Row justify='center' className={styles.row}>
          {/* CPU监控 */}
          <Col style={{ marginRight: '12px' }} className={styles.col} span={11}>
            <Cpu cpuData={cpuData} />
          </Col>
          {/* 内存 */}
          <Col className={styles.col} span={11}>
            <Ram cpuData={cpuData} />
          </Col>
        </Row>
        <Row justify='center'>
          {/* 网络监控 */}
          <Col style={{ marginRight: '12px' }} className={styles.col} span={11}>
            <Net netData={netData} />
          </Col>
          <Col className={styles.col} span={11}>
            <Gpu cpuData={cpuData} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PoltList;
