/**
 * @description 大屏中CPU监控
 */
import * as React from 'react';
import styles from '../index.scss';
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

export default class RAM extends React.Component {
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
      tickCount: 4,
      tickInterval: 1
    },
    {
      dataKey: 'ramUsed',
      alias: 'RAM使用率',
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
          height={150}
          // width={370}
          data={this.props.getData}
          scale={this.scale}
        >
          <Tooltip
            crosshairs='areaStack'
            // crosshairs={{
            //   ICrosshairs: {
            //     type: 'cross',
            //     stroke: 'red'
            //   }
            // }}
          />
          <Axis autoPaint={true} />
          <Legend allowAllCanceled={true} />
          <Line
            position='time*ramUsed'
            color={['ramType', ['#ff6a00']]}
            shape='smooth'
          />
          <Series
            adjust='stack'
            position='ramUsed*1'
            shape='smooth'
            quickType='area'
          />
          <Point color='#35b34a' position='time*ramUsed' shape='circle' />
        </Chart>
      </div>
    );
  }
}
