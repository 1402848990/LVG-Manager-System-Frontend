/**
 * @description 主机详情中网络监控
 */
import * as React from 'react';
import styles from '../index.scss';
import Websocket from 'react-websocket';
import {
  Chart,
  Tooltip,
  Axis,
  Line,
  Legend,
  Area,
  StackArea,
  Series
} from 'viser-react';
import moment from 'moment';

export default class NetSpeed extends React.Component {
  state = {
    data: [],
    up: '',
    down: ''
  };

  scale = [
    {
      dataKey: 'time',
      alias: '时间',
      type: 'timeCat',
      // mask: 'MM:ss',
      formatter: data => moment(data).format('HH:mm:ss'),
      nice: false,
      range: [0, 1],
      tickCount: 10,
      tickInterval: 1
    },
    {
      dataKey: 'speed',
      alias: '网络速率',
      min: 0,
      max: 3000
    },
    {
      dataKey: 'type',
      type: 'cat'
    }
  ];

  // 处理网络监控数据
  handleNetData = async data => {
    // console.log('data', data);
    const nextData = [];
    const oldData = this.state.data.slice();
    const newData =
      (data && !data.includes('连接成功') && JSON.parse(data)) || [];
    // 如果state中的数据大于七条去掉多余数据
    if (oldData.length > 14) {
      oldData.shift();
      oldData.shift();
    }
    // 新数据追加到旧数据中
    newData.map(x => {
      x.type === '上行'
        ? this.props.setUp(x.speed)
        : this.props.setDown(x.speed);
      oldData.push(x);
    });
    await this.setState({
      data: oldData
    });
  };

  render() {
    const getData = this.state.data;
    const urlNet = `ws://localhost:8088/NetWsOne/hid=${this.props.hid}`;
    return (
      <div className={styles.netSpeed}>
        <Websocket
          url={urlNet}
          onMessage={this.handleNetData}
          reconnectIntervalInMilliSeconds={10000}
          sendMessage='net'
        />{' '}
        <Chart
          padding={[30, 40, 30, 60]}
          forceFit={true}
          height={320}
          // width={370}
          data={getData}
          scale={this.scale}
        >
          <Tooltip />
          <Axis autoPaint={true} />
          <Legend allowAllCanceled={true} />
          <Line
            position='time*speed'
            color={['type', ['#37a2da', '#7fff00']]}
            shape='smooth'
          />
          <Series
            adjust='stack'
            position='speed*1'
            shape='smooth'
            quickType='area'
          />
        </Chart>
      </div>
    );
  }
}
