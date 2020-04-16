/**
 * @description 大屏中CPU监控
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
  Series,
  Point
} from 'viser-react';
import moment from 'moment';

export default class CPU extends React.Component {
  state = {
    data: []
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
      tickCount: 3,
      tickInterval: 1
    },
    {
      dataKey: 'used',
      alias: 'CPU使用率',
      min: 0,
      max: 100
    },
    {
      dataKey: 'type',
      type: 'cat'
    }
  ];

  render() {
    return (
      <div className={styles.netSpeed}>
        <Chart
          padding={[30, 40, 30, 60]}
          forceFit={true}
          height={320}
          // width={370}
          data={this.props.getData}
          scale={this.scale}
        >
          <Tooltip />
          <Axis autoPaint={true} />
          <Legend allowAllCanceled={true} />
          <Line
            position='time*used'
            color={['type', ['#4ef5e6']]}
            shape='smooth'
          />
          <Series
            adjust='stack'
            position='used*1'
            shape='smooth'
            quickType='area'
          />
          <Point color='#faf414' position='time*used' shape='circle' />
        </Chart>
      </div>
    );
  }
}
