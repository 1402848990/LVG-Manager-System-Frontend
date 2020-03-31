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
  Series
} from 'viser-react';

const scale = [
  {
    dataKey: 'time',
    alias: '时间',
    type: 'time',
    mask: 'MM:ss',
    nice: false,
    range: [0, 1]
  },
  {
    dataKey: 'temperature',
    alias: '网络速率',
    min: 0,
    max: 100
  },
  {
    dataKey: 'type',
    type: 'cat'
  }
];

export default class NetSpeed extends React.Component {
  state = {
    data: []
  };

  updateData = () => {
    const me = this;
    const now = new Date();
    const time = now.getTime();
    const temperature1 = ~~(Math.random() * 20) + 22;
    const temperature2 = ~~(Math.random() * 50) + 17;
    let newData = me.state.data.slice();
    if (newData.length >= 20) {
      newData.shift();
      newData.shift();
    }
    newData.push({
      time: time,
      temperature: temperature1,
      type: '上行'
    });
    newData.push({
      time: time,
      temperature: temperature2,
      type: '下行'
    });
    me.setState({
      data: newData
    });
  };

  componentDidMount() {
    setInterval(this.updateData, 3000);
  }

  render() {
    const getData = this.state.data;
    return (
      <div className={styles.netSpeed}>
        {' '}
        <Chart
          forceFit={true}
          height={320}
          width={320}
          data={getData}
          scale={scale}
        >
          <Tooltip />
          <Axis tickCount={4} />
          <Legend allowAllCanceled={true} />
          <Line
            position='time*temperature'
            color={['type', ['#ff7f0e', '#2ca02c']]}
            shape='smooth'
          />
          <Series
            adjust='stack'
            position='temperature*1'
            shape='smooth'
            quickType='area'
          />
        </Chart>
      </div>
    );
  }
}
