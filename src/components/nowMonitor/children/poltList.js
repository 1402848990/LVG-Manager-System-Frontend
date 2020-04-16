import React from 'react';
import { AreaChart } from 'bizcharts-plot';
import Websocket from 'react-websocket';
import { Row, Col } from 'antd';
import Cpu from './cpu';
import Gpu from './gpu';
import Ram from './ram';
import Net from './net';
import DISK from './disk';
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
    this.getCpuData();
    this.getNetData();
    this.getDiskData();
  }

  // 获取cpu数据
  getCpuData = async () => {
    const res = await axios({
      url: api_logs.cpuLogs,
      method: 'post',
      data: {
        hid: this.props.hid
      }
    });

    const d = res.data.data.map(x => {
      x.createdAt = moment(x.createdAt).format('MMDD HH:mm:ss');
      return x;
    });
    await this.setState({
      cpuData: d.reverse()
    });

    // await this.setState({
    //   cpuData: res.data.data
    // });
  };

  // 获取net数据
  getNetData = async () => {
    const res = await axios({
      url: api_logs.getNetLogs,
      method: 'post',
      data: {
        hid: this.props.hid
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

    await this.setState({
      netData: formatList.reverse()
    });
  };

  // 获取disk数据
  getDiskData = async () => {
    const res = await axios({
      url: api_logs.getDiskLogs,
      method: 'post',
      data: {
        hid: this.props.hid
      }
    });
    const formatList = [];
    res.data.data.map(x => {
      const time = moment(x.createdAt).format('MM-DD HH:mm:ss');
      const d = {};
      const u = {};
      d.createdAt = time;
      d.type = '读取速度';
      d.speed = x.read;
      u.createdAt = time;
      u.type = '写入速度';
      u.speed = x.write;
      formatList.push(u);
      formatList.push(d);
    });

    await this.setState({
      diskData: formatList.reverse()
    });
  };

  render() {
    const { cpuData, netData, diskData } = this.state;
    return (
      <div className={styles.plotList}>
        {/* 磁盘监控 */}
        <Row justify='center' className={styles.row}>
          <Col className={styles.col} span={24}>
            <DISK diskData={diskData} />
          </Col>
        </Row>
        {/* CPU监控 */}
        <Row justify='center' className={styles.row}>
          <Col className={styles.col} span={24}>
            <Cpu cpuData={cpuData} />
          </Col>
        </Row>
        {/* 内存 */}
        <Row justify='center' className={styles.row}>
          <Col className={styles.col} span={24}>
            <Ram cpuData={cpuData} />
          </Col>
        </Row>
        {/* 网络监控 */}
        <Row justify='center' className={styles.row}>
          <Col className={styles.col} span={24}>
            <Net netData={netData} />
          </Col>
        </Row>
        {/* Gpu */}
        <Row justify='center' className={styles.row}>
          <Col className={styles.col} span={24}>
            <Gpu cpuData={cpuData} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PoltList;
